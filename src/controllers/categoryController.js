import prisma from '../db/prisma.js';

export async function createCategory(req, res, next) {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.create({ data: { name, slug } });
    res.status(201).json(category);
  } catch (err) { next(err); }
}

export async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (err) { next(err); }
}

export async function getCategory(req, res, next) {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) { next(err); }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    const category = await prisma.category.update({ where: { id }, data: { name, slug } });
    res.json(category);
  } catch (err) { next(err); }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    res.status(204).end();
  } catch (err) { next(err); }
}


