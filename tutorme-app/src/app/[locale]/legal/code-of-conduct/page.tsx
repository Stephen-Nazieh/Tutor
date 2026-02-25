import { AgreementText } from '@/components/legal/AgreementText'

export default function CodeOfConductPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Code of Conduct</h1>
            <div className="prose prose-blue max-w-none">
                <AgreementText />
            </div>
        </div>
    )
}
