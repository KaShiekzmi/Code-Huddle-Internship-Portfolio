import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { bookId } = req.query;

    try {
      const fileContent = await fs.readFile(reviewsFilePath, 'utf-8');
      let reviews = JSON.parse(fileContent);

      if (bookId) {
        reviews = reviews.filter((review: any) => review.bookId === bookId);
      }

      return res.status(200).json({ reviews });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve reviews' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { bookId, comment } = req.body;

      if (!bookId || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let existingReviews = [];

      try {
        const fileContent = await fs.readFile(reviewsFilePath, 'utf-8');
        existingReviews = JSON.parse(fileContent);
      } catch (err) {
        existingReviews = [];
      }

      const newReview = {
        id: Date.now().toString(),
        bookId,
        userId: 'user-123',
        userName: 'Current User',
        comment,
        createdAt: new Date().toISOString(),
      };

      existingReviews.push(newReview);

      await fs.writeFile(reviewsFilePath, JSON.stringify(existingReviews, null, 2));

      return res.status(201).json(newReview);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add review' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
