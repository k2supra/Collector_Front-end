import {InMemoryBooking} from './repositories/memoryBooking.js'
import {RoomRepository} from './repositories/room.js'
import {TimeSlotValidator} from './services/timeSlotValidator.js'
import {BookingManager} from './services/bookingManager.js'
import {Logger} from './utils/logger.js'
import {Room} from './models/room.js'
import {ReportService} from './services/reportService.js'
import {NotificationService} from './services/notification.js' 
import { MaxBookingsPerDayValidator } from './services/timeSlotValidator.js'
import { HolidayValidator } from './services/timeSlotValidator.js'
import { FileLogger } from './utils/logger.js'
import { BrowserFileLogger } from './utils/logger.js'

const bookingRepository = new InMemoryBooking;

const roomRepository = new RoomRepository;

const validator = new TimeSlotValidator(bookingRepository);
const validatorMaxBookingsPerDate = new MaxBookingsPerDayValidator(bookingRepository, 999, `2025-06-09`, 3);
const holidayValidator = new HolidayValidator([new Date('2025-01-01'), new Date('2025-08-24')]);

const logger = new Logger;
const fileLogger = new FileLogger(`./logs.log`); // for node.js
const browserFileLogger = new BrowserFileLogger('logs.txt')

const notifier = new NotificationService;

const manager = new BookingManager(bookingRepository, validator, logger, notifier);
const manager2 = new BookingManager(bookingRepository, validatorMaxBookingsPerDate, logger, notifier);
const manager3 = new BookingManager(bookingRepository, holidayValidator, browserFileLogger, notifier);

const reportService = new ReportService(bookingRepository, roomRepository);



const room = new Room(123, 'Room 1', 20);
roomRepository.addRoom(room);
const room2 = new Room(124, 'Room 2', 20);
roomRepository.addRoom(room2);
const room3 = new Room(125, 'Room 3', 20);
roomRepository.addRoom(room3);
try {
    const booking = manager.createBooking(
        {
            roomId: 123,
            userId: 999,
            startTime: '2025-06-09T10:00:00',
            endTime: '2025-06-09T11:00:00',
        }
    )
    
    manager.confirmBooking(booking.id);
    console.log('Booking finished');    
    const report = reportService.generateReport(new Date('2025-06-08T00:00:00'), new Date('2025-06-10T11:00:00'))
    console.log(`Report: `, report);


    const booking2 = manager.createBooking(
        {
            roomId: 124,
            userId: 999,
            startTime: '2025-06-09T10:00:00',
            endTime: '2025-06-09T11:00:00',
        }
    )
    manager.confirmBooking(booking2.id);
    console.log('Booking finished');    
    const report2 = reportService.generateReport(new Date('2025-06-08T00:00:00'), new Date('2025-06-10T11:00:00'))
    console.log(`Report: `, report2);

    
    const booking3 = manager2.createBooking(
        {
            roomId: 125,
            userId: 999,
            startTime: '2025-06-09T15:00:00',
            endTime: '2025-06-09T18:00:00',
        }
    )

    manager2.confirmBooking(booking3.id);
    console.log('Booking finished');    
    const report3 = reportService.generateReport(new Date('2025-06-08T00:00:00'), new Date('2025-06-11T11:00:00'))
    console.log(`Report: `, report3);


    const booking4 = manager3.createBooking(
        {
            roomId: 125,
            userId: 999,
            startTime: '2025-01-02T00:00:00', // '2025-01-01T00:00:00' - error
            endTime: '2025-06-09T18:00:00',
        }
    )

    manager3.confirmBooking(booking4.id);
    console.log('Booking finished');    
    const report4 = reportService.generateReport(new Date('2024-06-08T00:00:00'), new Date('2025-10-11T11:00:00'), 125)
    console.log(`Report: `, report4);
} catch (error) {
    console.error('!!!!!!!!!!!!!!!!', error);
}

document.querySelector('#downloadLOGS').addEventListener('click', () => {
    browserFileLogger.downloadLOGS();
});