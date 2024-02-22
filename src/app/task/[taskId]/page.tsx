import AddToCartButton from '@/components/AddToCartButton'
import AddToQueueButton from '@/components/AddToQueueButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TaskReel from '@/components/TaskReel'
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
  console.log('Fetching task with ID:', params.taskId);

  const payload = await getPayloadClient()

  const { docs: tasks } = await payload.find({
    collection: 'tasks',
    limit: 1,
    where: {
      id: {
        equals: taskId,
      },
    },
  })

  const [task] = tasks
  if (tasks.length === 0) {
    console.log(`Task with ID ${params.taskId} not found.`);
  }    

  if (!task) return notFound()

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === task.category
  )?.label


  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* task Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {task.name}
              </h1>
            </div>

            <section className='mt-4'>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {task.description}
                </p>
              </div>
            </section>
          </div>

          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10'>
              <AddToQueueButton task={task} />
              </div>
              <div className='mt-6 text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <Shield
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskReel
        href='/tasks'
        query={{ category: task.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${task.name}'`}
      />
    </MaxWidthWrapper>
  )
}

export default Page
