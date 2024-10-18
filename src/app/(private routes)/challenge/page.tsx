import React from 'react'
import ChallengeSettingsForm from './challenge-settings-form'
import { getCategories, getPresets } from '@/lib/dataActions'
import { localCategories } from '@/lib/localCategories'
import Container from '@/components/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { auth } from '@/auth'
import { notFound, redirect } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'

const Challenge = async () => {
  const session = await auth()
  if (!session) notFound()
  console.log('User session: ', session)

  const presets = (await getPresets(session?.user?.id)) || []

  const serverCategories = await getCategories()
  const categories = serverCategories || localCategories
  return (
    <main>
      <Container className="mt-24">
        <Card className="w-[280px] md:w-[350px] lg:w-[400px] m-auto">
          <CardHeader>
            <CardTitle>Match Settings</CardTitle>
            <CardDescription>
              Fine-tune your settings or start from a preset
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-col">
            <SessionProvider session={session}>
              <ChallengeSettingsForm
                categories={categories}
                presets={presets}
              />
            </SessionProvider>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}

export default Challenge
