import { NextRequest, NextResponse } from "next/server";
import { deletePage } from "@/lib/notion";

export async function POST(
  request: NextRequest
) {
  try {
    const { pageId } = await request.json();
    
    if (!pageId) {
      return NextResponse.json(
        { error: "Page ID is required" },
        { status: 400 }
      );
    }

    const deletedPage = await deletePage(pageId);
    
    return NextResponse.json(deletedPage);
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}

