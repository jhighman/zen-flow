import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TaskReel from '@/components/TaskReel' // Assuming a component for displaying related tasks
import { TASK_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    taskId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Tasks', href: '/tasks' },
]

const Page = async ({ params }: PageProps) => {
  const { taskId } = params

  const payload = await getPayloadClient()

  const { docs: tasks } = await payload.find({
    collection: 'tasks',
    limit: 1,
    where: {
      id: {
        equals: taskId,
      },
      // Assuming tasks have a status or similar field to indicate availability
    },
  })

  const [task] = tasks

  if (!task) return notFound()

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === task.category
  )?.label


  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Task Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <nav aria-label="Breadcrumb">
              <ol className='flex items-center space-x-2'>
                {BREADCRUMBS.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <Link href={breadcrumb.href}>
                      <a className='text-sm font-medium text-gray-500 hover:text-gray-700'>{breadcrumb.name}</a>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {task.name}
            </h1>

            <section aria-labelledby="task-information-heading" className='mt-4'>
              <h2 id="task-information-heading" className="sr-only">Task Information</h2>
              <p className='text-base text-gray-500'>{task.description}</p>
              <div className='mt-4'>
                <Check className='h-5 w-5 text-green-500' aria-hidden='true' />
                <span className='ml-2 text-sm text-gray-500'>Status: {task.status}</span>
              </div>
            </section>
          </div>
        </div>
      </div>

      <TaskReel
        title={`Related Tasks`}
        query={{ category: task.category, limit: 4 }}
      />
    </MaxWidthWrapper>
  )
}

export default Page
