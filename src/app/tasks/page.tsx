import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TaskReel from '@/components/TaskReel' // This would be a new component similar to ProductReel but for tasks
import { TASK_CATEGORIES } from '@/config'

type Param = string | string[] | undefined

interface TasksPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const TasksPage = ({
  searchParams,
}: TasksPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = TASK_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  return (
    <MaxWidthWrapper>
      <TaskReel
        title={label ?? 'Explore Tasks'}
        query={{
          category,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default TasksPage
