const express = require('express');
const router = express.Router();

// 인증
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

// 판매 제품 리스트
router.get('/moveSalesList', validate.isLoggedin, async (req, res) => {
   try { 
        const Product = await pool.query("select * from MoveSales where UserID =? and SalesID IS NULL", req.decoded.UserID);
        
      return res.status(200).json({ result: Product[0], msg: "Success" });
       
   } catch (e) {
      throw e;
   }
});

// (Log) 판매 제품 리스트
router.get('/moveSalesListLog', validate.isLoggedin, async (req, res) => {
    try { 
         const Product = await pool.query("select * from MoveSales where UserID =?", req.decoded.UserID);
         
       return res.status(200).json({ result: Product[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

// 판매 제품 등록
router.post('/addMoveSales', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO MoveSales(ProductID, ProductName, ProductCode, ProductBarcode, ProductImport, ProductExport, SalesCount, UserID, SalesID, ProductCount) Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [req.body.ProductID, req.body.ProductName, req.body.ProductCode, req.body.ProductBarcode, req.body.ProductImport, req.body.ProductExport, 1, req.decoded.UserID, req.body.SalesID, req.body.ProductCount]
        );
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE MoveSales SET MoveSales.MoveSalesID = @CNT:=@CNT+1");
        await con1.query("SET @CNT = 0");
 
        await con1.query("UPDATE MoveSales SET MoveSales.UserMSID = @CNT:=@CNT+1 where UserID = ? and SalesID Is NULL", req.decoded.UserID);
       con1.commit();
       res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//제품 수정 (덧셈)
router.put('/plusmovesales', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveSales SET SalesCount = SalesCount + 1 WHERE MoveSalesID = ?",
        [req.body.MoveSalesID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//제품 수정 (뺄셈)
router.put('/minusmovesales', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveSales SET SalesCount = SalesCount - 1 WHERE MoveSalesID = ?",
        [req.body.MoveSalesID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//제품 삭제
router.delete('/deleteMoveSales', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE FROM MoveSales WHERE MoveSalesID = ?",[req.body.MoveSalesID])
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE MoveSales SET MoveSales.MoveSalesID = @CNT:=@CNT+1");
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE MoveSales SET MoveSales.UserMSID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 판매 제품 등록
router.post('/addSales', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO Sales(SalesCount, SalesPrice, SalesDate, UserID) Values (?, ?, DATE_ADD(now(),INTERVAL 9 HOUR), ?)",
            [req.body.SalesCount, req.body.SalesPrice, req.decoded.UserID]);
            await con1.query("SET @CNT = 0");
            await con1.query("UPDATE Sales SET Sales.SalesID = @CNT:=@CNT+1");
            await con1.query("SET @CNT = 0");
            await con1.query("UPDATE Sales SET Sales.UserSID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
       con1.commit();
       res.status(200).json({ result: true, msg: "Success" }); 
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 판매시 추가 옵션 (movesales에 salesID 입력)
router.put('/updateSalesID', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveSales SET SalesID = ? Where SalesID IS NULL",
        [req.body.SalesID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 판매시 추가 옵션 (Product 개수를 판매한 수량 만큼 뺄셈)
router.put('/updateCount', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("Update Product A inner join Movesales B on A.ProductName = B.ProductName set A.ProductCount = A.ProductCount - B.SalesCount where B.SalesID IS NULL",
        )
        con1.commit();
        res.status(200).json({ result: true, msg: "Minus Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 제품 리스트 (내역)
router.get('/finalSalesList', validate.isLoggedin, async (req, res) => {
    try { 
        const Sales = await pool.query("select * from Sales where UserID =? and SalesID = ?", req.decoded.UserID, req.body.SalesID);
         
        return res.status(200).json({ result: Sales[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

// 판매 제품 리스트 (내역)
router.get('/finalmoveSalesList', validate.isLoggedin, async (req, res) => {
    try { 
        const Sales = await pool.query("select * from MoveSales where UserID =? and SalesID = ?", req.decoded.UserID, req.body.SalesID);
         
        return res.status(200).json({ result: Sales[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

 // 제품 리스트 (전체 내역)
router.get('/SalesList', validate.isLoggedin, async (req, res) => {
    try { 
        const Sales = await pool.query("select * from Sales where UserID =?", req.decoded.UserID);
         
        return res.status(200).json({ result: Sales[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

// 코드를 기준으로 전체 내역
 router.get('/TotalSalesList', validate.isLoggedin, async (req, res) => {
    try { 
        const Sales = await pool.query("select A.*, B.UserCode from Sales as A inner join User as B on A.UserID = B.UserID where B.UserCode = ?;", req.decoded.UserCode);
         
        return res.status(200).json({ result: Sales[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

module.exports = router;