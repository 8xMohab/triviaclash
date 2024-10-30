import Container from '@/components/container'
import RegistrationForm from './register-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <main>
      <Container className="mt-24">
        <Card className="w-[280px] md:w-[350px] m-auto">
          <CardHeader>
            <CardTitle>Create New Account</CardTitle>
            <CardDescription>
              Create your account to start your journy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-col">
            <RegistrationForm />
            <Link href="/signin" className="text-muted-foreground text-sm">
              Already have an account?
              <span className="underline"> Sign in </span>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
