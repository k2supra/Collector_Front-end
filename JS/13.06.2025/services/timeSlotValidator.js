import { InMemoryBooking } from "../repositories/memoryBooking.js";
var _ = undefined;

export class TimeSlotValidator {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    isAvailable(roomId, startTime, endTime)
    {
        const conflicts = this.bookingRepository.findConflict(roomId, startTime, endTime)
        return conflicts.length === 0;
    }
}

export class MaxDurationValidator {
    constructor(maxHours) {
        this.maxHours = maxHours * 60 * 60 * 1000;
    }
    isAvailable(_, startTime, endTime)
    {
        return (endTime - startTime) <= this.maxHours;
    }
}
export class WeekendValidator {
    isAvailable(_, startTime)
    {
        const day = startTime.getDay();
        return day !== 0 && day !== 6
    }
}
export class MaxBookingsPerDayValidator {
    constructor(bookingRepository, requestedUserId, targetDate, maxBookingsPerDay = 2) {
        this.bookingRepository = bookingRepository;
        this.requestedUserId = requestedUserId;
        this.targetDate = targetDate;
        this.maxBookingsPerDay = maxBookingsPerDay;
    }
    isAvailable()
    {
        return this.bookingRepository.getAllBookings().filter(b => 
            b.userId === this.requestedUserId &&
            b.userId === this.requestedUserId && 
            b.status === 'confirmed' &&
            this.#isSameDay(b.startTime, this.targetDate)
        ).length < this.maxBookingsPerDay;
    }
    #isSameDay(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }
}

export class HolidayValidator {
    constructor(args = [])
    {
        this.holidays = args;
    }
    isAvailable(_, startTime)
    {
        return !this.holidays.find(d => this.#isSameDay(d, startTime));
    }
    #isSameDay(d1, d2) {
        const date1 = d1;
        const date2 = d2;
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }
}