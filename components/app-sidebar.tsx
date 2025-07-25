"use client"

import { useState } from "react"
import {
  Bot,
  Code,
  Terminal,
  GitBranch,
  Star,
  Grid3X3,
  Settings,
  HelpCircle,
  Plus,
  Home,
  Folder,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface AppSidebarProps {
  categories: Category[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  currentView: string
  setCurrentView: (view: string) => void
  promptCount: number
  favoriteCount: number
}

const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Bot,
    Code,
    Terminal,
    GitBranch,
    Star,
    Grid3X3,
    Settings,
    HelpCircle,
    Plus,
    Home,
    Folder,
  }
  return icons[iconName] || Home
}

export function AppSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  currentView,
  setCurrentView,
  promptCount,
  favoriteCount,
}: AppSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleMenuClick = (view: string, category?: string) => {
    setCurrentView(view)
    if (category) {
      setSelectedCategory(category)
    }
  }

  const isActive = (view: string, category?: string) => {
    if (category) {
      return currentView === "gallery" && selectedCategory === category
    }
    return currentView === view
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={cn(
        "relative transition-all duration-300 ease-in-out border-r bg-sidebar flex flex-col h-full",
        isExpanded ? "w-64" : "w-16",
      )}
    >
      {/* Header */}
      <div className="border-b">
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3 transition-all duration-300",
            !isExpanded && "justify-center px-2",
          )}
        >
          <Grid3X3 className="h-6 w-6 text-orange-700 flex-shrink-0" />
          <h1
            className={cn(
              "text-lg font-semibold transition-all duration-300 whitespace-nowrap",
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden",
            )}
          >
            Prompt Directory
          </h1>
        </div>

        {/* Toggle Button */}
        <div className="absolute top-3 right-2">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0 hover:bg-sidebar-accent">
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4 text-orange-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-orange-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden py-2">
        {/* Navigation Section */}
        <div className={cn("mb-4", isExpanded ? "px-2" : "px-1")}>
          <div
            className={cn(
              "text-xs font-semibold text-sidebar-foreground/70 transition-all duration-300 mb-2",
              isExpanded ? "px-2 py-1 opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            Navigation
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleMenuClick("gallery", "all")}
              className={cn(
                "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive("gallery", "all") && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <Home className="h-4 w-4 text-orange-700" />
              </div>
              {isExpanded && (
                <>
                  <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">All Items</span>
                  <Badge variant="secondary" className="transition-all duration-300 text-xs">
                    {promptCount}
                  </Badge>
                </>
              )}
            </button>

            <button
              onClick={() => handleMenuClick("gallery", "favorites")}
              className={cn(
                "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive("gallery", "favorites") && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <Star className="h-4 w-4 text-orange-700" />
              </div>
              {isExpanded && (
                <>
                  <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">Favorites</span>
                  <Badge variant="secondary" className="transition-all duration-300 text-xs">
                    {favoriteCount}
                  </Badge>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="mx-2 h-px bg-sidebar-border mb-4" />

        {/* Categories Section */}
        <div className={cn("mb-4", isExpanded ? "px-2" : "px-1")}>
          <div
            className={cn(
              "text-xs font-semibold text-sidebar-foreground/70 transition-all duration-300 mb-2",
              isExpanded ? "px-2 py-1 opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            Categories
          </div>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = getIcon(category.icon)
              return (
                <button
                  key={category.id}
                  onClick={() => handleMenuClick("gallery", category.name)}
                  className={cn(
                    "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive("gallery", category.name) &&
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                    <Icon className="h-4 w-4 text-orange-700" style={{ color: category.color }} />
                  </div>
                  {isExpanded && (
                    <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">
                      {category.name}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="mx-2 h-px bg-sidebar-border mb-4" />

        {/* Management Section */}
        <div className={cn("mb-4", isExpanded ? "px-2" : "px-1")}>
          <div
            className={cn(
              "text-xs font-semibold text-sidebar-foreground/70 transition-all duration-300 mb-2",
              isExpanded ? "px-2 py-1 opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            Management
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleMenuClick("categories")}
              className={cn(
                "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive("categories") && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <Folder className="h-4 w-4 text-orange-700" />
              </div>
              {isExpanded && (
                <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">
                  Manage Categories
                </span>
              )}
            </button>

            <button
              onClick={() => handleMenuClick("settings")}
              className={cn(
                "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive("settings") && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <Settings className="h-4 w-4 text-orange-700" />
              </div>
              {isExpanded && (
                <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">Settings</span>
              )}
            </button>

            <button
              onClick={() => handleMenuClick("help")}
              className={cn(
                "w-full flex items-center text-sm rounded-md transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive("help") && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                isExpanded ? "px-2 py-2 gap-2" : "px-0 py-2 justify-center",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <HelpCircle className="h-4 w-4 text-orange-700" />
              </div>
              {isExpanded && (
                <span className="transition-all duration-300 whitespace-nowrap flex-1 text-left">Help & Resources</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={cn("p-4 border-t transition-all duration-300", !isExpanded && "p-2")}>
        <Button
          size="sm"
          className={cn(
            "bg-orange-700 hover:bg-orange-800 transition-all duration-300",
            isExpanded ? "w-full" : "w-12 h-12 p-0",
          )}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          {isExpanded && <span className="ml-2 transition-all duration-300 whitespace-nowrap">Quick Add</span>}
        </Button>
      </div>
    </div>
  )
}
