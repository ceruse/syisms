const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

// 인증
const bcrypt = require('bcryptjs');
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

router.post('/signup',validate.validateRegister, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
    // DB에 email, nickname이 겹치는 user가 있는지 확인
    try { 
        const same_email = await pool.query(
            "SELECT * FROM User WHERE UserEmail = ?",
            req.body.UserEmail
        );
        const same_name = await pool.query(
            "SELECT * FROM User WHERE UserName = ?",
            req.body.UserName
        );
        if (same_email[0][0] !== undefined || same_name[0][0] !== undefined) {
            return res.status(400).json({
                result: false,
                msg: "User is aleady exist!",
            });
        }
    } catch (e) {
        throw e;
    }
    // 비밀번호를 암호화 해서 DB 에 저장
    bcrypt.hash(req.body.UserPassword, 10, async (err, hash) => {
        if (err) {
            throw err;
        } else {
            try {
                con1.beginTransaction();
                await con1.query(
                    "INSERT INTO User(UserEmail, UserName, UserPassword, UserAddress, UserPhonenumber, UserInfo, UserType, UserCode) VALUES(?, ?, ?, ?, ?,?, ?, ?)",
                    [req.body.UserEmail, req.body.UserName, hash, req.body.UserAddress, req.body.UserPhonenumber, req.body.UserInfo, req.body.UserType, req.body.UserCode]
                );
                con1.commit();
                res.status(200).json({ result: true, msg: "Success" });
            } catch (e) {
                con1.rollback();
                throw e;
            } finally {
                con1.release();
            }
        }
    });
});

router.post("/login", async (req, res) => {
    try {
        // email로 유저 검색
        const User = await pool.query("SELECT * FROM User WHERE UserEmail = ?", [ req.body.UserEmail ]);
        if (!User[0][0]) { // 유저가 존재하지 않을 경우
            res.status(400).json({result: false, msg: "User does not exist!" })
        } else {
            // hash로 암호화된 password를 req로 들어온 password와 비교
            bcrypt.compare(req.body.UserPassword, User[0][0].UserPassword, (err, result) => {
                if (!result){
                    res.status(400).json({result: false, msg: "Password is incorrect!"});
                } else {
                    jwt.sign({ // 토큰에 담는 정보
                        UserID: User[0][0].UserID,
                       UserEmail: User[0][0].UserEmail,
                        UserName: User[0][0].UserName,
                        UserType: User[0][0].UserType,  
                        UserCode: User[0][0].UserCode,
                        UserInfo: User[0][0].UserInfo,                       
                    },
                        process.env.JWT_SECRET,
                         // 토큰 만료 기간 15일
                        (err, token) => {
                            if (err) {throw err;}
                            res.status(200)
             .cookie('user', token) // 'user' 명을 가진 쿠키
             .json({result: true, msg: 'Login Successful!'});
                        }
          );
                }
            });
        }
    } catch (e) {
        throw e;
    }
});

// 존재하는 계정이 있는지 Check
router.get('/UserCheck', validate.isLoggedin, async (req, res) => {
   try {
      const Product = await pool.query("select * from user where UserID = 1", req.decoded.UserID);


      return res.status(200).json({ result: Product[0], msg: "Success" });
   } catch (e) {
      throw e;
   }
});

router.get("/logout", validate.isLoggedin, (req, res) => {
    return res.status(200).clearCookie('user').json({result: true, msg: 'Logout Successful!'});
})

//회원 탈퇴 - 모든 정보 삭제
router.delete('/deleteall', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE FROM User WHERE UserID = ?",[req.decoded.UserID])
        await con1.query("DELETE FROM Product WHERE UserID = ?",[req.decoded.UserID])
        await con1.query("DELETE FROM Client WHERE UserID = ?",[req.decoded.UserID])
        await con1.query("DELETE FROM MoveSales WHERE UserID = ?",[req.decoded.UserID])
        await con1.query("DELETE FROM Sales WHERE UserID = ?",[req.decoded.UserID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});
module.exports = router;
