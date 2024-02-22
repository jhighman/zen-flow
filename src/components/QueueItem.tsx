import { TASK_CATEGORIES } from '@/config'
import { useQueue } from '@/hooks/use-queue'
import { Task, Media } from '@/payload-types'; 
import { CheckSquare, X } from 'lucide-react'
import Image from 'next/image'

const QueueItem = ({ task }: { task: Task }) => {
  const { removeItem } = useQueue()

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === task.category
  )?.label



  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
      <div className='flex items-center space-x-4'>

          {/* Task details display */}
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
