export class EventNotifier{
    constructor(){
        this.subscribers =[]    
    }
    subscribe(fn){
        this.subscribers.push(fn)
    }
    notify(event){
        this.subscribers.forEach(fn=> fn(event))
    }
}