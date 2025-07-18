import { mockBooks } from '@/lib/data';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const book = mockBooks.find(book => book.id === id);

    if (!book) {
        return new Response(JSON.stringify({ error: 'Book not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(book), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
