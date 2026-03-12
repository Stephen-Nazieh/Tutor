'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, UserPlus, Clock } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

interface Signup {
  id: string
  username: string
  bio: string | null
  country: string | null
  photo: string | null
  createdAt: string
}

export default function LandingSubmissionsPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/landing-submissions', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setMessages(data.messages || [])
        setSignups(data.signups || [])
      })
      .catch(() => setError('Failed to load submissions'))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) return <div className="p-8 text-center">Loading submissions...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Landing Page Submissions</h1>
        <p className="text-muted-foreground mt-1">Contact messages and tutor sign-up applications from the landing page.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">Total inquiries received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-emerald-500" />
              Tutor Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{signups.length}</div>
            <p className="text-xs text-muted-foreground">Tutor applications received</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">
            Contact Messages
            {messages.length > 0 && (
              <Badge className="ml-2" variant="secondary">{messages.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="signups">
            Tutor Signups
            {signups.length > 0 && (
              <Badge className="ml-2" variant="secondary">{signups.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No contact messages yet.</p>
              </CardContent>
            </Card>
          ) : (
            messages.map(msg => (
              <Card key={msg.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{msg.name}</CardTitle>
                      <CardDescription>
                        <a href={`mailto:${msg.email}`} className="hover:underline text-blue-500">
                          {msg.email}
                        </a>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(msg.createdAt)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="signups" className="space-y-4">
          {signups.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No tutor applications yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signups.map(signup => (
                <Card key={signup.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {signup.photo ? (
                        <img
                          src={signup.photo}
                          alt={signup.username}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                          {signup.username[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <CardTitle className="text-base truncate">@{signup.username}</CardTitle>
                        <CardDescription>{signup.country || 'Unknown country'}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {signup.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{signup.bio}</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1 border-t">
                      <Clock className="h-3 w-3" />
                      {formatDate(signup.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
