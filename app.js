const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

const authRouter = require('./routes/auth')
const mypageRouter = require('./routes/mypage');
// const findIDRouter = require('./routes/findID');
const findRouter = require('./routes/find');
const productRouter = require('./routes/product');
const MoveRouter = require('./routes/Move');
const ClientRouter = require('./routes/Client');
const SalesRouter = require('./routes/Sales');



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// API
app.use('/api/auth', authRouter);
app.use('/api/mypage', mypageRouter);
// app.use('/api/findID', findIDRouter);
app.use('/api/find', findRouter);
app.use('/api/product', productRouter);
app.use('/api/Move', MoveRouter);
app.use('/api/Client', ClientRouter);
app.use('/api/Sales', SalesRouter);

// Server
const port = process.env.PORT || 3001

app.get('/', (req, res) => res.send('Welcome'));
app.listen(port, () => console.log(`Server running on port ${port}`));