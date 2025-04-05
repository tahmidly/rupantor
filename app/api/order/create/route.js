import { inngest } from '@/config/inngest';
import Product from '@/models/Product';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function post(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextRequest.json({
        success: false,
        message: 'Invalid Data',
      });
    }

    const amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.productId);
      return (acc = product.offerPrice * item.quantity);
    }, 0);

    await inngest.send({
      name: 'order/created',
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextRequest.json({
      success: true,
      message: 'Order Placed',
    });
  } catch (error) {
    console.log(error);
    return NextRequest.json({
      success: false,
      message: error.message,
    });
  }
}
