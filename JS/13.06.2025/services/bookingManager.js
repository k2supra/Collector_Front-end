import { Booking } from "../models/booking.js";

var _ = undefined;

export class BookingManager {
    constructor(bookingRepository, validator, logger, notifier) {
        this.bookingRepository = bookingRepository;
        this.validator = validator;
        this.logger = logger;
        this.notifier = notifier;
    }
    createBooking(data)
    {
        const {roomId, userId, startTime, endTime} = data;

        if(!this.validator.isAvailable(roomId, new Date(startTime), new Date(endTime)))
        {
            this.logger.error('Time slot conflict');
            throw new Error('Time slot is not available')
        }
        
        const booking = new Booking(
                Date.now().toString(),
                userId,
                _,
                roomId,
                startTime,
                endTime
        )
        this.bookingRepository.addBooking(booking);
        this.logger.info(`Booking created ${booking.id}`);
        this.notifier.notify(booking.userId, `Your booking ${booking.id} was created`);
        return booking;
    }
    confirmBooking(bookingId)
    {
        const booking = this.bookingRepository.getAllBookings().find(b=>b.id===bookingId)
        if (booking) {
            booking.confirm()
            this.logger.info(`Booking confirmed ${bookingId}`);
            this.notifier.notify(booking.userId, `Your booking ${booking.id} was confirmed`);
        }
    }
    cancelBooking(bookingId)
    {
        const booking = this.bookingRepository.getAllBookings().find(b=>b.id===bookingId)
        if (booking) {
            booking.cancel()
            this.logger.info(`Booking cancelled ${bookingId}`);
            this.notifier.notify(booking.userId, `Your booking ${booking.id} was cancelled`);
        }
    }
}