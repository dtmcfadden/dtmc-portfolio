import type { NextApiRequest, NextApiResponse } from 'next';
import {
	getTodoCategoryByUserIdAndParentId,
	insertTodoCategoryByUserId,
} from '@/controllers/todo/category/name/name.controller';
import { getToken } from 'next-auth/jwt';
import { toTodoCategoryDateToInt } from '@/controllers/todo/category/name/name.mapper';
import _ from 'lodash';
// import { searchUser, updateUser } from 'lib/api/user';
// import { getSession } from 'next-auth/react';
// import { getMdxSource } from 'lib/api/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req });
	if (req.method === 'GET') {
		// try {
		//   const result = await searchUser(req.query.query as string);
		//   return res.status(200).json(result);
		// } catch (e: any) {
		//   console.log(e);
		//   return res.status(500).json({
		//     error: e.toString()
		//   });
		// }
	} else if (req.method === 'PUT') {
		// const { username, bio } = req.body;
		// const session = await getSession({ req });
		// if (!session || session.username !== username) {
		//   return res.status(401).json({
		//     error: 'Unauthorized'
		//   });
		// }
		// try {
		//   const result = await updateUser(username, bio);
		//   if (result) {
		//     await res.unstable_revalidate(`/${username}`);
		//   }
		//   const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
		//   return res.status(200).json(bioMdx);
		// } catch (e: any) {
		//   console.log(e);
		//   return res.status(500).json({
		//     error: e.toString()
		//   });
		// }
	} else if (req.method === 'POST') {
		const { name, parentId } = req.body;
		// console.log('todoCategory name', name, 'parentId', parentId);
		try {
			if (token?.sub) {
				// const result = await getProfileBySessionToken(session_token);
				// const result = toTodoCategory(await insertTodoCategory({ id: token.sub, name: name, parentId: parentId }));
				const insertedCategory = await insertTodoCategoryByUserId({ id: token.sub, name: name, parentId: parentId });

				let returnCategoryList = null;
				if (_.isEmpty(insertedCategory) === false) {
					returnCategoryList = toTodoCategoryDateToInt(
						await getTodoCategoryByUserIdAndParentId({ id: token.sub, parentId: insertedCategory?.parentId }),
					);
				}

				// console.log('todoCategory returnCategoryList', returnCategoryList);

				return res.status(200).json(returnCategoryList);
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
	} else {
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
