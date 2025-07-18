import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Review } from '@/types/review';

const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('bookId');

    try {
        const fileContent = await fs.readFile(reviewsFilePath, 'utf-8');
        let reviews: Review[] = JSON.parse(fileContent);

        if (bookId) {
            reviews = reviews.filter((review: Review) => review.bookId === bookId);
        }

        return NextResponse.json({ reviews }, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to retrieve reviews' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookId, comment } = body;

        if (!bookId || !comment) {
            return NextResponse.json({ error: 'Missing required fields' }, {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let existingReviews: Review[] = [];

        try {
            const fileContent = await fs.readFile(reviewsFilePath, 'utf-8');
            existingReviews = JSON.parse(fileContent);
        } catch {
            existingReviews = [];
        }

        const newReview: Review = {
            id: Date.now().toString(),
            bookId,
            userId: 'user-123',
            userName: 'Current User',
            comment,
            createdAt: new Date().toISOString(),
        };

        existingReviews.push(newReview);

        await fs.writeFile(reviewsFilePath, JSON.stringify(existingReviews, null, 2));

        return NextResponse.json(newReview, {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to add review' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}