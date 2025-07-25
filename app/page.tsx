"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { PromptGallery } from "@/components/prompt-gallery"
import { AddPromptModal } from "@/components/add-prompt-modal"
import { ItemDetailModal } from "@/components/item-detail-modal"
import { EditPromptModal } from "@/components/edit-prompt-modal"
import { CategoryManagement } from "@/components/category-management"
import { SettingsPage } from "@/components/settings-page"
import { HelpCenter } from "@/components/help-center"
import type { PromptItem, Category } from "@/types"

// Sample data
const sampleCategories: Category[] = [
  { id: "1", name: "AI Prompts", icon: "Bot", color: "#3B82F6" },
  { id: "2", name: "Command Lines", icon: "Terminal", color: "#059669" },
  { id: "3", name: "Code Snippets", icon: "Code", color: "#7C3AED" },
  { id: "4", name: "Git Commands", icon: "GitBranch", color: "#DC2626" },
]

const samplePrompts: PromptItem[] = [
  {
    id: "1",
    title: "React Component Generator",
    type: "prompt",
    category: "AI Prompts",
    content: "Create a React functional component with TypeScript that accepts props for...",
    description: "Generates clean React components with TypeScript",
    icon: "Bot",
    isFavorite: true,
    dateAdded: new Date("2024-01-15"),
    tags: ["react", "typescript", "component"],
  },
  {
    id: "2",
    title: "Docker Build Command",
    type: "command",
    category: "Command Lines",
    content: "docker build -t my-app:latest .",
    description: "Build Docker image with latest tag",
    icon: "Terminal",
    isFavorite: false,
    dateAdded: new Date("2024-01-10"),
    tags: ["docker", "build"],
  },
  {
    id: "3",
    title: "Array Map Function",
    type: "snippet",
    category: "Code Snippets",
    content: "const mapped = array.map((item, index) => {\n  return item.property;\n});",
    description: "JavaScript array mapping template",
    icon: "Code",
    isFavorite: true,
    dateAdded: new Date("2024-01-12"),
    tags: ["javascript", "array", "map"],
  },
]

export default function Home() {
  const [currentView, setCurrentView] = useState<string>("gallery")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [prompts, setPrompts] = useState<PromptItem[]>(samplePrompts)
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "favorites" && prompt.isFavorite) ||
      prompt.category === selectedCategory
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleAddPrompt = (newPrompt: Omit<PromptItem, "id" | "dateAdded">) => {
    const prompt: PromptItem = {
      ...newPrompt,
      id: Date.now().toString(),
      dateAdded: new Date(),
    }
    setPrompts([...prompts, prompt])
    setIsAddModalOpen(false)
  }

  const handleEditPrompt = (updatedPrompt: PromptItem) => {
    setPrompts(prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p)))
    setIsEditModalOpen(false)
    setSelectedPrompt(null)
  }

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter((p) => p.id !== id))
    setIsDetailModalOpen(false)
    setSelectedPrompt(null)
  }

  const handleToggleFavorite = (id: string) => {
    setPrompts(prompts.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)))
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "categories":
        return <CategoryManagement categories={categories} setCategories={setCategories} />
      case "settings":
        return <SettingsPage />
      case "help":
        return <HelpCenter />
      default:
        return (
          <PromptGallery
            prompts={filteredPrompts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPromptClick={(prompt) => {
              setSelectedPrompt(prompt)
              setIsDetailModalOpen(true)
            }}
            onToggleFavorite={handleToggleFavorite}
            onAddNew={() => setIsAddModalOpen(true)}
          />
        )
    }
  }

  return (
    <div className="flex h-screen">
      <AppSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentView={currentView}
        setCurrentView={setCurrentView}
        promptCount={prompts.length}
        favoriteCount={prompts.filter((p) => p.isFavorite).length}
      />
      <div className="flex-1 overflow-hidden">{renderCurrentView()}</div>

      <AddPromptModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onAddPrompt={handleAddPrompt}
        categories={categories}
      />

      {selectedPrompt && (
        <>
          <ItemDetailModal
            isOpen={isDetailModalOpen}
            setIsOpen={setIsDetailModalOpen}
            prompt={selectedPrompt}
            onEdit={() => {
              setIsDetailModalOpen(false)
              setIsEditModalOpen(true)
            }}
            onDelete={() => handleDeletePrompt(selectedPrompt.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedPrompt.id)}
          />

          <EditPromptModal
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            prompt={selectedPrompt}
            onEditPrompt={handleEditPrompt}
            categories={categories}
          />
        </>
      )}
    </div>
  )
}
