import express from 'express';
import cors from 'cors'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
  origin: [process.env.CORS_ORIGIN],
  credentials: true,
}));
app.use(ClerkExpressWithAuth());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from './routes/user-resumes.routes.js';
import aiRoutes from './routes/ai.routes.js'

app.use("/api/user-resumes", userRoutes)
app.use("/api/ai", aiRoutes);

export  {app};
