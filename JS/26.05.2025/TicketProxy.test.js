import { createTicketProxy } from "./TicketProxy";
import { EventFactory } from "./EventFactory";
import {describe, expect, jest, test} from '@jest/globals';

describe('createTicketProxy test', ()=>
{
    const ticket = EventFactory.create('concert', 'concert 1', '2025-06-20', 400)
    test('admin getting price', ()=>
    {
        let proxy = createTicketProxy(ticket, 'admin')
        expect(proxy.price).toBe(400)
    })
    test('non admin getting price', ()=>
    {
        let proxy = createTicketProxy(ticket, 'user')
        expect(proxy.price).toBe('Access is restricted')
    })
    test('getting title, date and type', ()=>
    {
        let proxy = createTicketProxy(ticket, 'user')
        expect(proxy.date).toBe('2025-06-20')
        expect(proxy.title).toBe('concert 1')
        expect(proxy.type).toBe('concert')
    })
})
