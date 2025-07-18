import { mockBooks } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
    if (mockBooks.length === 0) {
        return NextResponse.json({ error: 'No books found' }, {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return NextResponse.json({ books: mockBooks }, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}