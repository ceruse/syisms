// const express = require('express');
// const router = express.Router();

// // DB
// const pool = require('../middleware/pool');

// router.get('/', async (req, res) => {
// 	let con1 = await pool.getConnection(async (conn) => conn);
// 	try {
// 		const UserEmail =await con1.query(
// 			"select UserEmail from user where UserName = ? AND UserPhoneNumber = ?",
// 			[req.body.UserName, req.body.UserPhonenumber]
// 		);
// 		con1.commit();
// 		res.status(200).json(UserEmail[0][0]);
// 	} catch (e) {
// 		con1.rollback();
// 		throw e;
// 	}
		
// });

// module.exports = router;


