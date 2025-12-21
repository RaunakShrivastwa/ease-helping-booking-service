import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/DB';
import { logger } from './utils/logger';
import producer from './event/producer';
import bookingRouter from './api/routes/bookingRouter';
dotenv.config();

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use('/api/v1/booking',bookingRouter);

app.listen(PORT,(err)=>{
    if(err){
        logger.error(`There is Error with Server ${err}`)
    }
    logger.info(`Server running on http://localhost:${PORT}`);
    connectDB();
    producer.connect();
})
