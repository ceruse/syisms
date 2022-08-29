const express = require('express');
const router = express.Router();

// 인증
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');


//출고 최초 등록 
router.post('/addoutput', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO Output(OutputDate, OutputStore, UserID, UserType, UserCode) Values(DATE_ADD(now(),INTERVAL 9 HOUR), ?, ?, ?, ?)",
            [req.decoded.UserInfo, req.decoded.UserID, req.decoded.UserType, req.decoded.UserCode]
        );
        await con1.query("SET @CNT = 0");
 
        await con1.query("UPDATE Output SET Output.UserOID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
       con1.commit();
       res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//출고 상세내역 등록
router.post('/addMoveOutput', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO moveOutput(ProductID, ProductName, ProductCode, ProductBarcode, ProductImport, ProductExport, SalesCount, ProductCount, Attribute, UserID, InputStore, OutputID, UserType, UserCode) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [req.body.ProductID, req.body.ProductName, req.body.ProductCode, req.body.ProductBarcode, req.body.ProductImport, req.body.ProductExport, 1, req.body.ProductCount, req.body.Attribute,
                req.decoded.UserID, req.body.InputStore, req.body.OutputID, req.decoded.UserType, req.decoded.UserCode]
       );
       await con1.query("SET @CNT = 0");
       await con1.query("UPDATE MoveOutput SET MoveOutput.MoveOutputID = @CNT:=@CNT+1");
       await con1.query("SET @CNT = 0");
       await con1.query("UPDATE MoveOutput SET MoveOutput.UserMOID = @CNT:=@CNT+1 where UserID = ?", [req.decoded.UserID]);
       con1.commit();
       res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 출고 1차 등록
router.put('/updateoutputConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE Output SET InputStore = ?, OutputInfo = ?, Confirm = 0 Where UserID = ? and Confirm IS NULL",
        [req.body.InputStore, req.body.OutputInfo, req.decoded.UserID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.put('/updatemoveoutputConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveOutput SET Confirm = 0 Where UserID = ? and Confirm IS NULL",
        [req.decoded.UserID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 출고 취소
router.delete('/deleteoutputConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE from Output Where OutputID = ? and UserID = ?",
        [req.body.OutputID, req.decoded.UserID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.delete('/deletemoveoutputConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE from MoveOutput Where OutputID = ? and UserID = ?",
        [req.body.OutputID, req.decoded.UserID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 취소, 다른 창으로 벗어날 시 기존 저장된 테이블 삭제.
router.delete('/deleteinfo', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE from Output Where Confirm IS NULL",
        )
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.delete('/deletemoveoutputinfo', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE from MoveOutput Where Confirm IS NULL",
        )
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 출고 등록
router.put('/finalmoveoutputConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveOutput SET Confirm = 1 Where OutputID = ?",
        [req.body.OutputID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.put('/finalConfirm', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE Output SET Confirm = 1 Where OutputID = ?",
        [req.body.OutputID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//입고 대상 리스트
router.get('/moveinputlist', validate.isLoggedin, async (req, res) => {
   try {
      const input = await pool.query("select * from moveinput where UserID =? and Confirm IS NULL", req.decoded.UserID);
      return res.status(200).json({ input: input[0], msg: "Success"  });
   } catch (e) {
      throw e;
   }
});

//출고 대상 리스트
router.get('/moveoutputlist', validate.isLoggedin, async (req, res) => {
   try {
      const output = await pool.query("select * from moveoutput where UserID =? and Confirm IS NULL", req.decoded.UserID);
      return res.status(200).json({ output: output[0], msg: "Success"  });
   } catch (e) {
      throw e;
   }
});

//출고 내역 리스트
router.get('/outputlist', validate.isLoggedin, async (req, res) => {
   try {
      const output = await pool.query("select * from output where UserID = ? and Confirm IS NULL", req.decoded.UserID);
      return res.status(200).json({ output: output[0], msg: "Success"   });
   } catch (e) {
      throw e;
   }
});

//출고 내역 리스트
router.get('/outputlists', validate.isLoggedin, async (req, res) => {
    try {
       const output = await pool.query("select * from output where UserID = ? and Confirm = 0", req.decoded.UserID);
       return res.status(200).json({ output: output[0], msg: "Success"   });
    } catch (e) {
       throw e;
    }
 });

//출고 리스트 (확정 전)
router.get('/outputbeforelist', validate.isLoggedin, async (req, res) => {
    try {
       const output = await pool.query("select * from output where Confirm = 0 and UserID = ?", req.decoded.UserID);
       return res.status(200).json({ output: output[0], msg: "Success"   });
    } catch (e) {
       throw e;
    }
 });

// 입출고 내역 내스트
router.get('/inoutputlist', validate.isLoggedin, async (req, res) => {
   try {
      const inoutput = await pool.query("select InputID, InputDate, InputInfo, InputDIV from input where UserName = ? union select OutputID, OutputDate, OutputInfo, OutputDIV from output where UserName = ? order by inputdate desc;", 
        [req.decoded.UserName, req.decoded.UserName]);
      return res.status(200).json({ inoutput: inoutput[0]});
   } catch (e) {
      throw e;
   }
});

//출고 대상 리스트
router.get('/moveoutput', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from output where InputStore = ? and Confirm = 0", req.decoded.UserInfo);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //
router.get('/detailmoveoutput', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from moveoutput where (UserID = ? or InputStore = ?) and Confirm = 0", [req.decoded.UserID, req.decoded.UserID]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

//입출고 내역 리스트
router.get('/alllist', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from output where (UserID = ? or InputStore = ?) and Confirm = 1", [req.decoded.UserID, req.decoded.UserInfo]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //입출고 물품 리스트
 router.get('/detailAllList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from moveoutput where (UserID = ? or InputStore = ?) and Confirm = 1", [req.decoded.UserID, req.decoded.UserID]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //입출고 제품 수정 (덧셈)
router.put('/plusmoveproduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveOutput SET SalesCount = SalesCount + 1 WHERE MoveOutputID = ?",
        [req.body.MoveOutputID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//입출고 제품 수정 (뺄셈)
router.put('/minusmoveproduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("UPDATE MoveOutput SET SalesCount = SalesCount - 1 WHERE MoveOutputID = ?",
        [req.body.MoveOutputID])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//입출고 제품 삭제
router.delete('/deleteMoveproduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("DELETE FROM MoveOutput WHERE MoveOutputID = ?",[req.body.MoveOutputID])
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE MoveOutput SET MoveOutput.MoveOutputID = @CNT:=@CNT+1");
        await con1.query("SET @CNT = 0");
        await con1.query("UPDATE MoveOutput SET MoveOutput.UserMOID = @CNT:=@CNT+1 where UserID = ? and Confirm IS NULL", req.decoded.UserID);
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 입출고 전 없는 제품의 여부 확인
 router.put('/findmoveoutput', validate.isLoggedin, async (req, res) => {
   try {
    const result = await pool.query("select A.* from Product  AS A INNER JOIN MoveOutput AS B on A.ProductID = B.ProductID where B.OutputID = ? and A.UserID != B.InputStore",
        [req.body.OutputID])
        return res.status(200).json({ result: result[0], msg: "Success" });
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
            "INSERT INTO Product(ProductName, ProductCode, ProductImport, ProductExport, ProductCount, Attribute, ProductDate, UserID, UserType, UserCode, UserInfo) VALUES( ?, ?, ?, ?, ?, ?, DATE_ADD(now(),INTERVAL 9 HOUR), ?, ?, ?, ?)",
            [req.body.ProductName, req.body.ProductCode, req.body.ProductImport, req.body.ProductExport, req.body.ProductCount, req.body.Attribute, req.decoded.UserID, req.decoded.UserType, req.decoded.UserCode, req.decoded.UserInfo]
        );

        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

// 출고 확정 처리
router.put('/updateoutputProduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("Update Product A inner join MoveOutput B on A.ProductName = B.ProductName set A.ProductCount = A.ProductCount - B.SalesCount where B.OutputID = ? and A.UserID != ?" ,
        [req.body.OutputID, req.decoded.UserID])
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

// 입고 확정 처리
router.post('/updateProduct', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("Update Product A inner join MoveOutput B on A.ProductName = B.ProductName set A.ProductCount = A.ProductCount + B.SalesCount where B.OutputID = ? and A.UserID = ? and B.ProductCode = ?",
        [req.body.OutputID, req.decoded.UserID, req.body.ProductCode])
        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.get('/testList', validate.isLoggedin, async (req, res) => {
    try {
        const result = await pool.query("select A.* from Product AS A INNER JOIN MoveOutput AS B on A.ProductID = B.ProductID where B.OutputID = ? and A.UserID != B.InputStore", req.params.OutputID)
       return res.status(200).json({ result: result[0] });
    } catch (e) {
       throw e;
    }
 });

 //출고 상세내역 리스트
router.get('/outnputdetaillist', validate.isLoggedin, async (req, res) => {
    try {
       const moveoutput = await pool.query("SELECT OutputID,  ProductID, OutputCount FROM moveinput WHERE Confirm IS NULL and OutputID = ?", req.body.OutputID);
       return res.status(200).json({ moveoutput: moveoutput[0] });
    } catch (e) {
       throw e;
    }
 });

 // 출고 확정 날짜 추가
router.put('/updatetime', validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);
   try {
        con1.beginTransaction();
        await con1.query("Update Output SET InputDate = DATE_ADD(now(),INTERVAL 9 HOUR) where OutputID = ?" ,
        [req.body.OutputID])

        con1.commit();
        res.status(200).json({ result: true, msg: "Success" });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

//Inputstore가 나만
router.get('/OnlyMeInputList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from output where InputStore = ? and Confirm = 1", [req.decoded.UserInfo]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //Outputstore가 나만
router.get('/OnlyMeOutputList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select * from output where UserID= ? and Confirm = 1", [req.decoded.UserID]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //Inputstore가 나만 (MoveOutput)
router.get('/OnlyMeMoveInputList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select ProductName, ProductCode, sum(salesCount)as Count from Moveoutput where InputStore =?  and Confirm = 1 group by ProductCode order by Count desc;", [req.decoded.UserID]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

 //Outputstore가 나만 (MoveOutput)
router.get('/OnlyMeMoveOutputList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select ProductName, ProductCode, sum(salesCount)as Count from Moveoutput where UserID =?  and Confirm = 1 group by ProductCode order by Count desc;", [req.decoded.UserID]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

  //매장 별 판매 상황
router.get('/TotalCalcList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select '일매출' as Temp, A.UserInfo as Info, A.UserAddress, DATE_FORMAT(B.SalesDate, '%Y-%m-%d') as Dates, sum(B.SalesPrice) as Price, sum(B.SalesCount) as Count from User as A inner join Sales as B on A.UserID = B.UserID where DATE_FORMAT(DATE_SUB(B.SalesDate, INTERVAL 9 HOUR), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') and UserCode = ? group by Info union select '월매출' as Temp, A.UserInfo as Info, A.UserAddress, DATE_FORMAT(B.SalesDate, '%Y-%m-%d') as Dates, sum(B.SalesPrice) as Price, sum(B.SalesCount) as Count from User as A inner join Sales as B on A.UserID = B.UserID where DATE_FORMAT(DATE_SUB(B.SalesDate, INTERVAL 9 HOUR), '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') and UserCode = ? group by Info;", [req.decoded.UserCode, req.decoded.UserCode]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

   //입고
router.get('/InputCalcList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select '입고' as Temp, A.UserInfo as Info, sum(B.Confirm) as Count, A.UserAddress, DATE_FORMAT(B.InputDate, '%Y-%m-%d') as Dates from User as A left outer join Output as B on A.UserInfo = B.InputStore where DATE_FORMAT(DATE_SUB(B.InputDate, INTERVAL 9 HOUR), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') and B.UserCode = ? and B.Confirm = 1 group by Info;", [req.decoded.UserCode]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });

   //출고
router.get('/OutputCalcList', validate.isLoggedin, async (req, res) => {
    try {
       const result = await pool.query("select '출고' as Temp, A.UserInfo as Info, A.UserAddress, sum(B.Confirm) as Count, B.UserType, DATE_FORMAT(B.OutputDate, '%Y-%m-%d') as Dates from User as A inner join Output as B on A.UserInfo = B.OutputStore where DATE_FORMAT(DATE_SUB(B.OutputDate, INTERVAL 9 HOUR), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') and B.UserCode = ? and B.Confirm = 1 group by Info;", [req.decoded.UserCode]);
       return res.status(200).json({ result: result[0], msg: "Success"  });
    } catch (e) {
       throw e;
    }
 });
/*
        await con1.query("SET @CNT = 0");
 
        await con1.query("UPDATE PRODUCT SET PRODUCT.PRODUCTID = @CNT:=@CNT+1");

        await con1.query("SET @CNT = 0");
 
        await con1.query("UPDATE PRODUCT SET PRODUCT.UserPID = @CNT:=@CNT+1 where UserID = ?", req.decoded.UserID);
       // await con1.query(
           // "INSERT INTO attribute VALUES(?, ?, ?, ?, ?, ?)",
           // [ProductID, req.body.Opt1, req.body.Opt2, req.body.Opt3, req.body.Opt4, req.body.Opt5]
      //  );
*/
module.exports = router;