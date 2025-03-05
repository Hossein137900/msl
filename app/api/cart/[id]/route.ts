import connect from "@/lib/data";
import { NextResponse } from "next/server";
import Cart from "@/models/cart";

export async function GET() {
  try {
    await connect();
    const carts = await Cart.find()
      .populate('userId')
      .populate('products');
      
    return NextResponse.json({ carts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching all carts" },
      { status: 500 }
    );
  }
}
