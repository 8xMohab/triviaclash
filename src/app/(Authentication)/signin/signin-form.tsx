'use client'
import React, { useEffect, useState } from 'react'
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
import { signInAction } from '@/lib/actions'
import { redirect } from 'next/navigation'

const SignInForm = () => {
  const [state, setState] = useState({ message: '' })
  const [doRedirect, setDoRedirect] = useState(false)
  const [pending, setPending] = useState(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setPending(true)
    const res = await signInAction(undefined, values)
    setPending(false)
    if (res.success) {
      setDoRedirect(true)
    }
    if (res.message) {
      setState({ message: res.message })
    }
  }

  useEffect(() => {
    if (doRedirect) redirect('/')
  }, [doRedirect])
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

        {state?.message ? (
          <p className="text-sm text-destructive" aria-live="polite">
            {state.message}
          </p>
        ) : (
          ''
        )}
        <Button
          type="submit"
          disabled={pending}
          className="min-w-20 flex items-center justify-center"
        >
          {pending ? (
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
