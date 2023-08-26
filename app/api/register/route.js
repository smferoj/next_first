import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  const _req = await req.json();
  await dbConnect();

  try {
    const { name, email, password } = _req;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ err: "Emain taken" }, { status: 409 });
    } else {
      await new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();
      return NextResponse.json({
        success: "Registration successful",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error",
      },
      { status: 501 }
    );
  }
}
