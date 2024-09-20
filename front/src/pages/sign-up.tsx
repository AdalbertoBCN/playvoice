import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <main className='min-h-screen flex items-center justify-center'>
      <SignUp path="/sign-up" signInUrl='/sign-in' afterSignOutUrl="/sign-in" />
    </main>
  )
}
