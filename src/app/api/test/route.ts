// import { NextResponse } from "next/server";
// import { allData } from "../../../../public/static";
// import { ICart, IMenu } from "@/app/utils/type";

// let menuData: IMenu[] = [...allData];

// export async function GET(request: Request) {
//   return NextResponse.json(
//     { success: "Items retrieved", data: menuData },
//     { status: 200 }
//   );
// }

// export async function POST(request: Request) {
//   const newData = request.json();
//   menuData.push(newData as unknown as IMenu);

//   return NextResponse.json(
//     { success: "Item created", data: newData },
//     { status: 201 }
//   );
// }

// interface UpdateRequestBody {
//   id: string; // Adjust the type of id based on your actual data type
//   // Add other properties as needed
// }

// export async function PUT(request: Request) {
//   const body = (await request.json()) as UpdateRequestBody;
//   const id = body.id;
//   const updatedData = body;

//   // Assuming menuData is an array of objects with an 'id' property
//   const index = menuData.findIndex((item: any) => item.id === id);

//   if (index !== -1) {
//     menuData[index] = { ...menuData[index], ...updatedData };
//     return NextResponse.json(
//       { success: "Item updated", data: menuData[index] },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json({ error: "Item not found" }, { status: 404 });
//   }
// }

// export async function DELETE(request: any) {
//   const { id } = request.params as any;

//   // Assuming menuData is an array of objects with an 'id' property
//   const index = menuData.findIndex((item: any) => item.id === id);

//   if (index !== -1) {
//     const deletedItem = menuData.splice(index, 1);
//     return NextResponse.json(
//       { success: "Item deleted", data: deletedItem },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json({ error: "Item not found" }, { status: 404 });
//   }
// }
