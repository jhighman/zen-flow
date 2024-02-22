import { TASK_CATEGORIES } from '@/config'
import { useQueue } from '@/hooks/use-queue'
import { Task } from '@/payload-types'
import { CheckSquare, X } from 'lucide-react'
import Image from 'next/image'

const QueueItem = ({ task }: { task: Task }) => {
  const { removeItem } = useQueue()

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === task.category
  )?.label

  // Improved type-safe check for the image using optional chaining
  const hasImage = !!task.image?.url;

  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center space-x-4'>
          {hasImage ? (
            <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
              {/* Using optional chaining and nullish coalescing operator to provide a fallback */}
              <Image
                src={task.image?.url ?? '/fallback-image-url.png'} // Provide a fallback URL or handle the absence more gracefully
                alt={task.name}
                fill
                className='absolute object-cover'
              />
            </div>
          ) : (
            <div className='flex h-16 w-16 items-center justify-center bg-secondary rounded'>
              <CheckSquare
                aria-hidden='true'
                className='h-6 w-6 text-muted-foreground'
              />
            </div>
          )}

          <div className='flex flex-col self-start'>
            <span className='line-clamp-1 text-sm font-medium mb-1'>
              {task.name}
            </span>

            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              {label}
            </span>

            <div className='mt-4 text-xs text-muted-foreground'>
              <button
                onClick={() => removeItem(task.id)}
                className='flex items-center gap-0.5'>
                <X className='w-3 h-4' />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueItem
