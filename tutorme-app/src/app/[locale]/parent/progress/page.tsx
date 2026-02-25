'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, BookOpen, Award, Calendar } from 'lucide-react'

const progressData = [
  { month: 'Sep', math: 65, science: 70, english: 75 },
  { month: 'Oct', math: 72, science: 75, english: 78 },
  { month: 'Nov', math: 78, science: 80, english: 82 },
  { month: 'Dec', math: 82, science: 85, english: 85 },
  { month: 'Jan', math: 85, science: 88, english: 87 },
  { month: 'Feb', math: 88, science: 90, english: 89 },
]

const subjectProgress = [
  { subject: 'Mathematics', progress: 88, grade: 'A-', assignments: '12/14', attendance: '95%' },
  { subject: 'Science', progress: 90, grade: 'A', assignments: '15/15', attendance: '98%' },
  { subject: 'English', progress: 87, grade: 'B+', assignments: '10/12', attendance: '92%' },
  { subject: 'History', progress: 82, grade: 'B+', assignments: '8/10', attendance: '90%' },
]

const achievements = [
  { id: '1', title: 'Math Whiz', description: 'Scored 90%+ on 5 consecutive math quizzes', date: '2026-02-10', icon: '🏆' },
  { id: '2', title: 'Perfect Attendance', description: 'Attended all classes for 1 month', date: '2026-02-01', icon: '⭐' },
  { id: '3', title: 'Science Star', description: 'Completed advanced science project', date: '2026-01-25', icon: '🔬' },
]

export default function ParentProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Report</h1>
          <p className="text-gray-500 mt-1">Track your child's academic progress and achievements</p>
        </div>
        <Select defaultValue="emily">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select child" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="emily">Emily Johnson</SelectItem>
            <SelectItem value="michael">Michael Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Overall Progress</p>
                    <p className="text-2xl font-bold">88%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assignments</p>
                    <p className="text-2xl font-bold">45/51</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="text-2xl font-bold">95%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Achievements</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="math" stroke="#3b82f6" name="Mathematics" />
                    <Line type="monotone" dataKey="science" stroke="#10b981" name="Science" />
                    <Line type="monotone" dataKey="english" stroke="#f59e0b" name="English" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="grid gap-4">
            {subjectProgress.map((subject) => (
              <Card key={subject.subject}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4">
                      <h3 className="font-semibold text-lg">{subject.subject}</h3>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{subject.grade}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{subject.assignments}</p>
                        <p className="text-gray-500">Assignments</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{subject.attendance}</p>
                        <p className="text-gray-500">Attendance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{achievement.title}</h3>
                      <p className="text-gray-600 mt-1">{achievement.description}</p>
                      <p className="text-sm text-gray-400 mt-2">Earned on {achievement.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
