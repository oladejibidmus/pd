export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    [key: string]: any;
  };
}

export interface NotionDatabase {
  id: string;
  title: string;
  description?: string;
  properties: {
    [key: string]: any;
  };
}

export interface NotionBlock {
  id: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  [key: string]: any;
}

