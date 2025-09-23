import prisma from '../db/prisma.js';

export async function createProduct(req, res, next) {
  try {
    const { name, slug, description, price, currency, categoryId } = req.body;
    const product = await prisma.product.create({
      data: { name, slug, description, price, currency, categoryId },
    });
    res.status(201).json(product);
  } catch (err) { next(err); }
}

export async function listProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany({ include: { category: true } });
    res.json(products);
  } catch (err) { next(err); }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id }, include: { category: true } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) { next(err); }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, slug, description, price, currency, categoryId } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, slug, description, price, currency, categoryId },
    });
    res.json(product);
  } catch (err) { next(err); }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (err) { next(err); }
}


