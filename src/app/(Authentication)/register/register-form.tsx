'use client'
import React, { Suspense, useState } from 'react'
import { z } from 'zod'
import { authenticateUser, createUser } from '@/lib/actions'
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
import { registerFormSchema } from '@/lib/zodSchema'
import { useToast } from '@/hooks/use-toast'
import { redirect, useSearchParams } from 'next/navigation'

const RegistrationForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const redirectURL = callbackUrl || '/home'
  const [errorMessage, setErrorMessage] = useState('')
  const { toast } = useToast()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    setError,
    formState: { isSubmitting },
  } = form
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const { success, error, fields } = await createUser(values)
    if (error) {
      setErrorMessage(error)
      if (fields) {
        fields.map((field) => {
          if (field.name === 'name') return
          setError(field.name, { message: field.message })
        })
      }
    }
    if (success) {
      toast({
        title: 'User has been created successfuly.',
        description: success,
      })
      const { error, success: signInSucess } = await authenticateUser(values)
      if (error) {
        setErrorMessage(`Failed to sign in. ${error}`)
      }
      if (signInSucess) redirect(redirectURL)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="my_username" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
          className="min-w-32 flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            'Create Acount'
          )}
        </Button>
      </form>
    </Form>
  )
}

// Wrap the RegistrationForm inside Suspense
const SuspendedRegistrationForm = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RegistrationForm />
  </Suspense>
)

export default SuspendedRegistrationForm
