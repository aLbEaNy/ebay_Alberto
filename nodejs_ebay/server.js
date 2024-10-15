//NodeJS Server
require('dotenv').config();
const express=require('express');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt'); 

const serverWev=express();

serverWev.use(cookieParser());
serverWev.use(bodyParser.urlencoded({extended:false}));
serverWev.use(cors());

//serverWev.post();

//serverWev.get();

serverWev.listen(3003,()=> console.log('...ServerWeb escuchando por el puerto 3003...'));
