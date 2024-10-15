'use client'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { register } from '@/lib/actions'
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
import { redirect } from 'next/navigation'

const RegistrationForm = () => {
  const [state, setState] = useState({ message: '' })
  const [doRedirect, setDoRedirect] = useState(false)
  const [pending, setPending] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setPending(true)
    const res = await register(undefined, values)
    setPending(false)
    if (res.toast) {
      toast({
        title: res.toast.title,
        description: res.toast.description,
      })
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

        {state?.message ? (
          <p className="text-sm text-destructive" aria-live="polite">
            {state.message}
          </p>
        ) : (
          ''
        )}
        <Button
          type="submit"
          className="min-w-32 flex items-center justify-center"
        >
          {pending ? (
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
export default RegistrationForm
