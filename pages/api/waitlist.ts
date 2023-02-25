import { Deta } from 'deta';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email, preference, others } = req.body;
        const deta = Deta(process.env.DETA_BASE_PROJECT_KEY);
        const db = deta.Base("publicator-waitlist");
        // check if email address already exists
        const emailData = await db.get(email);
        if (emailData) throw "Email already added to waitlist";

        await db.put({ preference, others }, email);
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({
          error: {
            message: error,
          },
        });
      }
  }
};
