import prisma from '../db/prisma.js';

export async function getCart(req, res, next) {
  try {
    const userId = req.user?.sub;
    const items = await prisma.cartItem.findMany({ where: { userId }, include: { product: true } });
    res.json(items);
  } catch (err) { next(err); }
}

export async function addToCart(req, res, next) {
  try {
    const userId = req.user?.sub;
    const { productId, quantity = 1 } = req.body;
    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId, productId, quantity },
    });
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function updateCartItem(req, res, next) {
  try {
    const userId = req.user?.sub;
    const { productId } = req.params;
    const { quantity } = req.body;
    const item = await prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity },
    });
    res.json(item);
  } catch (err) { next(err); }
}

export async function removeFromCart(req, res, next) {
  try {
    const userId = req.user?.sub;
    const { productId } = req.params;
    await prisma.cartItem.delete({ where: { userId_productId: { userId, productId } } });
    res.status(204).end();
  } catch (err) { next(err); }
}


