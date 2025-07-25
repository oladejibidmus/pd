import { NextRequest, NextResponse } from "next/server";
import { getPromptsFromNotion, createPromptInNotion } from "@/lib/notion-prompts";

export async function GET() {
  try {
    const prompts = await getPromptsFromNotion();
    return NextResponse.json(prompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const promptData = await request.json();
    console.log("Received prompt data:", promptData);
    
    // Validate required environment variables
    if (!process.env.NOTION_TOKEN) {
      throw new Error("NOTION_TOKEN environment variable is not set");
    }
    if (!process.env.NOTION_PROMPTS_DATABASE_ID) {
      throw new Error("NOTION_PROMPTS_DATABASE_ID environment variable is not set");
    }
    
    const newPrompt = await createPromptInNotion(promptData);
    return NextResponse.json(newPrompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    return NextResponse.json(
      { 
        error: "Failed to create prompt",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

