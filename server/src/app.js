import express from 'express';
import cors from 'cors'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
  origin: [process.env.CORS_ORIGIN, 'http://localhost:5173'],
  credentials: true,
}));
app.use(ClerkExpressWithAuth());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World from backend!' });
});


export  {app};
