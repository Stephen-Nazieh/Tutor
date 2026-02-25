import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            TutorMe
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Human Hybrid Tutoring Platform
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>AI Learning</CardTitle>
              <CardDescription>24/7 Socratic AI tutor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get instant help with our AI that guides you to answers, never just gives them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Classes</CardTitle>
              <CardDescription>Group learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Join live classes where AI monitors progress and tutors provide targeted help.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Visualize your growth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                See your knowledge graph grow as you master new concepts.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 text-gray-500">
          <p>MVP in Development - Phase 1 Complete</p>
        </div>
      </div>
    </main>
  )
}
