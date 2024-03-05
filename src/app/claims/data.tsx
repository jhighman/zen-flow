import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "issue",
      label: "Issue",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "pending",
      label: "Pending",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "notStarted",
      label: "NotStarted",
      icon: CircleIcon,
    },
    {
      value: "inProgress",
      label: "In Progress",
      icon: StopwatchIcon,
    },
    {
      value: "complete",
      label: "Complete",
      icon: CheckCircledIcon,
    },
    {
      value: "onHold",
      label: "On Hold",
      icon: CrossCircledIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]