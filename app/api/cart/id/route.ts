import connect from "@/lib/data";
import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import * as jwt from "jsonwebtoken";


export async function GET(request: Request) {
  try {
    await connect();
    const token = request.headers.get('token');
    
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, 'msl') as { _id: string };
    const userId = decodedToken._id;

    const carts = await Cart.find({ userId })
      .populate('userId')
      .populate('products');

    return NextResponse.json({ carts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching cart" },
      { status: 500 }
    );
  }
}
