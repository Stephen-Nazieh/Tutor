import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create a VPC or use default
    const vpc = new ec2.Vpc(this, 'TutormeAppVpc', {
      maxAzs: 2,
      natGateways: 0,
    });

    // 2. Security Group
    const securityGroup = new ec2.SecurityGroup(this, 'TutormeAppSecurityGroup', {
      vpc,
      description: 'Allow HTTP, HTTPS, and SSH',
      allowAllOutbound: true, // Allow outgoing traffic to internet
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP to web server');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS to web server');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH from anywhere');

    // 3. IAM Role for Systems Manager (so you can connect without SSH if preferred)
    const role = new iam.Role(this, 'TutormeAppInstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'), // SSM login
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'), // Docker pull from ECR if ever needed
      ],
    });

    // 4. EC2 Instance
    const ami = ec2.MachineImage.latestAmazonLinux2023(); // Amazon Linux 2023

    const ec2Instance = new ec2.Instance(this, 'TutormeAppInstance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM), // T3.Medium is good for Node + Postges + Redis + Nginx
      machineImage: ami,
      securityGroup: securityGroup,
      role: role,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // Public subnet for easy direct internet access
      },
      blockDevices: [
        {
          deviceName: '/dev/xvda',
          volume: ec2.BlockDeviceVolume.ebs(30), // 30 GB EBS standard storage
        },
      ],
    });

    // Assign an Elastic IP to the instance so the IP address is static
    const eip = new ec2.CfnEIP(this, 'TutormeAppIp');
    new ec2.CfnEIPAssociation(this, 'TutormeAppIpAssociation', {
      eip: eip.ref,
      instanceId: ec2Instance.instanceId,
    });

    // 5. UserData script for setting up Nginx, Docker, Certbot
    ec2Instance.userData.addCommands(
      'yum update -y',

      // Install Docker
      'dnf install docker -y',
      'systemctl start docker',
      'systemctl enable docker',
      'usermod -aG docker ssm-user',
      'usermod -aG docker ec2-user',

      // Install docker-compose
      'curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose',
      'chmod +x /usr/local/bin/docker-compose',
      'sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose',

      // Install Nginx and Certbot
      'dnf install nginx -y',
      'systemctl start nginx',
      'systemctl enable nginx',
      'dnf install python3-certbot-nginx -y',

      // Set up basic nginx default block so Let's Encrypt can work right away
      'echo "server { listen 80; server_name solocorn.co www.solocorn.co; location / { root /usr/share/nginx/html; index index.html; } location /api { proxy_pass http://127.0.0.1:3003; } }" > /etc/nginx/conf.d/solocorn.conf',
      'systemctl restart nginx',

      // Note: We don't auto-run certbot via userdata here because DNS needs to point to the EIP first.

      'echo "Setup complete" > /var/log/bootstrap_success.log'
    );

    // Provide Output for easy access
    new cdk.CfnOutput(this, 'TutormeAppPublicIP', { value: eip.ref, description: 'Elastic IP Address of the Server' });
    new cdk.CfnOutput(this, 'TutormeAppPublicDns', { value: ec2Instance.instancePublicDnsName, description: 'Public DNS Name' });
  }
}
