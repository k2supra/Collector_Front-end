import { TicketFacade } from './TicketFacade.js'
import {applySort, sortByPrice, sortByType, sortByDate, sortByTitle} from './SortStrategy.js'
import { EventNotifier } from './EventNotifier.js'
import {createTicketProxy} from './TicketProxy.js'
import { logExecution } from './decorators.js'
import { newAPIAdapter } from './apiAdapter.js'

TicketFacade.loginUser({name: 'Bob', role: 'user'});

const events = [
    TicketFacade.createAndLogEvent('concert', 'Concert 1', `2025-05-20`, 300),
    TicketFacade.createAndLogEvent('theatre', 'Theatre 1', `2025-03-20`, 450),
    TicketFacade.createAndLogEvent('concert', 'aa concert', `2025-05-20`, 550),
]

const notifier = new EventNotifier;
notifier.subscribe(event => alert(`New event ***${event.title}***`))

function renderEvents(eventList) {
    let container = document.querySelector('#event-container');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'event-container';
        document.body.appendChild(div);
        container = document.querySelector('#event-container');
    }
    else
    {
        container.innerHTML = '';
    } 

    eventList.forEach(e =>
    {
        const userTicket = createTicketProxy(e, 'admin');
        
        container.insertAdjacentHTML('beforeend', 
            `
                <div class='event'>
                    <h3>${e.title}</h3>
                    <p>Date: ${e.date}</p>
                    <p>Price: ${userTicket.price}</p>
                </div>
            `
        )
    }
    )
}

export let renderer = renderEvents;

function renderEventsSortedByPrice() {
    const sorted = applySort(events, sortByPrice);
    renderEvents(sorted);
}
function sortBy(fn) {
    const sorted = applySort(events, fn);
    renderEvents(sorted);
}

function addNewEvent() {
    const newEvent = TicketFacade.createAndLogEvent('theatre', 'Theatre 2', '2025-08-19', 560);
    events.push(newEvent);
    notifier.notify(newEvent);
    renderEvents(events);
}

renderEvents(events);


function sortEvents(str) {
    switch (str) {
        case 'price':
            sortBy(sortByPrice);
            break;
        case 'date':
            sortBy(sortByDate);
            break;
        case 'type':
            sortBy(sortByType);
            break;
        case 'title':
            sortBy(sortByTitle);
            break;
        default:
            break;
    }
}

// document.getElementById('byPrice').addEventListener('click', () => {sortEvents('price');});
// document.getElementById('byTitle').addEventListener('click', () => {sortEvents('title')});
// document.getElementById('byDate').addEventListener('click', () => {sortEvents('date')});
// document.getElementById('byType').addEventListener('click', () => {sortEvents('type')});
// document.getElementById('createEvent').addEventListener('click', () => {events.push(TicketFacade.createAndLogEvent('concert', 'tt concert', `2025-05-20`, 550)); renderEvents(events);});

function initEventListeners() {
    document.getElementById('byPrice')?.addEventListener('click', () => { sortEvents('price'); });
    document.getElementById('byTitle')?.addEventListener('click', () => { sortEvents('title'); });
    document.getElementById('byDate')?.addEventListener('click', () => { sortEvents('date'); });
    document.getElementById('byType')?.addEventListener('click', () => { sortEvents('type'); });
    document.getElementById('createEvent')?.addEventListener('click', () => {
        events.push(TicketFacade.createAndLogEvent('concert', 'tt concert', `2025-05-20`, 550));
        renderEvents(events);
    });
}
initEventListeners()