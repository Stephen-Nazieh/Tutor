import { AgreementText } from '@/components/legal/AgreementText'

export default function CodeOfConductPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Code of Conduct</h1>
      <div className="prose prose-blue max-w-none">
        <AgreementText />
      </div>
    </div>
  )
}
