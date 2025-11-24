import { BUILD_INFO } from '@/lib/build-info';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(BUILD_INFO);
}
