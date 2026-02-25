'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Loader2 } from 'lucide-react'

interface StudyGroup {
  id: string
  name: string
  subject: string
  maxMembers: number
  currentMembers: number
  isMember: boolean
}

interface StudyGroupsProps {
  groups: StudyGroup[]
  joiningGroupId: string | null
  onJoinGroup: (groupId: string) => void
}

export function StudyGroups({ groups, joiningGroupId, onJoinGroup }: StudyGroupsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Study Groups
          </CardTitle>
          <Link href="/student/study-groups">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {groups.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-700">No study groups yet</p>
            <p className="text-sm mt-1">Join or create a group to study with others.</p>
            <Link href="/student/study-groups">
              <Button className="mt-4">Browse study groups</Button>
            </Link>
          </div>
        ) : (
        <div className="space-y-3">
          {groups.slice(0, 3).map(group => (
            <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{group.name}</h4>
                <p className="text-sm text-gray-500">{group.subject}</p>
                <p className="text-xs text-gray-400">
                  {group.currentMembers}/{group.maxMembers} members
                </p>
              </div>
              {group.isMember ? (
                <Badge className="bg-green-100 text-green-800">Member</Badge>
              ) : (
                <Button
                  size="sm"
                  disabled={joiningGroupId === group.id}
                  onClick={() => onJoinGroup(group.id)}
                >
                  {joiningGroupId === group.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Join'
                  )}
                </Button>
              )}
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  )
}
