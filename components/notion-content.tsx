'use client';

import { useState, useEffect } from 'react';
import { NotionPage, NotionBlock } from '@/types/notion';

interface NotionContentProps {
  databaseId?: string;
  pageId?: string;
}

export default function NotionContent({ databaseId, pageId }: NotionContentProps) {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let response;
        
        if (databaseId) {
          response = await fetch(`/api/notion/database/${databaseId}`);
        } else if (pageId) {
          response = await fetch(`/api/notion/page/${pageId}`);
        } else {
          throw new Error('Either databaseId or pageId must be provided');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [databaseId, pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((item, index) => (
        <div key={item.id || index} className="p-4 border rounded-lg">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}

