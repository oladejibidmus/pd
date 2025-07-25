import { NextRequest, NextResponse } from "next/server";
import { updateCategoryInNotion, deleteCategoryInNotion } from "@/lib/notion-categories";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryData = await request.json();
    const updatedCategory = await updateCategoryInNotion({ ...categoryData, id: params.id });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: "Failed to update category",
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
    await deleteCategoryInNotion(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: "Failed to delete category",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}