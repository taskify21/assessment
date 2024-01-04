import { NextRequest, NextResponse } from "next/server";
import Order from "./order-schema";

export async function GET(request: Request) {
  const orders = await Order.find().populate("userId").populate("deliveryId");

  return NextResponse.json(
    { success: "All Orders", length: orders.length, data: orders },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newOrder = await Order.create({ ...body });
  return NextResponse.json(
    { message: "Order has been placed.", data: newOrder },
    { status: 201 }
  );
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const id = body._id as string;
  const order = await Order.findById(id);

  // when restaurant is reciving the food request
  if (order.status == "Pending" && body.status == "Received") {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: "Received",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      { success: "Order has been In prepairing", data: updatedOrder },
      { status: 202 }
    );
  }

  // when restaurant prepared your order
  if (order.status == "Received" && body.status == "Ready") {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: "Ready",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success:
          "Order has been In Ready registered. looking for delivery person",
        data: updatedOrder,
      },
      { status: 202 }
    );
  }

  // when delivery person pickup your order
  if (order.status == "Ready" && body.status == "Pickup") {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: "Pickup",
        deliveryId: body.deliveryId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success: "The has been picked your food",
        data: updatedOrder,
      },
      { status: 202 }
    );
  }

  // when user/client marking order as complete
  if (order.status == "Pickup" && body.status == "Deliverd") {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: "Deliverd",
        deliveryId: body.deliveryId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success: "The order has been mark as successfuly delivered",
        data: updatedOrder,
      },
      { status: 202 }
    );
  }
  return NextResponse.json({ error: "Item not found" }, { status: 404 });
}
