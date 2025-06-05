import { EventFactory } from "./EventFactory.js";
import { logger } from "./Logger.js";
import { UserStore } from "./UserStore.js";

export const TicketFacade = {
    createAndLogEvent(type, title, date, price){
        const event = EventFactory.create(type, title, date, price);
        logger.log(`Created event ${event.title}`)
        return event
    },
    loginUser(userData){
        UserStore.setUser(userData);
        logger.log(`User ${userData.name} loggined`)
    },
    buyTicket(user, event)
    {
        user.buyTicket(event);
        logger.log(`User ${user.name} bought ticket for ${event.title}`);
    },
    returnTicket(user, event)
    {
        user.returnTicket(event);
        logger.log(`User ${user.name} returned ticket for ${event.title}`);
    }
}