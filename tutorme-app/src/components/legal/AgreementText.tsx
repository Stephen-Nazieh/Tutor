import React from 'react'

export function AgreementText() {
    return (
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">1. Terms of Service</h3>
                <p>
                    Welcome to TutorMe. By accessing our platform, you agree to comply with these terms.
                    Our platform connects students with tutors for educational purposes.
                    You are responsible for maintaining the confidentiality of your account.
                </p>
            </section>

            <section>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">2. Privacy Policy</h3>
                <p>
                    We value your privacy. We collect information to provide and improve our services.
                    Your data, including profile information and usage logs, is stored securely.
                    We do not sell your personal data to third parties.
                </p>
            </section>

            <section>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">3. Code of Conduct</h3>
                <p>
                    <strong>Respect:</strong> Treat all tutors and students with respect. Harassment or abuse is strictly prohibited.
                </p>
                <p>
                    <strong>Integrity:</strong> Do not cheat or help others cheat. Academic honesty is paramount.
                </p>
                <p>
                    <strong>Safety:</strong> Do not share personal contact information (phone, address) outside the platform.
                    Report any suspicious behavior immediately.
                </p>
            </section>
        </div>
    )
}
