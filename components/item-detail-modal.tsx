"use client"

import { Bot, Terminal, Code, Copy, Edit, Trash2, Star, Calendar, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import type { PromptItem } from "@/types"

interface ItemDetailModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  prompt: PromptItem
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
}

const typeIcons = {
  prompt: Bot,
  command: Terminal,
  snippet: Code,
}

export function ItemDetailModal({
  isOpen,
  setIsOpen,
  prompt,
  onEdit,
  onDelete,
  onToggleFavorite,
}: ItemDetailModalProps) {
  const { toast } = useToast()

  const copyToClipboard = async () => {
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

  const TypeIcon = typeIcons[prompt.type] || Bot

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <TypeIcon className="h-6 w-6 text-orange-700" />
              <div>
                <DialogTitle className="text-xl">{prompt.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{prompt.type}</Badge>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onToggleFavorite}>
                <Star className={`h-4 w-4 mr-2 text-orange-700 ${prompt.isFavorite ? "fill-orange-700" : ""}`} />
                {prompt.isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2 text-orange-700" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2 text-orange-700" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2 text-orange-700" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          {prompt.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{prompt.description}</p>
            </div>
          )}

          <Separator />

          {/* Content */}
          <div>
            <h3 className="font-semibold mb-3">Content</h3>
            <div className="bg-muted/50 border rounded-lg p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">{prompt.content}</pre>
            </div>
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-orange-700" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Metadata */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-700" />
                <span className="text-muted-foreground">Added:</span>
                <span>{prompt.dateAdded.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <TypeIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Type:</span>
                <span className="capitalize">{prompt.type}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
