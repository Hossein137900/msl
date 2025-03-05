import connect from "@/lib/data";
import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import * as jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    await connect();
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, 'msl') as { userId: string };
    const userId = decodedToken.userId;

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

export async function POST(request: Request) {
  try {
    await connect();
    const formData = await request.formData();
    const token = request.headers.get('token')

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, 'msl') as { userId: string };
    const userId = decodedToken.userId;

    const newCart = new Cart({
      userId,
      products: JSON.parse(formData.get("items") as string),
      items: JSON.parse(formData.get("items") as string),
      path: formData.get("paymentMethod"),
      image: formData.get("receiptImage"),
      totalPrice: parseInt(formData.get("totalPrice") as string)
    });

    await newCart.save();

    return NextResponse.json(
      { message: "Cart created successfully", cart: newCart },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating cart" },
      { status: 500 }
    );
  }
}
