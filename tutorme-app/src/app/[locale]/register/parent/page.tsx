'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { parentRegistrationSchema } from '@/lib/validation/user-registration'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { ArrowLeft, UserPlus, Users, CreditCard, Bell } from 'lucide-react'

interface StudentForm {
  name: string
  childEmail: string
  childUniqueId: string
  grade: string
  subjects: string[]
}

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export default function ParentRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relationship: 'parent',
    timezone: 'Asia/Shanghai',
    preferredLanguage: 'zh-CN',
    students: [{ name: '', childEmail: '', childUniqueId: '', grade: '', subjects: [] }] as StudentForm[],
    emergencyContacts: [{ name: '', relationship: '', phone: '' }] as EmergencyContact[],
    notificationPreferences: {
      email: true,
      sms: true,
      app: true,
      weeklyReports: true,
      paymentNotifications: true,
      emergencyContacts: true
    },
    tosAccepted: false
  })

  const handleAddStudent = () => {
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, { name: '', childEmail: '', childUniqueId: '', grade: '', subjects: [] }]
    }))
  }

  const handleRemoveStudent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index)
    }))
  }

  const handleStudentChange = (index: number, field: keyof StudentForm, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map((student, i) => 
        i === index ? { ...student, [field]: value } : student
      )
    }))
  }

  const handleAddEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', relationship: '', phone: '' }]
    }))
  }

  const handleRemoveEmergencyContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }))
  }

  const handleEmergencyContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }))
  }

  const handleSubmit = async () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    if (fullName.length < 2) {
      toast.error('Please enter your first and last name')
      return
    }

    const validationPayload = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      relationship: formData.relationship,
      timezone: formData.timezone,
      preferredLanguage: formData.preferredLanguage,
      students: formData.students,
      emergencyContacts: formData.emergencyContacts.filter((c) => c.name && c.relationship && c.phone),
      notificationPreferences: formData.notificationPreferences,
      tosAccepted: formData.tosAccepted,
    }

    const result = parentRegistrationSchema.safeParse(validationPayload)
    if (!result.success) {
      const firstError = result.error.issues[0]
      toast.error(firstError?.message ?? 'Please check your form and try again')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'PARENT',
          email: formData.email,
          password: formData.password,
          name: fullName,
          tosAccepted: formData.tosAccepted,
          profileData: {
            phoneNumber: formData.phoneNumber,
            relationship: formData.relationship,
            timezone: formData.timezone,
            preferredLanguage: formData.preferredLanguage,
          },
          additionalData: {
            students: formData.students.map((s) => ({
              childEmail: s.childEmail?.trim() || undefined,
              childUniqueId: s.childUniqueId?.trim() || undefined,
              name: s.name,
              grade: s.grade,
              subjects: s.subjects,
            })),
            emergencyContacts: formData.emergencyContacts.filter((c) => c.name && c.relationship && c.phone),
            notificationPreferences: formData.notificationPreferences,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Parent account created successfully!')
        router.push('/login')
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Account', icon: UserPlus },
    { number: 2, title: 'Children', icon: Users },
    { number: 3, title: 'Emergency', icon: Bell },
    { number: 4, title: 'Preferences', icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/register" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Registration
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Parent Registration</h1>
          <p className="text-gray-600 mt-2">Create an account to manage your children&apos;s learning journey</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= s.number ? 'text-blue-600' : 'text-gray-500'}`}>
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${step > s.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Account Information'}
              {step === 2 && 'Add Your Children'}
              {step === 3 && 'Emergency Contacts'}
              {step === 4 && 'Notification Preferences'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Enter your account details and personal information'}
              {step === 2 && 'Add information about the students you want to manage'}
              {step === 3 && 'Add emergency contacts for safety purposes'}
              {step === 4 && 'Choose how you want to receive notifications'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Account Information */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+86 138 0000 0000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship to Student</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => setFormData({ ...formData, relationship: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                      <SelectItem value="step-parent">Step-Parent</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Children */}
            {step === 2 && (
              <div className="space-y-6">
                {formData.students.map((student, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Child {index + 1}</h4>
                        {formData.students.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveStudent(index)}
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Child&apos;s Name</Label>
                        <Input
                          value={student.name}
                          onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                          placeholder="Enter child's name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Child&apos;s Email (Required - child must register first)</Label>
                        <Input
                          type="email"
                          value={student.childEmail}
                          onChange={(e) => handleStudentChange(index, 'childEmail', e.target.value)}
                          placeholder="child@example.com"
                        />
                        <p className="text-xs text-gray-500">Or use Student ID below if child has one</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Student Unique ID (Alternative to email)</Label>
                        <Input
                          value={student.childUniqueId}
                          onChange={(e) => handleStudentChange(index, 'childUniqueId', e.target.value)}
                          placeholder="STU-xxxxxxxxxxxx"
                        />
                        <p className="text-xs text-gray-500">
                          Min 8 characters. Students can copy this from Student Dashboard → Settings → Account Security → Student ID.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Grade Level</Label>
                        <Select
                          value={student.grade}
                          onValueChange={(value) => handleStudentChange(index, 'grade', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 
                              'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
                              'University'].map((grade) => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  onClick={handleAddStudent}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Another Child
                </Button>
              </div>
            )}

            {/* Step 3: Emergency Contacts */}
            {step === 3 && (
              <div className="space-y-6">
                {formData.emergencyContacts.map((contact, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Emergency Contact {index + 1}</h4>
                        {formData.emergencyContacts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEmergencyContact(index)}
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={contact.name}
                          onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                          placeholder="Contact name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Input
                          value={contact.relationship}
                          onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                          placeholder="e.g., Spouse, Aunt, Uncle"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          value={contact.phone}
                          onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                          placeholder="+86 138 0000 0000"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {formData.emergencyContacts.length < 3 && (
                  <Button
                    variant="outline"
                    onClick={handleAddEmergencyContact}
                    className="w-full"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                )}
              </div>
            )}

            {/* Step 4: Notification Preferences */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Notification Channels</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'sms', label: 'SMS Notifications', description: 'Receive text message alerts' },
                      { key: 'app', label: 'In-App Notifications', description: 'Receive notifications in the app' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-start space-x-3">
                        <Checkbox
                          id={key}
                          checked={formData.notificationPreferences[key as keyof typeof formData.notificationPreferences]}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({
                              ...prev,
                              notificationPreferences: {
                                ...prev.notificationPreferences,
                                [key]: checked
                              }
                            }))
                          }
                        />
                        <div className="space-y-1">
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Notification Types</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'weeklyReports', label: 'Weekly Progress Reports', description: 'Get weekly summaries of your child\'s progress' },
                      { key: 'paymentNotifications', label: 'Payment Notifications', description: 'Receive alerts about payments and invoices' },
                      { key: 'emergencyContacts', label: 'Emergency Contact Alerts', description: 'Get notified about important updates' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-start space-x-3">
                        <Checkbox
                          id={key}
                          checked={formData.notificationPreferences[key as keyof typeof formData.notificationPreferences]}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({
                              ...prev,
                              notificationPreferences: {
                                ...prev.notificationPreferences,
                                [key]: checked
                              }
                            }))
                          }
                        />
                        <div className="space-y-1">
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <Checkbox
                    id="tosAccepted"
                    checked={formData.tosAccepted}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, tosAccepted: checked === true }))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="tosAccepted" className="font-medium cursor-pointer">
                      I accept the Terms of Service and Privacy Policy
                    </Label>
                    <p className="text-sm text-gray-500">
                      You must accept the terms to create an account.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation and Submit */}
            <div className="flex justify-between pt-6">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={isLoading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
