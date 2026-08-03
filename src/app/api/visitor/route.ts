import { NextResponse } from 'next/server';

const BASE_SEED = 2000;
let globalVisitorCount = BASE_SEED;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isHit = searchParams.get('hit') === 'true';

  if (isHit) {
    globalVisitorCount += 1;
  }

  return NextResponse.json(
    {
      success: true,
      value: globalVisitorCount,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST() {
  globalVisitorCount += 1;
  return NextResponse.json(
    {
      success: true,
      value: globalVisitorCount,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
