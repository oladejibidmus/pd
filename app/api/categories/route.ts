import { NextRequest, NextResponse } from "next/server";
import { getCategoriesFromNotion, createCategoryInNotion } from "@/lib/notion-categories";

export async function GET() {
  try {
    const categories = await getCategoriesFromNotion();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json();
    const newCategory = await createCategoryInNotion(categoryData);
    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

