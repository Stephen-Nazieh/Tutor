import { AgreementText } from '@/components/legal/AgreementText'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none">
        <AgreementText />
      </div>
    </div>
  )
}
