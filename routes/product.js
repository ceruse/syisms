const express = require('express');
const router = express.Router();

// 인증
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

//제품 수정
router.put('/updateProduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        // const UpdateProduct = await con1.query("SELECT * FROM Product WHERE ProductName = ?",[req.body.ProductName]);
        await con1.query("UPDATE Product SET ProductName = ?, Productcode = ?, ProductImport = ?, ProductExport = ?, ProductCount = ?, Attribute = ? WHERE ProductID = ?",
        [req.body.ProductName, req.body.ProductCode, req.body.ProductImport, req.body.ProductExport, req.body.ProductCount, req.body.Attribute, req.body.ProductID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//제품 삭제 02
router.delete('/deleteProduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        // const UpdateProduct = await con1.query("SELECT * FROM Product WHERE ProductName = ?",[req.body.ProductName]);
        await con1.query("DELETE FROM Product WHERE ProductID = ?",[req.body.ProductID])
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE PRODUCT SET PRODUCT.UserPID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//원래 코드"select * from product a left join attribute b on a.ProductID = b.AttributeID where UserID =?"
// 제품 리스트
router.get('/ProductList', validate.isLoggedin, async (req, res) => {
	try { 
        const Product = await pool.query("select * from product where UserID =?", req.decoded.UserID);
        

		return res.status(200).json({ result: Product[0], msg: "Success" });
       
	} catch (e) {
		throw e;
	}
});

// 제품 리스트 (본사전용)
router.get('/CompanyProductList', validate.isLoggedin, async (req, res) => {
    try { 
         const C_Product = await pool.query("select * from product where UserCode =?", req.decoded.UserCode)
       return res.status(200).json({ result: C_Product[0], msg: "Success" });
        
    } catch (e) {
       throw e;
    }
 });

// 제품과 속성 등록
router.post('/addProduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
    // const BCnumber = BarcordNumber(2011111111111,2099999999999);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO Product(ProductName, ProductCode, ProductImport, ProductExport, ProductCount, ProductDate, UserID, Attribute, UserType, UserCode, UserInfo) VALUES( ?, ?, ?, ?, ?, DATE_ADD(now(),INTERVAL 9 HOUR), ?, ?, ?, ?, ?)",
            [req.body.ProductName, req.body.ProductCode, req.body.ProductImport, req.body.ProductExport, req.body.ProductCount, req.decoded.UserID, req.body.Attribute, req.decoded.UserType, req.decoded.UserCode, req.decoded.UserInfo]
        );

        await con1.query("SELECT IFNULL(Attribute, 'NULL') from Product");

        await con1.query("SET @CNT = 0");
 
        await con1.query("UPDATE PRODUCT SET PRODUCT.UserPID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
       // await con1.query(
           // "INSERT INTO attribute VALUES(?, ?, ?, ?, ?, ?)",
           // [ProductID, req.body.Opt1, req.body.Opt2, req.body.Opt3, req.body.Opt4, req.body.Opt5]
      //  );
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

