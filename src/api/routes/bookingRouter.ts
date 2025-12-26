import { Router } from "express";
import bookingController from "../controllers/bookingController";


class BookingRouter{
    public router : Router;

    constructor(){
        this.router = Router();
        this.initRoutes();
    }

    initRoutes(){
        this.router.post("/create",bookingController.createBooking);
        this.router.get('/get/all/created/bookings',bookingController.getAllBookign);
        this.router.put('/update/resource/:id',bookingController.updateBooking);
        this.router.delete("/delete/bookingby/:id",bookingController.deleteBooking);
        this.router.get('/find/bookingby/:id',bookingController.bookingByID);
        this.router.patch('/accept/booking/:id',bookingController.acceptBookign);
    }
}
export default new BookingRouter().router;

