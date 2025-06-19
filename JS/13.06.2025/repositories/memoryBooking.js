import { IBooking } from "./iBooking.js";

export class InMemoryBooking extends IBooking {
    constructor() {
        super();
        this.bookings=[];
    }
    getAllBookings()
    {
        return this.bookings;
    }
    addBooking(booking)
    {
        this.bookings.push(booking);
    }
    findConflict(roomId, startTime, endTime)
    {
        return this.bookings.filter(b => 
            b.roomId === roomId && 
            b.status !== 'canceled' && 
            (
                (b.startTime <= startTime && b.endTime > startTime) ||
                (b.startTime < endTime && b.endTime >= endTime) ||
                (b.startTime >= startTime && b.endTime <= endTime)
            )
        );
    }
}