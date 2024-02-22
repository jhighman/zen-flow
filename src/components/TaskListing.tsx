'use client'

import { Task } from '@/payload-types' // Update this import to your Task type
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TASK_CATEGORIES } from '@/config' // Ensure you have this or adjust accordingly
import ImageSlider from './ImageSlider' // Assuming tasks can have image slides

interface TaskListingProps {
  task: Task | null
  index: number
}

const TaskListing = ({
  task,
  index,
}: TaskListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!task || !isVisible) return <TaskPlaceholder />

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === task.category
  )?.label

  // Assuming tasks can have images similar to products
  const validUrls = task.image ? [task.image.url] : []

  if (isVisible && task) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/task/${task.id}`}>
        <div className='flex flex-col w-full'>
          {validUrls.length > 0 && <ImageSlider urls={validUrls} />}

          <h3 className='mt-4 font-medium text-sm text-gray-700'>
            {task.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            {label} {/* Adjust if tasks have different categorization */}
          </p>
          {/* Remove price and add any task-specific info here */}
        </div>
      </Link>
    )
  }
}

const TaskPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default TaskListing
