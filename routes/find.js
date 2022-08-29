const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// DB
const pool = require('../middleware/pool');

// 아이디 찾기
router.get('/findID', async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);
	try {
		const UserEmail =await con1.query(
			"select UserEmail from user where UserName = ? AND UserPhoneNumber = ?",
			[req.body.UserName, req.body.UserPhonenumber]
		);
		con1.commit();
		res.status(200).json(UserEmail[0][0]);
	} catch (e) {
		con1.rollback();
		throw e;
	}
		
});
// 비밀번호 찾기
router.post('/findPW', async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);
	try {
		const UserEmail =await con1.query(
			"select UserEmail from user where UserEmail = ? AND UserName = ?",
			[req.body.UserEmail, req.body.UserName]
		);
		if (!UserEmail[0][0]) { // 유저가 존재하지 않을 경우
            res.status(400).json({result: false, msg: "User does not exist!" })
        } else{
			//받아온 email user_email에 초기화
			let user_email = req.body.UserEmail; 
			const payload = { email: user_email };
			//토큰 만들기
			const token =jwt.sign(payload,
				process.env.ACCESS_TOKEN,
				{ expiresIn: '1h'});

			console.log(user_email);
			// 메일발송 함수
			const mailPoster = nodemailer.createTransport({
				service: 'naver',
				host: 'smtp.naver.com',
				port: 465,
				auth: {
				  user: process.env.NODEMAILER_USER,
				  pass: process.env.NODEMAILER_PASSWORD,
				}
			  });
			//메일 받는 함수
			const mailOptions = {
			  from: process.env.NODEMAILER_USER,
			  to: user_email ,
			  subject: '비밀번호 초기화 메일입니다.',
			  html: `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.</p>` +
			  `<a href='http://localhost:3000/api/findPW/updatePW/${token}'>비밀번호 새로 입력하기</a>`
			};
			//메일 보내기
			mailPoster.sendMail(mailOptions, function(error, info){			  

				if (error) {
				console.log('에러 ' + error);
				}
				else {
				console.log('전송 완료 ' + info.response);
				}
			});
			mailPoster.close();			  			
		}
		con1.commit();
		} catch (e) {
		con1.rollback();
		throw e;
	}		
});

//비밀번호 변경 부분인데 잘 모르겟음 나중에 다시 해봄
router.get('/updatePW/:${token}', async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);
	try {
		const token = req.body
		const verified = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
		  if (err) return null;
		  return decoded;
		});
		const email = verified;
		const UserEmail = await con1.query(
			"select UserEmail from user where UserEmail = ?",email)

    	bcrypt.hash(req.body.UserPassword, 10, async (err, hash) => {
        	if (err) {
            throw err;
        	} else {
    	        await con1.query('UPDATE User SET UserPassword = ? WHERE UserEmail = ?',
        	        [hash,UserEmail]);
        	        con1.commit();
        	        res.status(200).json({ result: true, msg: "Password update successful!" });
        	    } 
		}); 
	}catch (e) {
        con1.rollback();
    	throw e;
    } finally {
    	con1.release();
    }
});

module.exports = router;
