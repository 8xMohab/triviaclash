import Container from '@/components/container'
import SignInForm from './signin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const searchParams = await props.searchParams
  const callback = searchParams.callbackUrl || ''
  const redirectUrl = callback ? `?callback=${callback}` : ''
  return (
    <main>
      <Container className="mt-24">
        <Card className="w-[280px] md:w-[350px] m-auto">
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Log in to continue your challenge journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-col">
            <SignInForm />
            <Link
              href={`/register${redirectUrl}`}
              className="text-muted-foreground text-sm"
            >
              Don&apos;t have an account?
              <span className="underline"> Create Account</span>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
