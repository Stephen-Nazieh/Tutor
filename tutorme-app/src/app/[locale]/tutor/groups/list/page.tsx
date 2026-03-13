'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Users, Plus } from 'lucide-react'

export default function GroupsListPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tutor/groups">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              All Groups
            </h1>
            <p className="text-muted-foreground">
              View and manage all your teaching groups
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/tutor/group-builder">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Link>
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Groups List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will display a detailed list of all your groups with filtering and search capabilities.
          </p>
          <div className="mt-4 p-8 text-center border-2 border-dashed rounded-lg">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Group details list coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
