import { auth } from '@/auth'
import Container from '@/components/container'
import Heading from '@/components/typography/heading'
import Text from '@/components/typography/text'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Home = async () => {
  const session = await auth()
  return (
    <main>
      <Container>
        <section className="mt-24">
          <div className="flex flex-col items-center text-center space-y-6 md:w-4/5 md:m-auto lg:items-start lg:text-left lg:m-0">
            <Heading tag={1}>Welcome back, {session?.user?.name}!</Heading>
            <Text.TypographyP>
              Ready to level up? Create a custom challenge with your favorite
              settings, or start a quick match and jump right in.
            </Text.TypographyP>
            <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
              <Button className="w-full" size={'lg'}>
                <Link href="/challenge?quick=true">Quick Challenge</Link>
              </Button>
              <Button className="w-full" size={'lg'} variant="outline">
                <Link href="/challenge">Custom Challenge</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Home
