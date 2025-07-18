import { mockBooks } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const book = mockBooks.find((book) => book.id === id);

    if (!book) {
        return NextResponse.json({ error: 'Book not found' }, {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return NextResponse.json(book, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}