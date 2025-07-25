"use client"

import { useState } from "react"
import { Search, Grid3X3, List, Plus, SortAsc, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PromptCard } from "@/components/prompt-card"
import type { PromptItem } from "@/types"

interface PromptGalleryProps {
  prompts: PromptItem[]
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onPromptClick: (prompt: PromptItem) => void
  onToggleFavorite: (id: string) => void
  onAddNew: () => void
}

export function PromptGallery({
  prompts,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onPromptClick,
  onToggleFavorite,
  onAddNew,
}: PromptGalleryProps) {
  const [sortBy, setSortBy] = useState<"date" | "name" | "type">("date")
  const [filterType, setFilterType] = useState<"all" | "prompt" | "command" | "snippet">("all")

  const filteredAndSortedPrompts = prompts
    .filter((prompt) => filterType === "all" || prompt.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "type":
          return a.type.localeCompare(b.type)
        case "date":
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime()
      }
    })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-700" />
              <Input
                placeholder="Search prompts, commands, and snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2 text-orange-700" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("date")}>Date Added</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("type")}>Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2 text-orange-700" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("prompt")}>AI Prompts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("command")}>Commands</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("snippet")}>Code Snippets</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid3X3 className="h-4 w-4 text-orange-700" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4 text-orange-700" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Button onClick={onAddNew} className="bg-orange-700 hover:bg-orange-800">
              <Plus className="h-4 w-4 mr-2 text-orange-700" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {filteredAndSortedPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-muted-foreground mb-4">
              {searchQuery ? "No items match your search." : "No items found."}
            </div>
            <Button onClick={onAddNew} className="bg-orange-700 hover:bg-orange-800">
              <Plus className="h-4 w-4 mr-2 text-orange-700" />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-2"
            }
          >
            {filteredAndSortedPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                viewMode={viewMode}
                onClick={() => onPromptClick(prompt)}
                onToggleFavorite={() => onToggleFavorite(prompt.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
