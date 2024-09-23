import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <main className='min-h-[640px] flex items-center justify-center'>
      <SignUp
        appearance={{
          layout: {
            logoImageUrl: '/PlayVoiceLogo.png',
            unsafe_disableDevelopmentModeWarnings: true,
          },
          elements: {
            card: 'bg-[#101010]',
            footerItem: 'bg-[#101010]',
            footer: {
              background: '#101010',
            },
            footerAction: 'bg-[#101010]',
            footerActionText: 'text-[#ffffff]',
            footerActionLink: 'text-[#ffffff]',
            socialButtonsBlockButton: 'bg-white',
            headerTitle: 'text-white',
            formFieldLabel: 'text-[#ffffff]',
            dividerText: 'text-[#ffffff]',
            formButtonPrimary: 'bg-[#0F172A] hover:bg-slate-400 text-[#ffffff] text-sm',
          },
        }}
      path="/sign-up" signInUrl='/sign-in' afterSignOutUrl="/sign-in" />
    </main>
  )
}
