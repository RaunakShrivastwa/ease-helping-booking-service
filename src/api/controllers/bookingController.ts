import { Request, Response } from "express";
import ServiceImpl from "../../services/ServiceImpl";
import producer from "../../event/producer";


class bookingController{

    async createBooking(req:Request,res:Response){
        try{
            let bookign = await ServiceImpl.createBooking(req.body);
            await producer.publishProfileEvent(bookign);
            return res.status(201).json({Bookign:bookign})
        }catch(err){
           return res.status(500).json({Message:`Internal Server Error`,Errro:err})
        }
    }

    async getAllBookign(req:Request,res:Response){
        try{
            return res.status(200).json(await ServiceImpl.getAllBooking());
        }catch(err){
            return res.status(500).json({Error:err})
        }
    }

    async updateBooking(req:Request,res:Response){
        try{
            let booking = await ServiceImpl.updateBooking(req.params.id,req.body);
             if(!booking){
                return res.status(404).json({Error:`Booking Not found with ids ${req.params.id}`})
            }
              return res.status(200).json({Message:`Booking updated Successfully with ids ${req.params.id}`,BookingInfo:booking});
        }catch(err){
            return res.status(500).json({Error:err});
        }
    }

    async deleteBooking(req:Request,res:Response){
        try{
            let booking = await ServiceImpl.deleteBooking(req.params.id);
             if(!booking){
                return res.status(404).json({Error:`Booking Not found with ids ${req.params.id}`})
            }
            return res.status(200).json({Message:`Booking Deleted Successfully with ids ${req.params.id}`,BookingInfo:booking});
        }catch(err){
            return res.status(500).json({Error:err});
        }
    }

    async bookingByID(req:Request,res:Response){
        try{
            let booking = await ServiceImpl.bookingByID(req.params.id);
            if(!booking){
                return res.status(404).json({Error:`Booking Not found with ids ${req.params.id}`})
            }
            return res.status(200).json({Message:`Booking Fetch Successfully with ids ${req.params.id}`,BookingInfo:booking});
        }catch(err){
            return res.status(500).json({Error:err})
        }
    }
}

export default new bookingController();