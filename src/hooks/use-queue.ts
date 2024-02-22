import { Task } from '@/payload-types' // Assuming you have a Task type defined similar to Product
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type QueueItem = {
  task: Task
}

type QueueState = {
  items: QueueItem[]
  addItem: (task: Task) => void
  removeItem: (taskId: string) => void
  clearQueue: () => void
}

export const useQueue = create<QueueState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (task) =>
        set((state) => {
          // Prevent adding duplicate tasks based on task.id
          const existingTaskIndex = state.items.findIndex((item) => item.task.id === task.id);
          if (existingTaskIndex === -1) {
            return { items: [...state.items, { task }] };
          } else {
            return state; // If task already exists in queue, do nothing
          }
        }),
      removeItem: (taskId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.task.id !== taskId
          ),
        })),
      clearQueue: () => set({ items: [] }),
    }),
    {
      name: 'queue-storage', // Ensure unique storage key different from 'cart-storage'
      storage: createJSONStorage(() => localStorage),
    }
  )
)
