const express = require('express');
const router = express.Router();

// 인증
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

// 거래처 등록
router.post('/addClient', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO Client(ClientName, ClientNum, ClientAddress, ManagerName, ManagerNum, ClientInfo, UserID) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [req.body.ClientName, req.body.ClientNum, req.body.ClientAddress, req.body.ManagerName, req.body.ManagerNum, req.body.ClientInfo, req.decoded.UserID]
            );
            await con1.query("SET @CNT = 0");
 
            await con1.query("UPDATE CLIENT SET CLIENT.CLIENTID = @CNT:=@CNT+1");

            await con1.query("SET @CNT = 0");
            await con1.query("UPDATE Client SET Client.UserCID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 거래처 리스트 
router.get('/listClient', validate.isLoggedin, async (req, res) => {
    try {
       const Client = await pool.query("SELECT * FROM Client WHERE UserID = ?", req.decoded.UserID);
       return res.status(200).json({ 
             result: Client[0], msg: "Success" 
         });
    } catch (e) {
       throw e;
    }
 });
 

// 거래처 수정
router.put('/updateClient', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE Client SET ClientName = ?, ClientNum = ?, ClientAddress = ?, ManagerName = ?, ManagerNum = ?, ClientInfo = ? WHERE ClientID = ?",
        [req.body.ClientName, req.body.ClientNum, req.body.ClientAddress, req.body.ManagerName, req.body.ManagerNum, req.body.ClientInfo ,req.body.ClientID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//거래처 삭제 02
router.delete('/deleteClient', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
	try {
        con1.beginTransaction();
        await con1.query("DELETE FROM Client WHERE ClientID = ?",[req.body.ClientID])
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE Client SET Client.ClientID = @CNT:=@CNT+1");
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE Client SET Client.UserCID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// Company 리스트
router.get('/CompanyList', validate.isLoggedin, async (req, res) => {
    try { 
         const C_Product = await pool.query("select * from User where UserCode =? and UserID != ?", [req.decoded.UserCode, req.decoded.UserID])
       return res.status(200).json({ result: C_Product[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });



module.exports = router;

