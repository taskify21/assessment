import { NextRequest, NextResponse } from "next/server";
import Menu from "./menuSchema";
import "../../../../lib/mongoDb";

export async function GET(request: Request) {
  const newMenu = await Menu.find();

  return NextResponse.json(
    { success: "Items retrieved", length: newMenu.length, data: newMenu },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const menu = body;
  const newMenu = await Menu.create(menu);

  return NextResponse.json(
    { message: "menu product has been added", data: newMenu },
    { status: 201 }
  );
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const id: any = body;
  const updatedData = body;

  const updatedMenu = await Menu.findByIdAndUpdate(id._id, updatedData, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(
    { message: "The menu product has been updated", data: updatedMenu },
    { status: 202 }
  );
}

export async function DELETE(request: any) {
  const body = await request.json();
  const id: any = body._id;

  const deletedItem = await Menu.deleteOne({ id: id._id });

  return NextResponse.json(
    { message: "menu product deleted", data: deletedItem },
    { status: 200 }
  );
}
