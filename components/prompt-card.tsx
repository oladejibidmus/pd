"use client"

import type React from "react"
import { useState } from "react"
import { Star, Copy, Bot, Terminal, Code } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { PromptItem } from "@/types"
import { cn } from "@/lib/utils"

interface PromptCardProps {
  prompt: PromptItem
  viewMode: "grid" | "list"
  onClick: () => void
  onToggleFavorite: () => void
}

const typeIcons = {
  prompt: Bot,
  command: Terminal,
  snippet: Code,
}

const typeColors = {
  prompt: "text-orange-700",
  command: "text-orange-700",
  snippet: "text-orange-700",
}

function ContentPlaceholder({ content }: { content: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded bg-gray-50 dark:bg-gray-800">
      <svg className="absolute inset-0 h-full w-full stroke-orange-100 dark:stroke-orange-200/30" fill="none">
        <defs>
          <pattern id="pattern-2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-2)" width="100%" height="100%"></rect>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 line-clamp-4 text-center">
          {content.substring(0, 100)}...
        </div>
      </div>
    </div>
  )
}

export function PromptCard({ prompt, viewMode, onClick, onToggleFavorite }: PromptCardProps) {
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(prompt.content)
      toast({
        title: "Copied to clipboard",
        description: `${prompt.title} has been copied.`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite()
  }

  const TypeIcon = typeIcons[prompt.type] || Bot

  if (viewMode === "list") {
    return (
      <Card
        className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-orange-700"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <TypeIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{prompt.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{prompt.description}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {prompt.type}
              </Badge>
            </div>
            <div className={cn("flex items-center gap-1 transition-opacity", isHovered ? "opacity-100" : "opacity-0")}>
              <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
                <Copy className="h-4 w-4 text-orange-700" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleFavoriteClick} className="h-8 w-8 p-0">
                <Star
                  className={cn("h-4 w-4", prompt.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-orange-700")}
                />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="relative flex flex-col justify-between p-2 cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-28">
        <ContentPlaceholder content={prompt.content} />
        <span className="absolute inset-x-0 bottom-0 left-4 flex size-12 translate-y-1/2 items-center justify-center rounded-md border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-[#090E1A]">
          <TypeIcon className={cn("size-5", typeColors[prompt.type])} aria-hidden={true} />
        </span>

        {/* Action buttons overlay */}
        <div
          className={cn(
            "absolute top-2 right-2 flex items-center gap-1 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={copyToClipboard}
            className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
          >
            <Copy className="h-3 w-3 text-orange-700" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFavoriteClick}
            className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-sm"
          >
            <Star
              className={cn("h-3 w-3", prompt.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-orange-700")}
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-8">
        <div className="flex-1">
          <dt className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
            <span className="absolute inset-0 border-orange-700 font-sans font-semibold shadow-xl" aria-hidden={true} />
            {prompt.title}
          </dt>
          <dd className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{prompt.description}</dd>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {prompt.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{prompt.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-500">{prompt.dateAdded.toLocaleDateString()}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {prompt.category}
            </Badge>
            <span
              className="inline-flex size-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              aria-hidden={true}
            >
              {prompt.type.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
