import { Deta } from 'deta';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const databaseId = "59bffb62d0c445a7940214bfb070de79";

  switch (method) {
    // NOTE: check if invite code exists
    case "GET":
      try {
        const queryInviteCode = req.query.inviteCode;
        if (!queryInviteCode) {
          throw "Invalid invite code";
        }
        const deta = Deta(process.env.DETA_BASE_PROJECT_KEY);
        const db = deta.Base("notish-invite-code-store");
        const inviteCode = await db.get(queryInviteCode.toString());

        if (!inviteCode) throw "Invalid invite code";

        return res.status(200).end();
      } catch (error: any) {
        return res.status(400).json({
          error: {
            message: error,
          },
        });
      }

    case "DELETE":
      //   NOTE: change status of the code
      try {
        const { inviteCode } = req.query;
        if (!inviteCode) throw "Invalid invite code";

        const deta = Deta(process.env.DETA_BASE_PROJECT_KEY);
        const db = deta.Base("notish-invite-code-store");
        await db.delete(inviteCode.toString());

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
