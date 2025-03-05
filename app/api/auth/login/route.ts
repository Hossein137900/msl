import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connect();
    try {
        const { phoneNumber, password } = await request.json();
        
        // Add validation logging
        console.log('Login attempt for:', phoneNumber);
        
        if (!phoneNumber || !password) {
            console.log('Missing credentials');
            return NextResponse.json(
                { message: "Phone number and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ phoneNumber });
        
        if (!user) {
            console.log('User not found');
            return NextResponse.json(
                { message: "User not found" },
                { status: 401 }
            );
        }
        console.log('User found:', user);
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            console.log('Invalid password');
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        const tokenSecret = await process.env.JWT_SECRET||"msl";
        
        if (!tokenSecret) {
            console.log('JWT_SECRET missing');
            return NextResponse.json(
                { message: "Server configuration error" },
                { status: 500 }
            );
        }

            const token = jwt.sign(
              {
                name: user.username,
                id: user._id,
                phoneNumber: user.phone,
                role: user.role,
              },
              process.env.JWT_SECRET!||"msl",
              { expiresIn: "12h" }
            );

        console.log('Login successful');
        return NextResponse.json({ token, userId: user._id });
    }
    catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
