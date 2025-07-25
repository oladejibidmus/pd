import { NextRequest, NextResponse } from "next/server";
import { updatePromptInNotion, deletePromptInNotion } from "@/lib/notion-prompts";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promptData = await request.json();
    const updatedPrompt = await updatePromptInNotion({ ...promptData, id: params.id });
    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error("Error updating prompt:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: "Failed to update prompt",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deletePromptInNotion(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: "Failed to delete prompt",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}