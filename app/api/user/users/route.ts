// app/api/user/referrals/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { validateTelegramWebAppData } from '@/utils/server-checks';
import { calculateLevelIndex } from '@/utils/game-mechanics';
import { LEVELS } from '@/utils/consts';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const telegramInitData = url.searchParams.get('initData');

  if (!telegramInitData) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { validatedData, user } = validateTelegramWebAppData(telegramInitData);

  if (!validatedData) {
    return NextResponse.json({ error: 'Invalid Telegram data' }, { status: 403 });
  }

  const telegramId = user.id?.toString();

  if (!telegramId) {
    return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
  }


  try {
    const dbUser = await prisma.user.findMany();

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

     

    return NextResponse.json({
        dbUser
    });
  } catch (error) {
    console.error('Error fetching user referrals:', error);
    return NextResponse.json({ error: 'Failed to fetch user referrals' }, { status: 500 });
  }
}