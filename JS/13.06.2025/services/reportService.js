
export class ReportService {
    constructor(bookingRepository, roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }
    generateReport(fromDate, toDate, roomId = null)
    {
        let bookings;
        bookings = this.bookingRepository.getAllBookings().filter(b =>
            b.status === 'confirmed' &&
            b.startTime >= fromDate &&
            b.endTime <= toDate &&
            (roomId === null || b.roomId === roomId)
        );

        const report = bookings.map(b => {
            const room = this.roomRepository.getRoomById(b.roomId);
            const durationInHours = (b.endTime - b.startTime) / 3600000;

            return {
                bookingId: b.id,
                roomName: room ? room.name : 'Unknown',
                userId: b.userId,
                from: b.startTime,
                to: b.endTime,
                durationInHours: durationInHours
            };
        });

        console.table(report);
        return report;
    }
}