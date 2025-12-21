import {Document } from "mongoose";

interface IBooking extends Document {
  userId: string;
  status?: string;
  category?: string;
  location?: string;
  scheduleAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IBooking;