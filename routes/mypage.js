const express = require('express');
const router = express.Router();

// 인증
const bcrypt = require('bcryptjs');
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

// 정보 조회
router.get('/select', validate.isLoggedin, async (req, res) => {
   try {
      const User = await pool.query("SELECT * FROM User WHERE UserID =?", req.decoded.UserID);
      return res.status(200).json({
         UserEmail: User[0][0].UserEmail,
         UserName: User[0][0].UserName,
         UserInfo: User[0][0].UserInfo,
         UserAddress: User[0][0].UserAddress,
         UserPhonenumber: User[0][0].UserPhonenumber,
         UserType:User[0][0].UserType,
         UserCode:User[0][0].UserCode,
      });
   } catch (e) {
      throw e;
   }
});


// 정보 수정
router.put('/update', validate.isLoggedin, async (req, res) => {
   let con1 = await pool.getConnection(async (conn) => conn);
 
    bcrypt.hash(req.body.UserPassword, 10, async (err, hash) => {
       if (err) {
          throw err;
       } else {
          try {
             con1.beginTransaction();
          //UPDATE User SET UserName = ?, UserPassword = ?, UserAddress = ?, UserPhonenumber = ? WHERE UserEmail = ?
             await con1.query('UPDATE User SET UserPassword = ?, UserName = ?, UserInfo = ?, UserAddress = ?, UserPhonenumber = ?, UserCode = ? WHERE UserEmail = ?',
             [hash, req.body.UserName, req.body.UserInfo, req.body.UserAddress, req.body.UserPhonenumber, req.body.UserCode, req.decoded.UserEmail]);
             con1.commit();
             res.status(200).json({ result: true, msg: "User update successful!" });
          } catch (e) {
             con1.rollback();
             throw e;
          } finally {
             con1.release();
          }
       }
    });
 
 });

 // 물품의 정보를 수정
router.put('/updateProduct', validate.isLoggedin, async (req, res) => {
   let con1 = await pool.getConnection(async (conn) => conn);
          try {
             con1.beginTransaction();
             await con1.query('UPDATE Product SET UserInfo = ?, UserCode = ? WHERE UserID = ?',
             [req.body.UserInfo, req.body.UserCode, req.decoded.UserID]);
             con1.commit();
             res.status(200).json({ result: true, msg: "Product update successful!" });
          } catch (e) {
             con1.rollback();
             throw e;
          } finally {
             con1.release();
          }
       })


// 회원 정보 삭제
router.delete('/b', validate.isLoggedin, async (req, res) => {
   let con1 = await pool.getConnection(async conn => conn)

   try {
      con1.beginTransaction()
      const User = await con1.query('SELECT * FROM User WHERE UserEmail = ?', [req.decoded.UserEmail]);
      bcrypt.compare(req.body.UserPassword, User[0][0].UserPassword, async (err, result) => {
         if (!result){
            res.status(400).json({result: false, msg: "Password is incorrect!"});
         } else {
            await con1.query('DELETE FROM User WHERE UserEmail = ?', [req.decoded.UserEmail]);
            con1.commit()
            res.status(200).clearCookie('user').json({ msg: 'User delete complete! '});
         }
      })
   } catch (e) {
      con1.rollback()
      throw e;
   } finally {
      con1.release()
   }
})

module.exports = router;