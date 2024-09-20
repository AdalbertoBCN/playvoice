import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <main className='flex items-center justify-center'>
      <SignIn path="/sign-in" signUpUrl='/sign-up' signUpForceRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" />
    </main>
  )
}