// todo: might move this to config
// nb: this might not be used later on so just leave this alone for now

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  CircleXIcon,
  CircleHelpIcon,
  TimerIcon,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
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
    value: "backlog",
    label: "Backlog",
    icon: CircleHelpIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: TimerIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircleIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleXIcon,
  },

  // todo
  {
    value: "On Progress",
    label: "On Progress",
    icon: TimerIcon,
  },
  {
    value: "Finish",
    label: "Finish",
    icon: CheckCircleIcon,
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
