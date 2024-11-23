'use client'
import { ChallengeSubsetType } from '@/lib/models/schemas/challenge'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { decode } from 'he'
import clsx from 'clsx'
import { shuffleArray, validateTryParam } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

const QuestionsResult = ({ challenge }: { challenge: ChallengeSubsetType }) => {
  const searchParams = useSearchParams()
  const tryParam = searchParams.get('try')
  const tryNumber = validateTryParam(tryParam || '', challenge.tries.length)
  const tryAnswers = challenge.tries[tryNumber]

  return (
    <div className="space-y-8">
      {challenge.questions.map(
        (
          { question, correct_answer, category, difficulty, incorrect_answers },
          index
        ) => {
          return (
            <Card key={`question: ${question}`}>
              <CardHeader>
                <CardTitle className="leading-normal">
                  {decode(question)}
                </CardTitle>
                <CardDescription>
                  Category: {decode(category)}, Difficulty:{' '}
                  <span
                    className={clsx(
                      'capitalize',
                      difficulty === 'easy'
                        ? 'text-green-500'
                        : difficulty === 'medium'
                        ? 'text-yellow-500'
                        : 'text-destructive'
                    )}
                  >
                    {difficulty}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className="space-y-4">
                    {/* the incorrect answers has the correct answer included & shuffled */}
                    {incorrect_answers.map((answer, answerIndex) => (
                      <li
                        key={`${question},answer: ${answerIndex}`}
                        className={clsx(
                          'md:w-1/2 p-2 rounded-lg',
                          answer === correct_answer
                            ? 'bg-success'
                            : answer === tryAnswers[index] &&
                              correct_answer !== tryAnswers[index]
                            ? 'bg-danger'
                            : 'bg-accent',
                          answer === tryAnswers[index]
                            ? 'border border-foreground'
                            : ''
                        )}
                      >
                        {decode(answer)}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )
        }
      )}
    </div>
  )
}

export default QuestionsResult
