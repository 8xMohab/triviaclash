'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { presetFormSchema, PresetFormType } from '@/lib/zodSchema'
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
import { addPreset } from '@/lib/actions'
import { useToast } from '@/hooks/use-toast'
import { PresetType } from '@/lib/models/schemas/preset'

const AddPresetForm = ({
  categories,
  presetsList,
  setPresetsList,
}: {
  categories: { id: number; name: string }[]
  presetsList: PresetType[]
  setPresetsList: React.Dispatch<React.SetStateAction<PresetType[]>>
}) => {
  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  if (!session) notFound()

  const form = useForm<PresetFormType>({
    resolver: zodResolver(presetFormSchema),
    defaultValues: {
      name: '',
      settings: {
        category: 'any',
        difficulty: 'any',
        numberOfQuestions: 10,
        type: 'any',
      },
    },
  })
  const { formState, setError } = form
  async function onSubmit(values: PresetFormType) {
    const { error, success, fields } = await addPreset(
      values,
      session?.user?.id
    )
    if (error) {
      setErrorMessage(error)
      if (fields) {
        fields.map((field) => {
          if (field.name === 'name')
            setError(field.name, { message: field.message })
        })
      }
    }
    if (success) {
      toast({
        title: success,
      })
      setPresetsList([...presetsList, values])

      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="min-w-10 min-h-10"
                asChild
              >
                <div>
                  <PlusIcon className="w-4 h-4" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a preset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="w-[280px] md:w-fit m-auto">
        <DialogHeader>
          <DialogTitle>Add a New Preset</DialogTitle>
          <DialogDescription>
            Create and save your custom challenge settings for future use.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Preset Name" type="text" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="settings.numberOfQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="max number is 50"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="settings.category"
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
                          key={`category-item-preset: ${category.id}`}
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
              control={form.control}
              name="settings.difficulty"
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
              control={form.control}
              name="settings.type"
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
                {errorMessage}
              </p>
            ) : (
              ''
            )}

            <Button type="submit" disabled={formState.isSubmitting}>
              Add Preset {formState.isSubmitting ? <p>Loading...</p> : ''}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPresetForm
