'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Users, Mail, Phone, MapPin, Edit2 } from 'lucide-react'

export default function ParentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account information</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Edit2 className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">SJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Sarah Johnson</h2>
            <p className="text-gray-500">Parent</p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="secondary">2 Children</Badge>
              <Badge variant="outline">Premium</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Sarah" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Johnson" disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input defaultValue="sarah.johnson@example.com" disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input defaultValue="+86 138 0000 0000" disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <Input defaultValue="Beijing, China" disabled={!isEditing} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Children Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Children
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Emily Johnson', grade: 'Grade 8', subjects: ['Math', 'Science', 'English'] },
              { name: 'Michael Johnson', grade: 'Grade 10', subjects: ['Physics', 'Chemistry', 'Math'] }
            ].map((child, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-500">{child.grade}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {child.subjects.map(s => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
