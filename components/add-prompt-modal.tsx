"use client"

import type React from "react"

import { useState } from "react"
import { Bot, Terminal, Code, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import type { PromptItem, Category } from "@/types"

interface AddPromptModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onAddPrompt: (prompt: Omit<PromptItem, "id" | "dateAdded">) => void
  categories: Category[]
}

const promptTypes = [
  { value: "prompt", label: "AI Prompt", icon: Bot, description: "Text prompts for AI models" },
  { value: "command", label: "Command Line", icon: Terminal, description: "Shell commands and CLI tools" },
  { value: "snippet", label: "Code Snippet", icon: Code, description: "Reusable code blocks" },
]

export function AddPromptModal({ isOpen, setIsOpen, onAddPrompt, categories }: AddPromptModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "prompt" as "prompt" | "command" | "snippet",
    category: categories[0]?.name || "",
    content: "",
    description: "",
    icon: "Bot",
    isFavorite: false,
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content) return

    onAddPrompt(formData)

    // Reset form
    setFormData({
      title: "",
      type: "prompt",
      category: categories[0]?.name || "",
      content: "",
      description: "",
      icon: "Bot",
      isFavorite: false,
      tags: [],
    })
    setTagInput("")
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a descriptive title..."
              required
            />
          </div>

          {/* Type Selection */}
          <div className="space-y-3">
            <Label>Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  type: value as "prompt" | "command" | "snippet",
                  icon: value === "prompt" ? "Bot" : value === "command" ? "Terminal" : "Code",
                }))
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {promptTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label
                      htmlFor={type.value}
                      className="flex items-center space-x-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <Icon className="h-5 w-5 text-orange-700" />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder={
                formData.type === "prompt"
                  ? "Enter your AI prompt..."
                  : formData.type === "command"
                    ? "Enter your command line..."
                    : "Enter your code snippet..."
              }
              className="min-h-[120px] font-mono"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of what this does..."
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tags..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4 text-orange-700" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-700 hover:bg-orange-800">
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
