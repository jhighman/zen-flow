import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
  import { TASK_CATEGORIES } from '../../config'
  import { Access, CollectionConfig } from 'payload/types'
  import { Task, User } from '../../payload-types'
  
  const addUserToTask: BeforeChangeHook<Task> = async ({
    req,
    data,
  }) => {
    const user = req.user
  
    return { ...data, user: user.id }
  }
  
  const syncUserTasks: AfterChangeHook<Task> = async ({
    req,
    doc,
  }) => {
    // This would be similar to syncUser but adapted for tasks.
  }
  
  const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    const userTaskIDs = (user.tasks || []).reduce<
      Array<string>
    >((acc, task) => {
      if (!task) return acc
      if (typeof task === 'string') {
        acc.push(task)
      } else {
        acc.push(task.id)
      }

      return acc
    }, [])

    return {
      id: {
        in: userTaskIDs,
      },
    }
  }
  
  export const Tasks: CollectionConfig = {
    slug: 'tasks',
    admin: {
      useAsTitle: 'name',
    },
    access: {
      read: isAdminOrHasAccess(),
      update: isAdminOrHasAccess(),
      delete: isAdminOrHasAccess(),
    },
    hooks: {
      // Adjust your hooks here to match task logic instead of product logic.
      afterChange: [syncUserTasks],
      beforeChange: [addUserToTask],
    },
    fields: [
      // Adjusted to match task attributes.
      {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        required: true,
        hasMany: false,
        admin: {
          condition: () => true,
        },
      },
      {
        name: 'name',
        label: 'Task Name',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Task details',
      },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: TASK_CATEGORIES.map(({ label, value }) => ({ label, value })),
        required: true,
      },
      {
        name: 'status',
        label: 'Task Status',
        type: 'select',
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Completed', value: 'completed' },
          { label: 'On Hold', value: 'on_hold' },
        ],
        required: true,
      },
      {
        name: 'workflowId',
        label: 'Workflow ID',
        type: 'text',
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
          { label: 'High', value: 'high' },
          { label: 'Medium', value: 'medium' },
          { label: 'Low', value: 'low' },
          { label: 'Critical', value: 'critical' },
        ],
        required: true,
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'label',
        label: 'Label',
        type: 'select',
        options: [
          { label: 'Problem', value: 'problem' },
          { label: 'Issue', value: 'issue' },
          { label: 'Ticket', value: 'ticket' },
          { label: 'Blocked', value: 'blocked' },
          { label: 'Development', value: 'development' },
          { label: 'Security', value: 'security' },
          { label: 'Research', value: 'research' },
          { label: 'Personal', value: 'personal' },
        ],
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'isStarted',
        label: 'Is Started?',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'isComplete',
        label: 'Is Complete?',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'isPending',
        label: 'Is Pending?',
        type: 'checkbox',
        defaultValue: true, // Assuming tasks are pending by default
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'isArchived',
        label: 'Is Archived?',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          position: 'sidebar',
        },
      },
      // Other fields as necessary, adjust according to your task management needs.
    ],
  }
  