import { NextApiRequest, NextApiResponse } from 'next';
import { mockBooks } from '../../lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    if (mockBooks.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }

    res.status(200).json({
      books: mockBooks
    });
  } else {
    res.status(405).end(`Method Not Allowed`);
  }
}