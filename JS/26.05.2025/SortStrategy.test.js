import { applySort, sortByType, sortByTitle, sortByDate, sortByPrice } from "./SortStrategy";
import {describe, expect, jest, test} from '@jest/globals';
import { EventFactory } from "./EventFactory";

describe('sort tests', ()=>
{
    const ev1 = EventFactory.create('theatre', 'theatre 1', '2025-06-17', 300);
    const ev2 = EventFactory.create('theatre', 'theatre 2', '2025-05-23', 400);
    const ev3 = EventFactory.create('theatre', 'theatre 3', '2025-06-15', 350);
    const ev4 = EventFactory.create('concert', 'concert 1', '2025-08-17', 250);
    const ev5 = EventFactory.create('concert', 'concert 2', '2026-06-17', 300);

    test(`sort by price`, ()=>
    {
        expect(applySort([ev1, ev2, ev3, ev4, ev5], sortByPrice)).toEqual([ev4, ev1, ev5, ev3, ev2])
    })
    test(`sort by title`, ()=>
    {
        expect(applySort([ev1, ev2, ev3, ev4, ev5], sortByTitle)).toEqual([ev4, ev5, ev1, ev2, ev3])
    })
    test(`sort by date`, ()=>
    {
        expect(applySort([ev1, ev2, ev3, ev4, ev5], sortByDate)).toEqual([ev2, ev3, ev1, ev4, ev5])
    })
})