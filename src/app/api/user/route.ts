import { NextRequest, NextResponse } from "next/server";
import "../../../../lib/mongoDb";

import User from "../login/login-schema";

export async function GET(request: Request) {
  const allUsers = await User.find();

  return NextResponse.json(
    { success: "All Users", length: allUsers.length, data: allUsers },
    { status: 200 }
  );
}
