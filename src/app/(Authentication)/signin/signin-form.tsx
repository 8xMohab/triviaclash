'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { loginFormSchema } from '@/lib/zodSchema'
import { authenticateUser } from '@/lib/actions'
import { redirect, useSearchParams } from 'next/navigation'

const SignInForm = () => {
  // we have to do the redirecttion from the client because
  // the way i implemented the server actions they don't work
  // with the server 504 requests
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const redirectURL = callbackUrl || '/home'

  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { error, success } = await authenticateUser(values)
    if (error) {
      setErrorMessage(error)
    }
    if (success) redirect(redirectURL)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-20 flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
