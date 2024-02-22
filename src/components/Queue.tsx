'use client'

import { ClipboardList } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useQueue } from '@/hooks/use-queue' // Assuming you've created a useQueue hook similar to useCart
import { ScrollArea } from './ui/scroll-area'
import QueueItem from './QueueItem' // Assuming you create a QueueItem component similar to CartItem
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Queue = () => {
  const { items } = useQueue()
  const itemCount = items.length

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ClipboardList
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Queue ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              <ScrollArea>
                {items.map(({ task }) => (
                  <QueueItem
                    task={task}
                    key={task.id}
                  />
                ))}
              </ScrollArea>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href='/queue'
                  className={buttonVariants({
                    className: 'w-full',
                  })}>
                  Review Your Queue
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative mb-4 h-60 w-60 text-muted-foreground'>
              {/* Assuming you have an appropriate empty queue illustration */}
              <Image
                src='/veriflow-empty-queue.png'
                fill
                alt='empty queue'
              />
            </div>
            <div className='text-xl font-semibold'>
              Your queue is empty
            </div>
            <SheetTrigger asChild>
              <Link
                href='/tasks'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground',
                })}>
                Add tasks to your queue
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Queue
