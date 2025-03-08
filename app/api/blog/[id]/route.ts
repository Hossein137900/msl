import connect from "@/lib/data";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
export async function GET(request: Request) {
  try {
    const id = request.url.split("/").pop();
    console.log(id)
    await connect();

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);

    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = request.url.split("/").pop();
    await connect();

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Error deleting blog" },
      { status: 500 }
    );
  }
}
export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/").pop();
    const { title, content, seoTitle, image, description, tags } =
      await request.json();
    await connect();

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, seoTitle, image, description, tags },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  }
}
