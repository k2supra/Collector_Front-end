/**
 * @jest-environment jsdom
 */


import {renderer} from './main';
import { TicketFacade } from './TicketFacade';
import {beforeEach, describe, expect, jest} from '@jest/globals';



describe('renderEvents test', ()=>
{
    test(`adding new DOM elements`, ()=>
    {
        document.body.innerHTML = `<div id="event-container"></div>`;
        const events = [
            TicketFacade.createAndLogEvent('concert', 'Concert 1', `2025-05-20`, 300),
            TicketFacade.createAndLogEvent('theatre', 'Theatre 1', `2025-03-20`, 450),
            TicketFacade.createAndLogEvent('concert', 'Concert 2', `2025-05-20`, 550),
        ]

        renderer(events);
        
        const rendered = document.querySelectorAll('.event');
        expect(rendered.length).toBe(3);
        expect(rendered[0].innerHTML).toContain('Concert 1');
    })
})