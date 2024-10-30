import React from 'react'
import ChallengeSettingsForm from './challenge-settings-form'
import { getCategories, getPresets } from '@/lib/data'
import Container from '@/components/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { auth } from '@/auth'
import { notFound } from 'next/navigation'

const Challenge = async () => {
  const session = await auth()
  if (!session) notFound()

  const presets = await getPresets(session.user?.id)
  const categories = await getCategories()
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
            <ChallengeSettingsForm categories={categories} presets={presets} />
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}

export default Challenge
