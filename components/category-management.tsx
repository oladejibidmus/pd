"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Category } from "@/types"

interface CategoryManagementProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, "id">) => Promise<void>;
  onEditCategory: (category: Category) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export function CategoryManagement({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoryManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "Folder", color: "#3B82F6" });

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;
    await onAddCategory(newCategory);
    setNewCategory({ name: "", icon: "Folder", color: "#3B82F6" });
    setIsAddModalOpen(false);
  };

  const handleEditCategory = async (updatedCategory: Category) => {
    await onEditCategory(updatedCategory);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    await onDeleteCategory(id);
  };

  const predefinedColors = ["#3B82F6", "#059669", "#7C3AED", "#DC2626", "#EA580C", "#CA8A04", "#0891B2", "#BE185D"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">Organize your prompts and snippets with custom categories</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-700 hover:bg-orange-800">
              <Plus className="h-4 w-4 mr-2 text-orange-700" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name..."
                />
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-2 mt-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${newCategory.color === color ? "border-gray-900" : "border-gray-300"}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategory((prev) => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} className="bg-orange-700 hover:bg-orange-800">
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                    <Edit className="h-4 w-4 text-orange-700" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4 text-orange-700" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-orange-700" />
                <span className="text-sm text-muted-foreground">{category.name} Category</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                  placeholder="Enter category name..."
                />
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-2 mt-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${editingCategory.color === color ? "border-gray-900" : "border-gray-300"}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setEditingCategory((prev) => (prev ? { ...prev, color } : null))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setEditingCategory(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => editingCategory && handleEditCategory(editingCategory)}
                  className="bg-orange-700 hover:bg-orange-800"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


