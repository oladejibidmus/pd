'use client';

import { useState } from 'react';
import NotionContent from '@/components/notion-content';

export default function NotionDemo() {
  const [databaseId, setDatabaseId] = useState('');
  const [pageId, setPageId] = useState('');
  const [activeTab, setActiveTab] = useState<'database' | 'page'>('database');

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Notion Integration Demo</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded ${
              activeTab === 'database'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Database Query
          </button>
          <button
            onClick={() => setActiveTab('page')}
            className={`px-4 py-2 rounded ${
              activeTab === 'page'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Page Content
          </button>
        </div>

        {activeTab === 'database' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="database-id" className="block text-sm font-medium mb-2">
                Notion Database ID
              </label>
              <input
                id="database-id"
                type="text"
                value={databaseId}
                onChange={(e) => setDatabaseId(e.target.value)}
                placeholder="Enter your Notion database ID"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-1">
                You can find the database ID in your Notion database URL
              </p>
            </div>
            {databaseId && <NotionContent databaseId={databaseId} />}
          </div>
        )}

        {activeTab === 'page' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="page-id" className="block text-sm font-medium mb-2">
                Notion Page ID
              </label>
              <input
                id="page-id"
                type="text"
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                placeholder="Enter your Notion page ID"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-1">
                You can find the page ID in your Notion page URL
              </p>
            </div>
            {pageId && <NotionContent pageId={pageId} />}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Create a Notion integration at <a href="https://www.notion.so/my-integrations" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.notion.so/my-integrations</a></li>
          <li>Copy the Internal Integration Token</li>
          <li>Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file in your project root</li>
          <li>Add <code className="bg-gray-200 px-1 rounded">NOTION_TOKEN=your_token_here</code> to the file</li>
          <li>Share your Notion pages/databases with your integration</li>
          <li>Copy the database or page ID from the URL and paste it above</li>
        </ol>
      </div>
    </div>
  );
}

