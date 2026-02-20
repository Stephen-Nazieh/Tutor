'use client'

/**
 * Feedback Review Panel
 * Tutor interface for reviewing AI-generated feedback
 */

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Edit, 
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { cn } from '@/lib/utils'

interface FeedbackItem {
  id: string
  studentId: string
  studentName?: string
  type: 'task_feedback' | 'progress_report' | 'encouragement' | 'correction'
  priority: 'low' | 'medium' | 'high'
  aiContent: {
    content: string
    tone: 'positive' | 'neutral' | 'constructive'
    suggestedActions?: string[]
    relatedResources?: string[]
    aiConfidence: number
  }
  createdAt: Date
}

interface FeedbackStats {
  pendingCount: number
  approvedToday: number
  rejectedToday: number
  averageConfidence: number
  autoApprovedRate: number
}

interface FeedbackReviewPanelProps {
  tutorId?: string
  onApprove?: (id: string, modifiedContent?: string) => Promise<void>
  onReject?: (id: string) => Promise<void>
  onBatchApprove?: (ids: string[]) => Promise<void>
}

export function FeedbackReviewPanel({
  tutorId,
  onApprove,
  onReject,
  onBatchApprove
}: FeedbackReviewPanelProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('pending')

  // Load feedback data
  useEffect(() => {
    loadFeedbackData()
  }, [filterPriority, filterType])

  const loadFeedbackData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterPriority !== 'all') params.append('priority', filterPriority)
      if (filterType !== 'all') params.append('type', filterType)

      const [itemsRes, statsRes] = await Promise.all([
        fetch(`/api/feedback/pending?${params}`),
        fetch('/api/feedback/stats')
      ])

      if (itemsRes.ok) {
        const data = await itemsRes.json()
        setFeedbackItems(data.items || [])
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.size === feedbackItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(feedbackItems.map(item => item.id)))
    }
  }

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const handleApprove = async (item: FeedbackItem) => {
    if (onApprove) {
      await onApprove(item.id, editingItem === item.id ? editedContent : undefined)
    } else {
      // Default API call
      const response = await fetch(`/api/feedback/${item.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: editingItem === item.id ? 'modify' : 'approve',
          modifications: editingItem === item.id ? { modifiedContent: editedContent } : undefined
        })
      })

      if (response.ok) {
        setFeedbackItems(prev => prev.filter(f => f.id !== item.id))
        setExpandedItem(null)
        setEditingItem(null)
      }
    }
  }

  const handleReject = async (item: FeedbackItem) => {
    if (onReject) {
      await onReject(item.id)
    } else {
      const response = await fetch(`/api/feedback/${item.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: 'reject' })
      })

      if (response.ok) {
        setFeedbackItems(prev => prev.filter(f => f.id !== item.id))
        setExpandedItem(null)
      }
    }
  }

  const handleBatchApprove = async () => {
    if (selectedItems.size === 0) return

    if (onBatchApprove) {
      await onBatchApprove(Array.from(selectedItems))
    } else {
      const response = await fetch('/api/feedback/batch-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedItems) })
      })

      if (response.ok) {
        setFeedbackItems(prev => prev.filter(f => !selectedItems.has(f.id)))
        setSelectedItems(new Set())
      }
    }
  }

  const startEditing = (item: FeedbackItem) => {
    setEditingItem(item.id)
    setEditedContent(item.aiContent.content)
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      task_feedback: '作业反馈',
      progress_report: '进度报告',
      encouragement: '鼓励',
      correction: '纠正'
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      task_feedback: 'bg-blue-100 text-blue-800',
      progress_report: 'bg-green-100 text-green-800',
      encouragement: 'bg-yellow-100 text-yellow-800',
      correction: 'bg-red-100 text-red-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    }
    return colors[priority] || 'bg-gray-500'
  }

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case 'constructive':
        return <Edit className="h-4 w-4 text-yellow-500" />
      default:
        return <span className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">AI 反馈审核</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              审核AI生成的学生反馈内容
            </p>
          </div>
          <div className="flex items-center gap-4">
            {stats && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>待审核: <strong>{stats.pendingCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>今日通过: <strong>{stats.approvedToday}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              待审核 ({feedbackItems.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              历史记录
            </TabsTrigger>
            <TabsTrigger value="stats">
              统计
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部优先级</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="task_feedback">作业反馈</SelectItem>
                  <SelectItem value="progress_report">进度报告</SelectItem>
                  <SelectItem value="encouragement">鼓励</SelectItem>
                  <SelectItem value="correction">纠正</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              {selectedItems.size > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleBatchApprove}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  批量通过 ({selectedItems.size})
                </Button>
              )}
            </div>

            {/* Feedback List */}
            <ScrollArea className="h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : feedbackItems.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>所有反馈已审核完成！</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Select All Header */}
                  <div className="flex items-center gap-4 p-2 border-b">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === feedbackItems.length && feedbackItems.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-muted-foreground">
                      全选 ({selectedItems.size}/{feedbackItems.length})
                    </span>
                  </div>

                  {feedbackItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "border rounded-lg transition-all",
                        expandedItem === item.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                      )}
                    >
                      {/* Header */}
                      <div 
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setExpandedItem(
                          expandedItem === item.id ? null : item.id
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleSelectItem(item.id)
                          }}
                          className="rounded border-gray-300"
                        />

                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {item.studentName?.[0] || 'S'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">
                              {item.studentName || '未知学生'}
                            </span>
                            <Badge 
                              variant="secondary"
                              className={getTypeColor(item.type)}
                            >
                              {getTypeLabel(item.type)}
                            </Badge>
                            <div 
                              className={cn(
                                "w-2 h-2 rounded-full",
                                getPriorityColor(item.priority)
                              )}
                              title={`优先级: ${item.priority}`}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.aiContent.content.substring(0, 100)}...
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {getToneIcon(item.aiContent.tone)}
                              <span className="text-xs text-muted-foreground">
                                AI 置信度: {Math.round(item.aiContent.aiConfidence * 100)}%
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.createdAt).toLocaleString('zh-CN')}
                            </span>
                          </div>
                          {expandedItem === item.id ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedItem === item.id && (
                        <div className="border-t px-4 pb-4">
                          {editingItem === item.id ? (
                            <div className="py-4 space-y-4">
                              <Textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                rows={6}
                                className="resize-none"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingItem(null)
                                    setEditedContent('')
                                  }}
                                >
                                  取消
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(item)}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  保存并发送
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="py-4">
                                <h4 className="text-sm font-medium mb-2">反馈内容</h4>
                                <div className="bg-muted p-4 rounded-lg text-sm leading-relaxed">
                                  {item.aiContent.content}
                                </div>
                              </div>

                              {item.aiContent.suggestedActions && item.aiContent.suggestedActions.length > 0 && (
                                <div className="py-2">
                                  <h4 className="text-sm font-medium mb-2">建议行动</h4>
                                  <ul className="space-y-1">
                                    {item.aiContent.suggestedActions.map((action, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {item.aiContent.relatedResources && item.aiContent.relatedResources.length > 0 && (
                                <div className="py-2">
                                  <h4 className="text-sm font-medium mb-2">相关资源</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {item.aiContent.relatedResources.map((resource, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {resource}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="my-4 border-t" />

                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReject(item)}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  拒绝
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => startEditing(item)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  编辑
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(item)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  通过并发送
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <p>历史记录功能即将上线</p>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            {stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{stats.pendingCount}</div>
                    <p className="text-xs text-muted-foreground">待审核</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{stats.approvedToday}</div>
                    <p className="text-xs text-muted-foreground">今日通过</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {Math.round(stats.averageConfidence * 100)}%
                    </div>
                    <p className="text-xs text-muted-foreground">平均AI置信度</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {Math.round(stats.autoApprovedRate * 100)}%
                    </div>
                    <p className="text-xs text-muted-foreground">自动通过率</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
