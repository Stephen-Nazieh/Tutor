'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Target, BookOpen, TrendingUp } from 'lucide-react'

interface PersonalizedFeedbackCardProps {
    feedback: string
    explanation: string
    nextSteps?: string[]
    relatedStruggles?: string[]
    isPersonalized?: boolean
    score: number
    maxScore: number
}

export function PersonalizedFeedbackCard({
    feedback,
    explanation,
    nextSteps = [],
    relatedStruggles = [],
    isPersonalized = false,
    score,
    maxScore
}: PersonalizedFeedbackCardProps) {
    const percentage = (score / maxScore) * 100

    return (
        <Card className="relative overflow-hidden border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
            {isPersonalized && (
                <div className="absolute top-3 right-3">
                    <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 gap-1"
                    >
                        <Sparkles className="w-3 h-3" />
                        Personalized for You
                    </Badge>
                </div>
            )}

            <CardContent className="pt-6 space-y-4">
                {/* Feedback */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-sm text-gray-700">Feedback</h4>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{feedback}</p>
                </div>

                {/* Explanation */}
                {explanation && (
                    <div>
                        <p className="text-xs text-gray-600 leading-relaxed">{explanation}</p>
                    </div>
                )}

                {/* Next Steps */}
                {nextSteps.length > 0 && (
                    <div className="pt-2 border-t border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-sm text-gray-700">Next Steps</h4>
                        </div>
                        <ul className="space-y-1.5">
                            {nextSteps.map((step, idx) => (
                                <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                                    <span className="text-purple-500 font-bold mt-0.5">•</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Related Struggles */}
                {relatedStruggles.length > 0 && (
                    <div className="pt-2 border-t border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-amber-600" />
                            <h4 className="font-semibold text-sm text-gray-700">Related to Your Progress</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {relatedStruggles.map((struggle, idx) => (
                                <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs bg-amber-50 text-amber-700 border-amber-200"
                                >
                                    {struggle}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Performance Indicator */}
                {percentage >= 85 && (
                    <div className="pt-2">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            🎉 Excellent Progress!
                        </Badge>
                    </div>
                )}
                {percentage >= 70 && percentage < 85 && (
                    <div className="pt-2">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            👍 Good Work!
                        </Badge>
                    </div>
                )}
                {percentage < 70 && (
                    <div className="pt-2">
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            ⚠️ Needs Review
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
