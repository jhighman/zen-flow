import AddToQueueButton from "@/components/AddToQueueButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TaskReel from "@/components/TaskReel";
import { TASK_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Shield, Clock, Archive, Flag } from "lucide-react";

interface PageProps {
  params: {
    taskId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { taskId } = params;

  const payload = await getPayloadClient();
  const { docs: tasks } = await payload.find({
    collection: "tasks",
    limit: 1,
    where: { id: { equals: taskId } },
  });

  const task = tasks[0];
  if (!task) {
    console.log(`Task with ID ${taskId} not found.`);
    return notFound();
  }

  const label = TASK_CATEGORIES.find(({ value }) => value === task.category)?.label;
  const formattedPriority = task.priority ? `${task.priority.charAt(0).toUpperCase()}${task.priority.slice(1)}` : "Unknown";

  return (
    <MaxWidthWrapper className="bg-white">
      {/* Page layout */}
      <div className="lg:max-w-lg lg:self-end">
        {/* Task Details */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{task.name}</h1>
        <p className="text-base text-muted-foreground">{task.description}</p>
        <p className="mt-2">
          <Flag className="inline-block" /> Priority: {formattedPriority}
        </p>
        {task.isStarted && <p><Clock className="inline-block" /> Started</p>}
        {task.isComplete && <p><Check className="inline-block" /> Completed</p>}
        {task.isPending && <p><Clock className="inline-block" /> Pending</p>}
        {task.isArchived && <p><Archive className="inline-block" /> Archived</p>}
      </div>

      {/* AddToQueueButton and other components */}
      <div className="mt-10">
        <AddToQueueButton task={task} />
      </div>

      <TaskReel href="/tasks" query={{ category: task.category, limit: 4 }} title={`Similar ${label}`} subtitle={`Explore similar tasks like '${task.name}'`} />
    </MaxWidthWrapper>
  );
};

export default Page;
