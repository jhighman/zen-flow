'use client'

import { Button } from '@/components/ui/button'
import { TASK_CATEGORIES } from '@/config'
import { useQueue } from '@/hooks/use-queue' // Adapted hook for task queue management
import { Check, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const { items, removeItem } = useQueue()

  const router = useRouter()

  const taskIds = items.map(({ task }) => task.id)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Queued Tasks
        </h1>

        {isMounted && items.length === 0 ? (
          <div className='text-center'>
            <p>Your queue is empty. No outstanding tasks!</p>
          </div>
        ) : (
          <div>
            <ul>
              {items.map(({ task }) => {
                const label = TASK_CATEGORIES.find((c) => c.value === task.category)?.label

                return (
                  <li key={task.id} className='flex py-6 sm:py-10'>
                    <div className='ml-4 flex flex-1 flex-col'>
                      <div className='flex justify-between'>
                        <h3 className='text-sm'>
                          {task.name}
                        </h3>
                        <Button aria-label='remove task' onClick={() => removeItem(task.id)} variant='ghost'>
                          <X className='h-5 w-5' aria-hidden='true' />
                        </Button>
                      </div>
                      <p className='mt-1 text-sm'>Category: {label}</p>
                      <p className='mt-1 text-sm'>{task.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
