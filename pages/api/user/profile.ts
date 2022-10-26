import type { NextApiRequest, NextApiResponse } from 'next';
import { getNameBySession } from '@/mysql/controllers/userController';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		// console.log('req.cookies', req.cookies);
		try {
			const session_token = req?.cookies['next-auth.session-token'];
			// console.log('session_token', session_token);
			if (session_token) {
				const result = await getNameBySession(session_token);
				return res.status(200).json(result);
			} else {
				return res.status(401).json({
					error: 'Unauthorized',
				});
			}
		} catch (e: any) {
			console.log(e);
			return res.status(500).json({
				error: e.toString(),
			});
		}
	} /* else if (req.method === 'PUT') {
    const { username, updateName } = req.body;
    const session = await getSession({ req });
    if (!session || session.username !== username) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    try {
      const result = await updateNameBySession(session.username, updateName);
      if (result) {
        await res.unstable_revalidate(`/${username}`);
      }
      const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
      return res.status(200).json(bioMdx);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  }*/ else {
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
