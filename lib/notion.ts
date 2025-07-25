import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results;
};

export const createPage = async (databaseId: string, properties: any) => {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  });
  return response;
};

export const updatePage = async (pageId: string, properties: any) => {
  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });
  return response;
};

export const deletePage = async (pageId: string) => {
  const response = await notion.pages.update({
    page_id: pageId,
    archived: true,
  });
  return response;
};
