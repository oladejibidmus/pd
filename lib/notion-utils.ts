import { NotionPage } from "@/types/notion";
import { PromptItem, Category } from "@/types";

export const mapNotionPageToPromptItem = (page: NotionPage): PromptItem => {
  const properties = page.properties;
  const dateAddedValue = properties.DateAdded?.date?.start || page.created_time;
  
  // Combine all rich text blocks for content
  const combineRichText = (richTextArray: any[]): string => {
    if (!richTextArray || richTextArray.length === 0) return "";
    return richTextArray.map(block => block.plain_text || "").join("");
  };

  return {
    id: page.id,
    title: properties.Title?.title[0]?.plain_text || "",
    type: properties.Type?.select?.name || "prompt",
    category: properties.Category?.select?.name || "",
    content: combineRichText(properties.Content?.rich_text || []),
    description: properties.Description?.rich_text[0]?.plain_text || "",
    icon: properties.Icon?.rich_text[0]?.plain_text || "",
    isFavorite: properties.IsFavorite?.checkbox || false,
    dateAdded: new Date(dateAddedValue),
    tags: properties.Tags?.multi_select.map((tag: { name: string }) => tag.name) || [],
  };
};

export const mapPromptItemToNotionProperties = (prompt: Omit<PromptItem, "id" | "dateAdded">): any => {
  // Split content into chunks of 2000 characters to handle Notion's limit
  const splitContent = (content: string): Array<{ text: { content: string } }> => {
    if (!content) return [{ text: { content: "" } }];
    
    const chunks = [];
    const maxLength = 2000;
    
    for (let i = 0; i < content.length; i += maxLength) {
      chunks.push({
        text: { content: content.slice(i, i + maxLength) }
      });
    }
    
    return chunks.length > 0 ? chunks : [{ text: { content: "" } }];
  };

  return {
    Title: { title: [{ text: { content: prompt.title || "" } }] },
    Type: { select: { name: prompt.type || "prompt" } },
    Category: { select: { name: prompt.category || "" } },
    Content: { rich_text: splitContent(prompt.content || "") },
    Description: { rich_text: [{ text: { content: (prompt.description || "").slice(0, 2000) } }] },
    Icon: { rich_text: [{ text: { content: prompt.icon || "" } }] },
    IsFavorite: { checkbox: prompt.isFavorite || false },
    Tags: { multi_select: (prompt.tags || []).map((tag) => ({ name: tag })) },
  };
};

export const mapNotionPageToCategory = (page: NotionPage): Category => {
  const properties = page.properties;
  return {
    id: page.id,
    name: properties.Name?.title[0]?.plain_text || "",
    icon: properties.Icon?.rich_text[0]?.plain_text || "",
    color: properties.Color?.rich_text[0]?.plain_text || "",
  };
};

export const mapCategoryToNotionProperties = (category: Omit<Category, "id">): any => {
  return {
    Name: { title: [{ text: { content: category.name } }] },
    Icon: { rich_text: [{ text: { content: category.icon || "" } }] },
    Color: { rich_text: [{ text: { content: category.color || "" } }] },
  };
};
