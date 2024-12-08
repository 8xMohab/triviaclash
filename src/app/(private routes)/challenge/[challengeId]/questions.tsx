'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { decode } from 'he'
import React, { useState } from 'react'
import { ChallengeSubsetType } from '@/lib/models/schemas/challenge'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnsweringFormSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addAnswer } from '@/lib/actions'
import { redirect } from 'next/navigation'

let userAnswers: Array<string> = []
const Questions = ({
  challenge,
  challengeId,
}: {
  challenge: ChallengeSubsetType
  challengeId: string
}) => {
  const [currectQuestion, setCurrectQuestion] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm<z.infer<typeof AnsweringFormSchema>>({
    resolver: zodResolver(AnsweringFormSchema),
  })
  const { question, category, difficulty, incorrect_answers } =
    challenge.questions[currectQuestion]

  async function onSubmit(data: z.infer<typeof AnsweringFormSchema>) {
    // if we hit the limit we submit
    if (userAnswers.length < challenge.questions.length) {
      userAnswers.push(data.user_answer)
      form.reset()
    }
    if (currectQuestion + 1 < challenge.questions.length) {
      setCurrectQuestion(currectQuestion + 1)
    }
    if (userAnswers.length === challenge.questions.length) {
      const { success, error } = await addAnswer(challengeId, userAnswers)
      if (success) {
        userAnswers = []
        form.reset()
        redirect(`/results/${challengeId}?try=${success}`)
      }
      if (error) setErrorMessage(error)
    }
  }
  return (
    <main className="mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="leading-normal">{decode(question)}</CardTitle>
          <CardDescription>
            Category: {decode(category)}, Difficulty:{' '}
            <span
              className={clsx(
                'capitalize',
                difficulty === 'easy'
                  ? 'text-green-500'
                  : difficulty === 'medium'
                    ? 'text-yellow-500'
                    : 'text-destructive',
              )}
            >
              {difficulty}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="user_answer"
                render={({ field }) => (
                  <FormItem className="space-y-8">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-4"
                      >
                        {incorrect_answers.map((answer) => (
                          <FormItem
                            key={`answer_${answer}`}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={answer} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {decode(answer)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage ? (
                <p className="text-sm text-destructive" aria-live="polite">
                  {errorMessage}
                </p>
              ) : (
                ''
              )}
              <Button type="submit">
                {userAnswers.length + 1 < challenge.questions.length
                  ? 'Next Question'
                  : 'Finish Challenge'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Questions
