import { NextRequest, NextResponse } from "next/server";
import { updatePage } from "@/lib/notion";

export async function POST(
  request: NextRequest
) {
  try {
    const { pageId, properties } = await request.json();
    
    if (!pageId || !properties) {
      return NextResponse.json(
        { error: "Page ID and properties are required" },
        { status: 400 }
      );
    }

    const updatedPage = await updatePage(pageId, properties);
    
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

