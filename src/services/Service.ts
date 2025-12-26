

export default interface Service{
      createBooking(bookign:any) : Promise<any>;
      getAllBooking(): Promise<any[]>;
      updateBooking(id:string,body:any,flag:boolean): Promise<any>;
      deleteBooking(id:string):Promise<any>;
      bookingByID(id:string): Promise<any>;

}