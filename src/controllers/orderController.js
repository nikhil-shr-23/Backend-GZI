import prisma from '../db/prisma.js';

export async function createOrder(req, res, next) {
  try {
    const userId = req.user?.sub;
    const { items, total, currency = 'INR' } = req.body;
    // Minimal: trust client total; in production, recalc from DB
    const order = await prisma.order.create({
      data: { userId, total, currency, status: 'created' },
    });
    res.status(201).json(order);
  } catch (err) { next(err); }
}

export async function getMyOrders(req, res, next) {
  try {
    const userId = req.user?.sub;
    const orders = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    res.json(orders);
  } catch (err) { next(err); }
}

export async function getOrder(req, res, next) {
  try {
    const userId = req.user?.sub;
    const { id } = req.params;
    const order = await prisma.order.findFirst({ where: { id, userId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { next(err); }
}


