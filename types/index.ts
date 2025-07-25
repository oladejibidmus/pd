export interface PromptItem {
  id: string
  title: string
  type: "prompt" | "command" | "snippet"
  category: string
  content: string
  description: string
  icon: string
  isFavorite: boolean
  dateAdded: Date
  tags: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface ViewSettings {
  theme: "light" | "dark" | "system"
  defaultView: "grid" | "list"
  itemsPerPage: number
}
