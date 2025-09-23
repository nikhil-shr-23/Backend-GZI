import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';
import { jwtConfig } from '../config/env.js';

const SALT_ROUNDS = 10;

function signAccessToken(payload) {
  return jwt.sign(payload, jwtConfig.accessTokenSecret, { expiresIn: jwtConfig.accessTokenTtl });
}
function signRefreshToken(payload) {
  return jwt.sign(payload, jwtConfig.refreshTokenSecret, { expiresIn: jwtConfig.refreshTokenTtl });
}

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'email already registered' });
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({ data: { email, passwordHash, name } });
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id });
    return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id });
    return res.json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });
  } catch (err) { next(err); }
}

export async function refresh(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'token required' });
    try {
      const payload = jwt.verify(token, jwtConfig.refreshTokenSecret);
      const accessToken = signAccessToken({ sub: payload.sub });
      return res.json({ accessToken });
    } catch {
      return res.status(401).json({ message: 'invalid refresh token' });
    }
  } catch (err) { next(err); }
}

export async function me(req, res) {
  return res.json({ user: req.user });
}


