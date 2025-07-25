import { getDatabaseItems, createPage, updatePage, deletePage } from "./notion";
import { mapNotionPageToCategory, mapCategoryToNotionProperties } from "./notion-utils";
import { Category } from "@/types";

const CATEGORIES_DATABASE_ID = process.env.NOTION_CATEGORIES_DATABASE_ID || "";

export const getCategoriesFromNotion = async (): Promise<Category[]> => {
  try {
    const pages = await getDatabaseItems(CATEGORIES_DATABASE_ID);
    return pages.map(mapNotionPageToCategory);
  } catch (error) {
    console.error("Error fetching categories from Notion:", error);
    throw error;
  }
};

export const createCategoryInNotion = async (category: Omit<Category, "id">): Promise<Category> => {
  try {
    const properties = mapCategoryToNotionProperties(category);
    const page = await createPage(CATEGORIES_DATABASE_ID, properties);
    return mapNotionPageToCategory(page);
  } catch (error) {
    console.error("Error creating category in Notion:", error);
    throw error;
  }
};

export const updateCategoryInNotion = async (category: Category): Promise<Category> => {
  try {
    const properties = mapCategoryToNotionProperties(category);
    const page = await updatePage(category.id, properties);
    return mapNotionPageToCategory(page);
  } catch (error) {
    console.error("Error updating category in Notion:", error);
    throw error;
  }
};

export const deleteCategoryInNotion = async (categoryId: string): Promise<void> => {
  try {
    await deletePage(categoryId);
  } catch (error) {
    console.error("Error deleting category in Notion:", error);
    throw error;
  }
};

