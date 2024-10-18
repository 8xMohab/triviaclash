import React from 'react'
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

const AddPresetForm = () => {
  const { data: session } = useSession()
  console.log(session)

  if (!session) notFound()
  return (
    <Dialog>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{session.user?.id}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddPresetForm
