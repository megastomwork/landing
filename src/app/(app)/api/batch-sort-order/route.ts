import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/shared/lib/payload';

interface BatchSortOrderBody {
  collectionSlug: string;
  items: Array<{ id: string; sortOrder: number }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BatchSortOrderBody;

    if (!body.collectionSlug || !Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, message: 'Invalid body: collectionSlug and items array required' },
        { status: 400 },
      );
    }

    if (body.items.length === 0) {
      return NextResponse.json({ success: true, updated: 0 });
    }

    const payload = await getPayloadClient();

    // Validate that collectionSlug is a known collection
    const collectionSlugs = payload.config.collections.map(c => c.slug) as string[];
    if (!collectionSlugs.includes(body.collectionSlug)) {
      return NextResponse.json(
        { success: false, message: `Unknown collection: ${body.collectionSlug}` },
        { status: 400 },
      );
    }

    const results = await Promise.allSettled(
      body.items.map(({ id, sortOrder }) =>
        payload.update({
          collection: body.collectionSlug as Parameters<typeof payload.update>[0]['collection'],
          id,
          data: { sortOrder },
        }),
      ),
    );

    const errors: Array<{ id: string; message: string }> = [];
    let updated = 0;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        updated++;
      } else {
        errors.push({
          id: body.items[index].id,
          message: result.reason?.message || 'Unknown error',
        });
      }
    });

    return NextResponse.json({
      success: errors.length === 0,
      updated,
      ...(errors.length > 0 && { errors }),
    });
  } catch (error) {
    console.error('Batch sort order error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
