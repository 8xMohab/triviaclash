'use client'
import { challengeSettingsFormSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PresetType } from '@/lib/models/schemas/preset'
import AddPresetForm from './add-preset-form'
import { notFound, redirect, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { createChallenge } from '@/lib/actions'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

export type challengeSettings = z.infer<typeof challengeSettingsFormSchema>
const ChallengeSettingsForm = ({
  categories,
  presets,
}: {
  categories: { id: number; name: string }[]
  presets: PresetType[]
}) => {
  const searchParams = useSearchParams()
  const quickParam = searchParams.get('quick')
  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState('')
  const [activeChallenge, setActiveChallenge] = useState('')
  const { data: session } = useSession()
  if (!session) notFound()
  const [presetsList, setPresetsList] = useState<PresetType[]>(presets)
  const settingsForm = useForm<challengeSettings>({
    resolver: zodResolver(challengeSettingsFormSchema),
    defaultValues: {
      category: 'any',
      difficulty: 'any',
      numberOfQuestions: 10,
      type: 'any',
    },
  })

  const {
    setValue,
    formState: { isSubmitting },
  } = settingsForm

  // Function to update form values based on a preset
  const applyPreset = (preset: challengeSettings) => {
    Object.entries(preset).map(([name, value]) => {
      setValue(name as keyof challengeSettings, value)
    })
  }

  async function onSubmit(values: challengeSettings) {
    const { success, error, challengeId } = await createChallenge(
      values,
      session?.user?.id,
    )
    if (success) redirect(`/challenge/${success}`)
    if (error) {
      setErrorMessage(error)
      if (challengeId) setActiveChallenge(challengeId)
    }
  }
  async function startQuick() {
    const { success, error, challengeId } = await createChallenge(
      {
        type: 'any',
        category: 'any',
        difficulty: 'any',
        numberOfQuestions: 10,
      },
      session?.user?.id,
    )
    if (success) redirect(`/challenge/${success}`)
    if (error) {
      setErrorMessage(error)
      if (challengeId) setActiveChallenge(challengeId)
      toast({
        title: "You can't start a challenge.",
        description: `You already have one active, Please go back to it.`,
        action: (
          <ToastAction altText="go back to challenge">
            <Link href={`/challenge/${challengeId || ''}`}>Go back</Link>
          </ToastAction>
        ),
      })
    }
  }

  useEffect(() => {
    let isQuick = false
    // varify quick param is true or else is false
    if (quickParam === 'true') {
      isQuick = true
    }
    if (isQuick) startQuick()
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="preset-select">Preset</label>
        <div className="flex space-x-3">
          <Select
            name="preset-select"
            onValueChange={(value) => applyPreset(JSON.parse(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Preset" />
            </SelectTrigger>
            <SelectContent>
              {presetsList.length > 0 ? (
                presetsList.map((preset, index) => (
                  <SelectItem
                    value={JSON.stringify(preset.settings)}
                    key={`preset- item: ${preset.name} - ${index}`}
                  >
                    {preset.name}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-center text-sm text-gray-500">
                  No presets available
                </div>
              )}
            </SelectContent>
          </Select>
          <AddPresetForm
            categories={categories}
            presetsList={presetsList}
            setPresetsList={setPresetsList}
          />
        </div>
      </div>
      <Form {...settingsForm}>
        <form
          onSubmit={settingsForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={settingsForm.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="max number is 50"
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? '' : e.target.valueAsNumber,
                      )
                    }
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={settingsForm.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={`category - item: ${category.id}`}
                        value={`${category.id}`}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={settingsForm.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select a Difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Difficulty</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={settingsForm.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Questions Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="multiple" />
                      </FormControl>
                      <FormLabel>Multiple</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="boolean" />
                      </FormControl>
                      <FormLabel>True/False</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="any" />
                      </FormControl>
                      <FormLabel>Any</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage ? (
            <p className="text-sm text-destructive" aria-live="polite">
              <span> {errorMessage} </span>
              {activeChallenge ? (
                <Link
                  href={`/challenge/${activeChallenge}`}
                  className="underline"
                >
                  go back to it
                </Link>
              ) : (
                ''
              )}
            </p>
          ) : (
            ''
          )}
          <Button type="submit">
            {isSubmitting ? (
              <div className="">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              'Start Challenge!'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChallengeSettingsForm
