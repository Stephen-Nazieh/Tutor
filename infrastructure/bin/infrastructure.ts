#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new InfrastructureStack(app, 'InfrastructureStack', {
  // Explicitly set region to us-east-2 (Ohio)
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT || '445875721173', 
    region: 'us-east-2' 
  },
});
