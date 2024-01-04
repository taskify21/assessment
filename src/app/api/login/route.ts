import { NextRequest, NextResponse } from "next/server";
import "../../../../lib/mongoDb";
import User from "./login-schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.type == "login") {
    const user = await User.findOne({ email: body.email });
    if (user.password == body.password) {
      return NextResponse.json(
        { message: "LoggedIn user!", success: true, data: user },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "failed", success: false, data: null },
        { status: 404 }
      );
    }
  } else if (body.type == "register") {
    const newUser = await User.create({ ...body });

    return NextResponse.json(
      { message: "Registerd user!", success: true, data: newUser },
      { status: 201 }
    );
  }

  return NextResponse.json(
    { message: "failed", success: false, data: null },
    { status: 404 }
  );
}
