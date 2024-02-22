'use client'

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useQueue } from '@/hooks/use-queue'; // Assuming you have a similar hook for queue management
import { Task } from '@/payload-types'; // Assuming you have defined a Task type

const AddToQueueButton = ({
  task,
}: {
  task: Task;
}) => {
  const { addItem } = useQueue(); // Assuming addTask is a function provided by useQueue
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000); // Reset success state after 2 seconds

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(task); // Add the task to the queue
        setIsSuccess(true); // Temporarily show success state
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? 'Queued!' : 'Add to queue'}
    </Button>
  );
};

export default AddToQueueButton;
