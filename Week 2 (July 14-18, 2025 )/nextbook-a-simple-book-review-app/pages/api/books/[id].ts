import { NextApiRequest, NextApiResponse } from 'next';
import { mockBooks } from '../../../lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const book = mockBooks.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } else {
    res.status(405).end(`Method Not Allowed`);
  }
}