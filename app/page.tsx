
"use client"

import { useState, useEffect, useCallback } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { PromptGallery } from "@/components/prompt-gallery"
import { AddPromptModal } from "@/components/add-prompt-modal"
import { ItemDetailModal } from "@/components/item-detail-modal"
import { EditPromptModal } from "@/components/edit-prompt-modal"
import { CategoryManagement } from "@/components/category-management"
import { SettingsPage } from "@/components/settings-page"
import { HelpCenter } from "@/components/help-center"
import type { PromptItem, Category } from "@/types"

export default function Home() {
  const [currentView, setCurrentView] = useState<string>("gallery")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [prompts, setPrompts] = useState<PromptItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModal] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromptsAndCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [promptsRes, categoriesRes] = await Promise.all([
        fetch("/api/prompts"),
        fetch("/api/categories"),
      ]);

      if (!promptsRes.ok) throw new Error("Failed to fetch prompts");
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

      const fetchedPrompts: PromptItem[] = await promptsRes.json();
      const fetchedCategories: Category[] = await categoriesRes.json();

      // Convert dateAdded strings back to Date objects
      const promptsWithDates = fetchedPrompts.map(prompt => ({
        ...prompt,
        dateAdded: new Date(prompt.dateAdded)
      }));

      setPrompts(promptsWithDates);
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromptsAndCategories();
  }, [fetchPromptsAndCategories]);

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "favorites" && prompt.isFavorite) ||
      prompt.category === selectedCategory;
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddPrompt = async (newPrompt: Omit<PromptItem, "id" | "dateAdded">) => {
    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrompt),
      });
      if (!response.ok) throw new Error("Failed to add prompt");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding prompt:", err);
      setError(err instanceof Error ? err.message : "Failed to add prompt");
    }
  };

  const handleEditPrompt = async (updatedPrompt: PromptItem) => {
    try {
      const response = await fetch(`/api/prompts/${updatedPrompt.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPrompt),
      });
      if (!response.ok) throw new Error("Failed to edit prompt");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
      setIsEditModalOpen(false);
      setSelectedPrompt(null);
    } catch (err) {
      console.error("Error editing prompt:", err);
      setError(err instanceof Error ? err.message : "Failed to edit prompt");
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete prompt");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
      setIsDetailModal(false);
      setSelectedPrompt(null);
    } catch (err) {
      console.error("Error deleting prompt:", err);
      setError(err instanceof Error ? err.message : "Failed to delete prompt");
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const promptToUpdate = prompts.find((p) => p.id === id);
    if (!promptToUpdate) return;

    try {
      const updatedPrompt = { ...promptToUpdate, isFavorite: !promptToUpdate.isFavorite };
      const response = await fetch(`/api/prompts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPrompt),
      });
      if (!response.ok) throw new Error("Failed to toggle favorite");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError(err instanceof Error ? err.message : "Failed to toggle favorite");
    }
  };

  const handleAddCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) throw new Error("Failed to add category");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
    } catch (err) {
      console.error("Error adding category:", err);
      setError(err instanceof Error ? err.message : "Failed to add category");
    }
  };

  const handleEditCategory = async (updatedCategory: Category) => {
    try {
      const response = await fetch(`/api/categories/${updatedCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      if (!response.ok) throw new Error("Failed to edit category");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
    } catch (err) {
      console.error("Error editing category:", err);
      setError(err instanceof Error ? err.message : "Failed to edit category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      await fetchPromptsAndCategories(); // Re-fetch data to update UI
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err instanceof Error ? err.message : "Failed to delete category");
    }
  };

  const renderCurrentView = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-full text-lg">Loading...</div>;
    }

    if (error) {
      return <div className="flex justify-center items-center h-full text-lg text-red-500">Error: {error}</div>;
    }

    switch (currentView) {
      case "categories":
        return (
          <CategoryManagement
            categories={categories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        );
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpCenter />;
      default:
        return (
          <PromptGallery
            prompts={filteredPrompts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPromptClick={(prompt) => {
              setSelectedPrompt(prompt);
              setIsDetailModal(true);
            }}
            onToggleFavorite={handleToggleFavorite}
            onAddNew={() => setIsAddModalOpen(true)}
          />
        );
    }
  };

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
            setIsOpen={setIsDetailModal}
            prompt={selectedPrompt}
            onEdit={() => {
              setIsDetailModal(false);
              setIsEditModalOpen(true);
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
  );
}


