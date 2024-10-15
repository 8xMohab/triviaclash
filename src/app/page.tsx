import { auth, signOut } from '@/auth'
import Container from '@/components/container'
import Heading from '@/components/typography/heading'
import Text from '@/components/typography/text'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()

  return (
    <main>
      <Container>
        <section className="mt-24 ">
          <div className="flex flex-col items-center text-center space-y-6 md:w-4/5 md:m-auto lg:items-start lg:text-left xl:w-1/2 lg:m-0">
            <Heading tag={1}>
              TriviaClash: Challenge Your Knowledge & Track Your Progress
            </Heading>
            <Text.TypographyP>
              Powered by the Open Trivia API, TriviaClash lets you challenge
              your knowledge with custom settings, track progress, and analyze
              detailed question stats.
            </Text.TypographyP>
            <Button size={'lg'}>
              <Link href="/challenge">Start Now!</Link>
            </Button>
          </div>
        </section>
        <div>
          {session?.user ? (
            <div className="flex items-center justify-center">
              <Image
                src="/default-avatar.png"
                alt="avatar"
                width={64}
                height={64}
              />{' '}
              {session.user.name}
              <div>
                <form
                  action={async () => {
                    'use server'
                    await signOut()
                  }}
                >
                  <button type="submit">Sign Out</button>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </Container>
    </main>
  )
}
