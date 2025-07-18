import { mockBooks } from '@/lib/data';

export async function GET() {
    if (mockBooks.length === 0) {
        return new Response(JSON.stringify({ error: 'No books found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ books: mockBooks }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}