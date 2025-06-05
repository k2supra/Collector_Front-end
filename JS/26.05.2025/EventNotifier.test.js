import { EventNotifier } from "./EventNotifier.js";
import {jest} from '@jest/globals';


describe(`EventNotifier`, ()=>
{
    let notifier;
    beforeEach(()=> notifier = new EventNotifier);
    test(`adding new subscriber`, ()=>
    {
        const subscriber = jest.fn();
        notifier.subscribe(subscriber);
        expect(notifier.subscribers.length).toBe(1)
    })
    test(`calling all subscribers`, ()=>
    {
        const subscriber1 = jest.fn();
        const subscriber2 = jest.fn();
        notifier.subscribe(subscriber1);
        notifier.subscribe(subscriber2);

        const event = {title: 'concert'};

        notifier.notify(event);

        expect(subscriber1).toHaveBeenCalledWith(event);
        expect(subscriber2).toHaveBeenCalledWith(event);
    })
    test(`no subscribers`, ()=>
    {
        expect(()=>notifier.notify({title: 'Empty'})).not.toThrow()
    })
})