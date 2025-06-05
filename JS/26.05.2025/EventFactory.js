class Concert{
    constructor(title, date, price){
        this.type = 'concert';
        this.title = title;
        this.date = date;
        this.price = price
    }
}

class Theatre{
    constructor(title, date, price){
        this.type = 'theatre';
        this.title = title;
        this.date = date;
        this.price = price
    }
}

export class EventFactory{
    static create(type, title, date, price){
        switch(type){
            case'concert': return new Concert(title, date, price);
            case'theatre': return new Theatre(title, date, price);
            default: throw new Error('unknown event type')
        }
    }
    static editEvent(event, newTitle, newDate, newPrice)
    {
        if (!event) {
            throw new Error('unknown event');
        }
        if (newTitle) {
            event['title'] = newTitle
        }
        if (newDate) {
            event['date'] = newDate
        }
        if (newPrice) {
            event['price'] = newPrice
        }
    }
    static deleteEvent(event)
    {
        event = null
        return;
    }
}
