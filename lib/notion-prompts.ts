import { getDatabaseItems, createPage, updatePage, deletePage } from "./notion";
import { mapNotionPageToPromptItem, mapPromptItemToNotionProperties } from "./notion-utils";
import { PromptItem } from "@/types";

const PROMPTS_DATABASE_ID = process.env.NOTION_PROMPTS_DATABASE_ID || "";

export const getPromptsFromNotion = async (): Promise<PromptItem[]> => {
  try {
    const pages = await getDatabaseItems(PROMPTS_DATABASE_ID);
    return pages.map(mapNotionPageToPromptItem);
  } catch (error) {
    console.error("Error fetching prompts from Notion:", error);
    throw error;
  }
};

export const createPromptInNotion = async (prompt: Omit<PromptItem, "id" | "dateAdded">): Promise<PromptItem> => {
  try {
    console.log("Creating prompt with data:", prompt);
    console.log("Using database ID:", PROMPTS_DATABASE_ID);
    
    const properties = mapPromptItemToNotionProperties(prompt);
    console.log("Mapped properties:", JSON.stringify(properties, null, 2));
    
    const page = await createPage(PROMPTS_DATABASE_ID, properties);
    console.log("Created page:", page);
    
    return mapNotionPageToPromptItem(page);
  } catch (error) {
    console.error("Error creating prompt in Notion:", error);
    console.error("Database ID:", PROMPTS_DATABASE_ID);
    console.error("Prompt data:", prompt);
    throw error;
  }
};

export const updatePromptInNotion = async (prompt: PromptItem): Promise<PromptItem> => {
  try {
    const properties = mapPromptItemToNotionProperties(prompt);
    const page = await updatePage(prompt.id, properties);
    return mapNotionPageToPromptItem(page);
  } catch (error) {
    console.error("Error updating prompt in Notion:", error);
    throw error;
  }
};

export const deletePromptInNotion = async (promptId: string): Promise<void> => {
  try {
    await deletePage(promptId);
  } catch (error) {
    console.error("Error deleting prompt in Notion:", error);
    throw error;
  }
};

