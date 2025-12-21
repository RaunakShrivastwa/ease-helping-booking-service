import Service from "./Service";
import Booking from "../models/Booking";

class ServiceImpl implements Service {

    async bookingByID(id: string): Promise<any> {
        try{
            return await Booking.findById(id);
        }catch(err){
            return err;
        }
    }
    
    async createBooking(body: any) {
        try {
            return await Booking.create(body);
        } catch (err) {
            return err;
        }
    }

    async getAllBooking(): Promise<any[]> {
        try {
            return await Booking.find({}).sort(); // Adjust sorting based on the field(s) you want
        } catch (err) {
            return err;
        }
    }

    async updateBooking(id: string, body: any): Promise<any> {
        try {
            const updatedBooking = await Booking.findByIdAndUpdate(id, body, {
                new: true, // return the updated document
                runValidators: true, // run the validators on the updated data
            });
            return updatedBooking;
        } catch (err) {
            return err;
        }
    }

    async deleteBooking(id: string): Promise<any> {
        try {
            const deletedBooking = await Booking.findByIdAndDelete(id);
            return deletedBooking;
        } catch (err) {
            return err;
        }
    }
}

export default new ServiceImpl();
