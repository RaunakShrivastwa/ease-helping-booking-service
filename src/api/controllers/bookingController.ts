import { Request, Response } from "express";
import ServiceImpl from "../../services/ServiceImpl";
import producer from "../../event/producer";
import jwt from 'jsonwebtoken';
import key from "../../utils/key";


class bookingController {

    async createBooking(req: Request, res: Response) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            let user = jwt.verify(token, await key.getPublicKey());
            req.body.userId = user.sub;
            let bookign = await ServiceImpl.createBooking(req.body);
            await producer.publishProfileEvent(bookign);
            return res.status(201).json({ Bookign: bookign })
        } catch (err) {
            return res.status(500).json({ Message: `Internal Server Error`, Errro: err })
        }
    }

    async getAllBookign(req: Request, res: Response) {
        try {
            return res.status(200).json(await ServiceImpl.getAllBooking());
        } catch (err) {
            return res.status(500).json({ Error: err })
        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            let booking = await ServiceImpl.updateBooking(req.params.id, req.body);
            if (!booking) {
                return res.status(404).json({ Error: `Booking Not found with ids ${req.params.id}` })
            }
            return res.status(200).json({ Message: `Booking updated Successfully with ids ${req.params.id}`, BookingInfo: booking });
        } catch (err) {
            return res.status(500).json({ Error: err });
        }
    }

    async deleteBooking(req: Request, res: Response) {
        try {
            let booking = await ServiceImpl.deleteBooking(req.params.id);
            if (!booking) {
                return res.status(404).json({ Error: `Booking Not found with ids ${req.params.id}` })
            }
            return res.status(200).json({ Message: `Booking Deleted Successfully with ids ${req.params.id}`, BookingInfo: booking });
        } catch (err) {
            return res.status(500).json({ Error: err });
        }
    }

    async bookingByID(req: Request, res: Response) {
        try {
            let booking = await ServiceImpl.bookingByID(req.params.id);
            console.log("bookign", booking);

            if (!booking) {
                return res.status(404).json({ Error: `Booking Not found with ids ${req.params.id}` })
            }
            return res.status(200).json({ Message: `Booking Fetch Successfully with ids ${req.params.id}`, BookingInfo: booking });
        } catch (err) {
            return res.status(500).json({ Error: err })
        }
    }

    async acceptBookign(req: Request, res: Response) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            console.log(token);

            let user: any = jwt.verify(token, await key.getPublicKey());
            if (user.role !== 'PROVIDER') {
                return res.status(403).json({ Message: 'You dont have permission to accept this booking, Plz update Your Profile' })
            } else {
                let booking = await ServiceImpl.bookingByID(req.params.id);

                if (!booking) {
                    return res.status(404).json({ Message: `Booking not found with id ${req.params.id}` });
                }
                if (booking.status === 'PENDING') {
                    booking.status = "CONFIRM";
                    booking.providerID = user.sub;
                    booking.save();
                    return res.status(201).json({ Message: `Booking Confirmed by providerID` })

                } else {
                    return res.status(409).json({ Message: 'Booking Alredy confirmed By Other Provider' })
                }
            }


        } catch (err) {
            return res.status(500).json({ Error: err })
        }
    }
}

export default new bookingController();