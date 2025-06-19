export class RoomRepository {
    constructor() {
        this.rooms = [];
    }
    addRoom(room)
    {
        this.rooms.push(room);
    }
    getRoomById(roomId)
    {
        return this.rooms.find(r => r.id === roomId);
    }
    getAllRooms()
    {
        return this.rooms;
    }
}