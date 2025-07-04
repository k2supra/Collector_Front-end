var _ = undefined;

let chartContainer = document.querySelector('.graphic .frame .graph');

const chartDataWeek = 
{
    labels:['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San', ''],
    datasets:[
        {
            label:'Users', 
            data: [50, 65, 80, 2, 75, 37, 47, 52, 60],
            backgroundColor: 'white',
            borderColor: 'purple',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 3,
            pointRadius: [0, 4, 4, 4, 4, 4, 4, 4, 0],
            pointHoverRadius: 6,
            borderWidth: 2,
            tension: 0.4
        }
    ]
}
const chartDataMonth = 
{
    labels:['', 'Week 1', 'Week 2', 'Week 3', 'Week 4', ''],
    datasets:[
        {
            label:'Users', 
            data: [10, 17, 80, 68, 39, 37],
            backgroundColor: 'white',
            borderColor: 'purple',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 3,
            pointRadius: [0, 4, 4, 4, 4, 0],
            pointHoverRadius: 6,
            borderWidth: 2,
            tension: 0.4
        }
    ]
}
const chartDataYear = 
{
    labels:['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
    datasets:[
        {
            label:'Users', 
            data: [10, 17, 80, 68, 39, 37, 86, 3, 47, 56, 11, 45, 95, 45],
            backgroundColor: 'white',
            borderColor: 'purple',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 3,
            pointRadius: [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
            pointHoverRadius: 6,
            borderWidth: 2,
            tension: 0.4
        }
    ]
}

let currentGraphic = chartDataWeek;

function changeChartSpread(newType) {
    switch (newType) {
        case 'week':
            currentGraphic = chartDataWeek;
            break;
        case 'month':
            currentGraphic = chartDataMonth;
            break;
        case 'year':
            currentGraphic = chartDataYear;
            break;
        default:
            break;
    }
}

function updateGraphFromData(graphLink, dataArray) {
    const bars = graphLink.querySelector('.vertical_bars');
    const labels = graphLink.querySelector('.bottom_text ul');

    bars.innerHTML = '';
    labels.innerHTML = '';

    dataArray.forEach(data => {
        const bar = document.createElement('div');
        bar.className = 'vertical_bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.height = `${data.heightValue}%`;

        bar.appendChild(progress);
        bars.appendChild(bar);

        const label = document.createElement('li');
        label.textContent = data.labelText;
        labels.appendChild(label);
    });
}

function setMWCChart(type) {
    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionLabels'>
            <div>Items</div>
            <div style='margin-top:15px'>value</div>
            <div style='margin-top:25px'>label</div>
        </div>`)
    dataSettingsModalWindow.insertAdjacentHTML('beforeend', `<ul class='settingsList'></ul>`)
    for (let i = 1; i < currentGraphic.labels.length-1; i++) {
        dataSettingsModalWindow.querySelector('ul').insertAdjacentHTML(`beforeend`, `
            <li data-index='${i}' draggable="true">
                <div class='dragMe' draggable="true"><img src='./images/drag.png'></div>
                <div class='dataSettingSection' data-index='${i}'>
                    <input type='text' value='${currentGraphic.datasets[0].data[i]}' id='dataSettingsValue'>
                    <input type='text' value='${currentGraphic.labels[i]}' id='dataSettingsLabel'>
                </div>
            </li>
        `)
    }
    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionControls'>
            <button class='removeSectionButton'><img src='./images/bin.png'></button>
            <button class='addSectionButton'>+</button>
            </div>`
        )
    const dragMeButtons = dataSettingsModalWindow.querySelectorAll('.dragMe');
    const removeSectionButton = dataSettingsModalWindow.querySelector('.removeSectionButton');
    let draggedElement = null;

    removeSectionButton.addEventListener('dragover', (e)=>
    {
        e.preventDefault();
        removeSectionButton.classList.add('active-drop')
    })
    removeSectionButton.addEventListener('dragleave', ()=>
    {
        removeSectionButton.classList.remove('active-drop');
    })
    removeSectionButton.addEventListener('drop', (e)=>
    {
        e.preventDefault();
        if (!draggedElement) return;

        const index = +draggedElement.dataset.index;

        currentGraphic.labels.splice(index, 1);
        currentGraphic.datasets[0].data.splice(index, 1);
        currentGraphic.datasets[0].pointRadius.splice(index, 1);
        
        createChart(selectChartType.value, chartContainer);
        updateModalWindowContent(type);
    })

    /* Переміщення за "ручкою" dragMe елементом */
    dragMeButtons.forEach(btn =>
    {
        btn.addEventListener('dragstart', (e)=>
        {
            draggedElement = e.target.closest('li');
            removeSectionButton.style.height = '40px'
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', e.target.closest('li').dataset.index);
        })
        btn.addEventListener('dragover', (e)=>
        {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        })
        btn.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedElement === e.target.closest('li')) return;

            const draggedIndex = +draggedElement.dataset.index;
            const targetIndex = +e.target.closest('li').dataset.index;

            // ⚡️ Переміщення DOM
            const list = e.target.closest('li').parentElement;
            if (draggedIndex < targetIndex) {
                list.insertBefore(draggedElement, e.target.closest('li').nextSibling);
            } else {
                list.insertBefore(draggedElement, e.target.closest('li'));
            }

            // ⚡️ Переміщення у даних
            const move = (arr, from, to) => {
                const item = arr.splice(from, 1)[0];
                arr.splice(to, 0, item);
            };

            move(currentGraphic.labels, draggedIndex, targetIndex);
            move(currentGraphic.datasets[0].data, draggedIndex, targetIndex);
            move(currentGraphic.datasets[0].pointRadius, draggedIndex, targetIndex);

            // 🔁 Оновлення
            createChart(selectChartType.value, chartContainer);
            updateModalWindowContent(type);
        });
        btn.addEventListener('dragend', () => {
            draggedElement.classList.remove('dragging');
            removeSectionButton.style.height = '0px'
            draggedElement = null;
        });
    }
    )
    document.addEventListener('mouseup', () => {
        dragMeButtons.forEach(e => e.classList.remove('dragging'));
    });

    dataSettingsModalWindow.querySelector(`button.addSectionButton`).addEventListener('click', ()=>
    {
        const index = currentGraphic.labels.length-1;
        
        currentGraphic.labels.splice(index, 0, 'temp');
        currentGraphic.datasets[0].data.splice(index, 0, 50);
        currentGraphic.datasets[0].pointRadius.splice(index, 0, 4)
        createChart(_, chartContainer);
        updateModalWindowContent(type);
    })

    dataSettingsModalWindow.querySelectorAll('#dataSettingsValue').forEach(element =>
    {
        element.addEventListener('input', (event)=>
        {
            const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
            changeChartData('value', index, event.target.value);
            createChart(selectChartType.value, chartContainer);
        });
    });
        
    dataSettingsModalWindow.querySelectorAll('#dataSettingsLabel').forEach(element =>
    {
        element.addEventListener('input', (event)=>
        {
            const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
            changeChartData('label', index, event.target.value);
            createChart(selectChartType.value, chartContainer);
        });
    });
}
function setMWCGraph(graphLink) {
    const data = graphLink.querySelectorAll('.vertical_bars .progress');
    const labels = graphLink.querySelectorAll('.bottom_text li');

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionLabels'>
            <div>Items</div>
            <div style='margin-top:15px'>value</div>
            <div style='margin-top:25px'>label</div>
        </div>`)
    dataSettingsModalWindow.insertAdjacentHTML('beforeend', `<ul class='settingsList'></ul>`)

    const currentGraphData = [];

    for (let i = 0; i < data.length; i++) {
        // 🟡 Отримуємо hXX клас і парсимо значення
        const hClass = [...data[i].classList].find(c => /^h\d+$/.test(c));
        const heightValue = hClass ? parseInt(hClass.slice(1)) : parseInt(data[i].style.height) || 0;

        const labelText = labels[i].textContent.trim();

        currentGraphData.push({ heightValue, labelText });

        dataSettingsModalWindow.querySelector('ul').insertAdjacentHTML(`beforeend`, `
            <li data-index='${i}' draggable="true">
                <div class='dragMe' draggable="true"><img src='./images/drag.png'></div>
                <div class='dataSettingSection' data-index='${i}'>
                    <input type='text' value='${heightValue}' id='dataSettingsValue'>
                    <input type='text' value='${labelText}' id='dataSettingsLabel'>
                </div>
            </li>
        `);
    }

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionControls'>
            <button class='removeSectionButton'><img src='./images/bin.png'></button>
            <button class='addSectionButton'>+</button>
            </div>`
        )

    const removeSectionButton = dataSettingsModalWindow.querySelector('.removeSectionButton');
    const dragMeButtons = dataSettingsModalWindow.querySelectorAll('.dragMe');
    let draggedElement = null;

    dragMeButtons.forEach(btn => {
        btn.addEventListener('dragstart', (e) => {
            draggedElement = e.target.closest('li');
            removeSectionButton.style.height = '40px';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedElement.dataset.index);
        });

        btn.addEventListener('dragover', e => e.preventDefault());

        btn.addEventListener('drop', (e) => {
            e.preventDefault();
            const targetElement = e.target.closest('li');
            if (draggedElement === targetElement) return;

            const draggedIndex = +draggedElement.dataset.index;
            const targetIndex = +targetElement.dataset.index;

            const list = targetElement.parentElement;
            if (draggedIndex < targetIndex) {
                list.insertBefore(draggedElement, targetElement.nextSibling);
            } else {
                list.insertBefore(draggedElement, targetElement);
            }

            const item = currentGraphData.splice(draggedIndex, 1)[0];
            currentGraphData.splice(targetIndex, 0, item);

            updateGraphFromData(graphLink, currentGraphData);
            const listItems = dataSettingsModalWindow.querySelectorAll('.settingsList li');
            listItems.forEach((li, i) => {
                li.dataset.index = i;
                li.querySelector('.dataSettingSection').dataset.index = i;
            });

            // 🔁 Перевішуємо input події
            dataSettingsModalWindow.querySelectorAll('#dataSettingsValue').forEach(element => {
                element.oninput = (event) => {
                    const index = +event.target.closest(`.dataSettingSection`).dataset.index;
                    const newVal = +event.target.value || 0;
                    currentGraphData[index].heightValue = newVal;
                    updateGraphFromData(graphLink, currentGraphData);
                };
            });
            dataSettingsModalWindow.querySelectorAll('#dataSettingsLabel').forEach(element => {
                element.oninput = (event) => {
                    const index = +event.target.closest(`.dataSettingSection`).dataset.index;
                    const newLabel = event.target.value.trim();
                    currentGraphData[index].labelText = newLabel;
                    updateGraphFromData(graphLink, currentGraphData);
                };
            });
        });

        btn.addEventListener('dragend', () => {
            removeSectionButton.style.height = '0px';
            draggedElement = null;
        });
    });

    document.addEventListener('mouseup', () => {
        dragMeButtons.forEach(e => e.classList.remove('dragging'));
    });

    dataSettingsModalWindow.querySelectorAll('#dataSettingsValue').forEach(element => {
        element.addEventListener('input', (event) => {
            const index = +event.target.closest(`.dataSettingSection`).dataset.index;
            const newVal = +event.target.value || 0;
            currentGraphData[index].heightValue = newVal;
            updateGraphFromData(graphLink, currentGraphData);
        });
    });

    // Input: LABEL
    dataSettingsModalWindow.querySelectorAll('#dataSettingsLabel').forEach(element => {
        element.addEventListener('input', (event) => {
            const index = +event.target.closest(`.dataSettingSection`).dataset.index;
            const newLabel = event.target.value.trim();
            currentGraphData[index].labelText = newLabel;
            updateGraphFromData(graphLink, currentGraphData);
        });
    });

    // Remove
    removeSectionButton.addEventListener('dragover', (e) => {
        e.preventDefault();
        removeSectionButton.classList.add('active-drop');
    });
    removeSectionButton.addEventListener('dragleave', () => {
        removeSectionButton.classList.remove('active-drop');
    });
    removeSectionButton.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedElement) return;

        const index = +draggedElement.dataset.index;
        currentGraphData.splice(index, 1);
        updateGraphFromData(graphLink, currentGraphData);
        updateModalWindowContent('graph', graphLink);
    });

    const addSectionBtn = dataSettingsModalWindow.querySelector('.addSectionButton');

    addSectionBtn.addEventListener('click', () => {
        // ➕ додаємо в об'єкт даних
        currentGraphData.push({ heightValue: 50, labelText: 'new' });

        // 🔄 оновлюємо графік і модалку
        updateGraphFromData(graphLink, currentGraphData);
        updateModalWindowContent('graph', graphLink);
    });
}

function addInputListenersToItem(item) {
    const inputs = item.querySelectorAll('input[index]');
    inputs.forEach(input => {
        const [i, j] = input.getAttribute('index').split('+').map(Number);
        input.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
                data[i][j].style.height = `${value}%`;
            }
        });
    });
}

function setMWCSpecialGraph(graphLink)
{
    const dataContainers = graphLink.querySelectorAll(`.vertical_bars .vertical_bar .progress.h100.special-container`);
    const labels = graphLink.querySelectorAll(`.bottom_text li`);
    
    let data = {};
    for (let i = 0; i < dataContainers.length; i++) {
        data[i] = dataContainers[i].querySelectorAll('div');
    }

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionLabels'>
            <div>Items</div>
            <div style='margin-top:65px'>value</div>
            <div style='margin-top:75px'>label</div>
        </div>`)
    dataSettingsModalWindow.insertAdjacentHTML('beforeend', `<ul class='settingsList'></ul>`)
    
    const ul = dataSettingsModalWindow.querySelector('ul');

    for (let i = 0; i < dataContainers.length; i++) {
        ul.insertAdjacentHTML('beforeend', `<li data-index='${i}' draggable="true"><div class='dragMe' draggable="true"><img src='./images/drag.png'></div><div class='dataSettingSection' data-index='${i}'></div></li>`)
        for (let j = 0; j < data[i].length; j++) {
            const hClass = [...data[i][j].classList].find(c => /^h\d+$/.test(c));
            const heightValue = hClass ? parseInt(hClass.slice(1)) : parseInt(data[i].style.height) || 0;
            const color = [...data[i][j].classList].find(c => /(?<=\bbg-)[^\s]+/.test(c)).split('-')[1];
            ul.querySelector(`div[data-index='${i}']`).insertAdjacentHTML('afterbegin', `
                <input type='text' value='${heightValue}' id='dataSettingsValue' style='border-color: ${color}' index='${i}+${j}'>
                `)

            ul.querySelector(`input[index='${i}+${j}']`).addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                    data[i][j].style.height = `${value}%`;
                }
            });
        }

        ul.querySelector(`div[data-index='${i}']`).insertAdjacentHTML(`beforeend`, `<input type='text' value='${labels[Math.floor(i/4)].textContent}' id='dataSettingsLabel'>`)
    }

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionControls'>
            <button class='removeSectionButton'><img src='./images/bin.png'></button>
            <button class='addSectionButton'>+</button>
            </div>`
    ) 
    
    const removeSectionButton = dataSettingsModalWindow.querySelector('.removeSectionButton');

    let draggedItem = null;

    ul.querySelectorAll('li').forEach(item => {
        item.addEventListener('dragstart', e => {
            draggedItem = item;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.outerHTML);
            removeSectionButton.style.height = '40px';
            setTimeout(() => item.style.display = 'none', 0); // приховуємо тимчасово
        });
    
        item.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
    
        item.addEventListener('drop', e => {
            e.preventDefault();
            if (draggedItem !== item) {
                const draggedIndex = parseInt(draggedItem.dataset.index);
                const targetIndex = parseInt(item.dataset.index);
        
                // Перестановка HTML у списку
                item.insertAdjacentHTML('beforebegin', e.dataTransfer.getData('text/html'));
                const newItem = item.previousSibling;
                addInputListenersToItem(newItem); // слухачі інпутів
                draggedItem.remove();
        
                // Перестановка DOM-елементів графіка
                const bars = graphLink.querySelectorAll('.progress.h100.special-container');
                const parent = bars[0].parentNode;
        
                if (bars[draggedIndex] && bars[targetIndex]) {
                    parent.insertBefore(bars[draggedIndex], bars[targetIndex]);
                }
        
                // Перестановка label, якщо треба
                const labelElements = graphLink.querySelectorAll('.bottom_text li');
                const labelFrom = Math.floor(draggedIndex / 4);
                const labelTo = Math.floor(targetIndex / 4);
                if (labelFrom !== labelTo && labelElements[labelFrom] && labelElements[labelTo]) {
                    const labelParent = labelElements[0].parentNode;
                    labelParent.insertBefore(labelElements[labelFrom], labelElements[labelTo]);
                }
            }
        });
    
        item.addEventListener('dragend', () => {
            draggedItem.style.display = 'flex';
            // draggedItem = null;
            removeSectionButton.style.height = '0px';
        }); 
    });
    const removeButton = dataSettingsModalWindow.querySelector('.removeSectionButton');
    removeButton.addEventListener('dragover', (e) => {
        e.preventDefault();
        removeButton.classList.add('active-drop');
    });

    removeButton.addEventListener('dragleave', () => {
        removeButton.classList.remove('active-drop');
    });

    removeButton.addEventListener('drop', (e) => {
        e.preventDefault();
        removeButton.classList.remove('active-drop');

        if (!draggedItem) return;

        const indexToRemove = parseInt(draggedItem.dataset.index);
        
        // Видаляємо графік
        const allContainers = graphLink.querySelectorAll('.vertical_bars .vertical_bar .progress.h100.special-container');
        const barToRemove = allContainers[indexToRemove];
        if (barToRemove) barToRemove.remove();


        // Видаляємо елемент <li> з модалки
        draggedItem.remove();

        // 🔄 Перенумеровуємо всі li
        const allItems = dataSettingsModalWindow.querySelectorAll('.settingsList li');
        allItems.forEach((item, i) => {
            item.dataset.index = i;
            const section = item.querySelector('.dataSettingSection');
            if (section) section.dataset.index = i;
            const inputs = section.querySelectorAll("input[index]");
            inputs.forEach((inp, j) => {
                inp.setAttribute("index", `${i}+${j}`);
            });
        });

        draggedItem = null;
    });
}

function enableDragAndDrop(containerSelector, targetListSelector) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll('li');

    let draggedItem = null;

    items.forEach((item) => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => item.style.display = 'none', 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'flex';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        item.addEventListener('drop', function () {
            if (draggedItem !== this) {
                const allItems = Array.from(container.children);
                const draggedIndex = allItems.indexOf(draggedItem);
                const targetIndex = allItems.indexOf(this);

                if (draggedIndex < targetIndex) {
                    this.after(draggedItem);
                } else {
                    this.before(draggedItem);
                }

                // 🧠 ОНОВЛЕННЯ основної таблиці
                const tableList = document.querySelector(targetListSelector);
                const tableItems = tableList.querySelectorAll('li');
                const newOrder = Array.from(container.querySelectorAll('li')).map(li => +li.dataset.index);

                const updatedItems = Array.from(tableItems).map(el => el.cloneNode(true));
                tableList.innerHTML = '';
                newOrder.forEach(i => {
                    tableList.appendChild(updatedItems[i]);
                });

                // 🔄 Оновлюємо data-index у всіх
                container.querySelectorAll('li').forEach((li, newIndex) => {
                    li.dataset.index = newIndex;
                    const section = li.querySelector('.dataSettingSection');
                    if (section) section.dataset.index = newIndex;
                });
            }
        });
    });
}
function setupLiveSync(settingItem, index) {
    const titleInput = settingItem.querySelector('.dataSettingsTitle');
    const dateInput = settingItem.querySelector('.dataSettingsDate');
    const amountInput = settingItem.querySelector('.dataSettingsAmount');
    const statusSelect = settingItem.querySelector('.dataSettingsStatus');

    const updateOriginal = () => {
        const currentIndex = +settingItem.dataset.index;
        const originalLi = document.querySelector(`section.list ul.data > li:nth-child(${currentIndex + 1})`);
        const dateEl = originalLi.querySelector('.date');
        const amountEl = originalLi.querySelector('.amount');
        const statusEl = originalLi.querySelector('.status');

        originalLi.childNodes[0].nodeValue = titleInput.value + ' ';
        dateEl.textContent = dateInput.value;
        amountEl.textContent = amountInput.value;

        statusEl.classList.remove('pending', 'approved', 'rejected', 'complete', 'in-progress');
        statusEl.textContent = statusSelect.value;
        statusEl.classList.add('status', returnStatus(statusSelect.value));

        statusSelect.classList.remove('pending', 'approved', 'rejected', 'complete', 'in-progress');
        statusSelect.classList.add(returnStatus(statusSelect.value));
    };

    titleInput.addEventListener('input', updateOriginal);
    dateInput.addEventListener('input', updateOriginal);
    amountInput.addEventListener('input', updateOriginal);
    statusSelect.addEventListener('change', updateOriginal);
}
function setMWCList(graphLink) {
    // Уявімо, що цей код виконується після відкриття модалки
    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionLabels'>
            <div>Items</div>
            <div style='margin-top:15px'>name</div>
            <div style='margin-top:25px'>date</div>
            <div style='margin-top:25px'>amount</div>
            <div style='margin-top:25px'>status</div>
        </div>
    `);

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <ul class='settingsList' style='gap:100px'></ul>
    `);

    dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
        <div class='dataSettingSectionControls'>
            <button class='removeSectionButton'><img src='./images/bin.png'></button>
            <button class='addSectionButton'>+</button>
        </div>
    `);

    const returnStatus = (data) => {
        switch (data) {
            case 'In Progress': return 'in-progress';
            case 'Complete': return 'complete';
            case 'Pending': return 'pending';
            case 'Approved': return 'approved';
            case 'Rejected': return 'rejected';
            default: return '';
        }
    };

    function createStatusOptions(currentStatus) {
        const statuses = [
            { value: 'Pending', class: 'pending' },
            { value: 'Approved', class: 'approved' },
            { value: 'Rejected', class: 'rejected' },
            { value: 'Complete', class: 'complete' },
            { value: 'In Progress', class: 'in-progress' },
        ];

        return statuses.map(statusObj => {
            const selected = statusObj.value === currentStatus ? 'selected' : '';
            return `<option class="status ${statusObj.class}" value="${statusObj.value}" ${selected}>${statusObj.value}</option>`;
        }).join('');
    }

    function setupLiveSync(settingItem, index) {
        const titleInput = settingItem.querySelector('.dataSettingsTitle');
        const dateInput = settingItem.querySelector('.dataSettingsDate');
        const amountInput = settingItem.querySelector('.dataSettingsAmount');
        const statusSelect = settingItem.querySelector('.dataSettingsStatus');

        const updateOriginal = () => {
            const currentIndex = +settingItem.dataset.index;
            const originalLi = document.querySelector(`section.list ul.data > li:nth-child(${currentIndex + 1})`);
            const dateEl = originalLi.querySelector('.date');
            const amountEl = originalLi.querySelector('.amount');
            const statusEl = originalLi.querySelector('.status');

            originalLi.childNodes[0].nodeValue = titleInput.value + ' ';
            dateEl.textContent = dateInput.value;
            amountEl.textContent = amountInput.value;

            statusEl.classList.remove('pending', 'approved', 'rejected', 'complete', 'in-progress');
            statusEl.textContent = statusSelect.value;
            statusEl.classList.add('status', returnStatus(statusSelect.value));

            statusSelect.classList.remove('pending', 'approved', 'rejected', 'complete', 'in-progress');
            statusSelect.classList.add(returnStatus(statusSelect.value));
        };

        titleInput.addEventListener('input', updateOriginal);
        dateInput.addEventListener('input', updateOriginal);
        amountInput.addEventListener('input', updateOriginal);
        statusSelect.addEventListener('change', updateOriginal);
    }

    function enableDragAndDrop(containerSelector, targetListSelector) {
        const container = document.querySelector(containerSelector);
        const items = container.querySelectorAll('li');

        let draggedItem = null;

        items.forEach((item) => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
                setTimeout(() => item.style.display = 'none', 0);
            });

            item.addEventListener('dragend', () => {
                setTimeout(() => {
                    draggedItem.style.display = 'flex';
                    draggedItem = null;
                }, 0);
            });

            item.addEventListener('dragover', (e) => e.preventDefault());

            item.addEventListener('drop', function () {
                if (draggedItem !== this) {
                    const allItems = Array.from(container.children);
                    const draggedIndex = allItems.indexOf(draggedItem);
                    const targetIndex = allItems.indexOf(this);

                    if (draggedIndex < targetIndex) this.after(draggedItem);
                    else this.before(draggedItem);

                    const tableList = document.querySelector(targetListSelector);
                    const tableItems = tableList.querySelectorAll('li');
                    const newOrder = Array.from(container.querySelectorAll('li')).map(li => +li.dataset.index);

                    const updatedItems = Array.from(tableItems).map(el => el.cloneNode(true));
                    tableList.innerHTML = '';
                    newOrder.forEach(i => {
                        tableList.appendChild(updatedItems[i]);
                    });

                    container.querySelectorAll('li').forEach((li, newIndex) => {
                        li.dataset.index = newIndex;
                        const section = li.querySelector('.dataSettingSection');
                        if (section) section.dataset.index = newIndex;
                    });
                }
            });
        });
    }

    // Вставляємо на початку завантаження всі рядки
    const data = document.querySelectorAll('section.list ul.data > li');
    const settingsUl = document.querySelector('.settingsList');

    data.forEach((li, i) => {
        const name = li.childNodes[0].nodeValue.trim();
        const dateEl = li.querySelector('.date');
        const amountEl = li.querySelector('.amount');
        const statusEl = li.querySelector('.status');

        const date = dateEl?.textContent.trim() || '';
        const amount = amountEl?.textContent.trim() || '';
        const status = statusEl?.textContent.trim() || '';

        const item = document.createElement('li');
        item.dataset.index = i;
        item.draggable = true;
        item.style.width = '100px';
        item.innerHTML = `
            <div class='dragMe' draggable="true"><img src='./images/drag.png'></div>
            <div class='dataSettingSection' data-index='${i}'>
                <input type='text' value='${name}' class='dataSettingsTitle' style='width:100px'>
                <input type='text' value='${date}' class='dataSettingsDate' style='width:100px'>
                <input type='text' value='${amount}' class='dataSettingsAmount' style='width:100px'>
                <select class='dataSettingsStatus status ${returnStatus(status)}' style='width:100px'>
                    ${createStatusOptions(status)}
                </select>
            </div>
        `;
        settingsUl.appendChild(item);
        setupLiveSync(item, i);
    });

    enableDragAndDrop('.settingsList', 'section.list ul.data');

    document.querySelector('.addSectionButton').addEventListener('click', () => {
        const i = settingsUl.children.length;

        const newLi = document.createElement('li');
        newLi.setAttribute('data-index', i);
        newLi.setAttribute('draggable', 'true');
        newLi.style.width = '100px';
        newLi.innerHTML = `
            <div class='dragMe' draggable="true"><img src='./images/drag.png'></div>
            <div class='dataSettingSection' data-index='${i}'>
                <input type='text' value='New Name' class='dataSettingsTitle' style='width:100px'>
                <input type='text' value='Jan 01, 2025' class='dataSettingsDate' style='width:100px'>
                <input type='text' value='$0.00' class='dataSettingsAmount' style='width:100px'>
                <select class='dataSettingsStatus status pending' style='width:100px'>
                    ${createStatusOptions('Pending')}
                </select>
            </div>
        `;
        settingsUl.appendChild(newLi);

        const tableList = document.querySelector('section.list ul.data');
        const tableLi = document.createElement('li');
        tableLi.className = i % 2 === 0 ? 'dark-grey' : 'light-grey';
        tableLi.innerHTML = `
            New Name
            <div class="date laptop-version">Jan 01, 2025</div>
            <div class="amount laptop-version">$0.00</div>
            <div class="status pending">Pending</div>
        `;
        tableList.appendChild(tableLi);

        enableDragAndDrop('.settingsList', 'section.list ul.data');
        setupLiveSync(newLi, i);
    });

    let removeBtn = document.querySelector('.removeSectionButton');
    removeBtn.addEventListener('dragover', (e) => {
        e.preventDefault();
        removeBtn.classList.add('active-drop');
    });
    removeBtn.addEventListener('dragleave', () => {
        removeBtn.classList.remove('active-drop');
    });
    removeBtn.addEventListener('drop', (e) => {
        e.preventDefault();
        removeBtn.classList.remove('active-drop');

        const dragged = document.querySelector('.settingsList li[style*="display: none"]');
        if (!dragged) return;

        const index = +dragged.dataset.index;
        dragged.remove();

        const tableLi = document.querySelector(`section.list ul.data > li:nth-child(${index + 1})`);
        tableLi?.remove();

        document.querySelectorAll('.settingsList li').forEach((li, i) => {
            li.dataset.index = i;
            const section = li.querySelector('.dataSettingSection');
            if (section) section.dataset.index = i;
        });

        const ulSettings = document.querySelector('.settingsList');
        const newOrder = Array.from(ulSettings.querySelectorAll('li')).map(li => +li.dataset.index);

        const tableList = document.querySelector('section.list ul.data');
        const updatedItems = Array.from(tableList.querySelectorAll('li')).map(el => el.cloneNode(true));
        tableList.innerHTML = '';
        newOrder.forEach(i => {
            if (updatedItems[i]) tableList.appendChild(updatedItems[i]);
        });
    });
    document.addEventListener('dragstart', () => {
        removeBtn.style.height = `40px`;
    });
    
    document.addEventListener('dragend', () => {
        removeBtn.style.height = `0px`;
    });
    document.addEventListener('drop', () => {
        removeBtn.style.height = `0px`;
    });
}

function updateModalWindowContent(type, graphLink) {
    dataSettingsModalWindow.innerHTML = '';
    
    switch (type) {
        case 'frame':
            setMWCChart(type);
            break;
        case 'graph':
            setMWCGraph(graphLink)
            break;
        case 'specialGraph':
            setMWCSpecialGraph(graphLink)
            break;
        case 'list':
            setMWCList(graphLink)
            break;
        default:
            break;
    }
    

    // /* Переміщення за "ручкою" dragMe елементом */
    // dragMeButtons.forEach(btn =>
    // {
    //     btn.addEventListener('dragstart', (e)=>
    //     {
    //         draggedElement = e.target.closest('li');
    //         removeSectionButton.style.height = '40px'
    //         e.dataTransfer.effectAllowed = 'move';
    //         e.dataTransfer.setData('text/plain', e.target.closest('li').dataset.index);
    //     })
    //     btn.addEventListener('dragover', (e)=>
    //     {
    //         e.preventDefault();
    //         e.dataTransfer.dropEffect = 'move';
    //     })
    //     btn.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         if (draggedElement === e.target.closest('li')) return;

    //         const draggedIndex = +draggedElement.dataset.index;
    //         const targetIndex = +e.target.closest('li').dataset.index;

    //         // ⚡️ Переміщення DOM
    //         const list = e.target.closest('li').parentElement;
    //         if (draggedIndex < targetIndex) {
    //             list.insertBefore(draggedElement, e.target.closest('li').nextSibling);
    //         } else {
    //             list.insertBefore(draggedElement, e.target.closest('li'));
    //         }

    //         // ⚡️ Переміщення у даних
    //         const move = (arr, from, to) => {
    //             const item = arr.splice(from, 1)[0];
    //             arr.splice(to, 0, item);
    //         };

    //         move(currentGraphic.labels, draggedIndex, targetIndex);
    //         move(currentGraphic.datasets[0].data, draggedIndex, targetIndex);
    //         move(currentGraphic.datasets[0].pointRadius, draggedIndex, targetIndex);

    //         // 🔁 Оновлення
    //         createChart(selectChartType.value, chartContainer);
    //         updateModalWindowContent(type);
    //     });
    //     btn.addEventListener('dragend', () => {
    //         draggedElement.classList.remove('dragging');
    //         removeSectionButton.style.height = '0px'
    //         draggedElement = null;
    //     });
    // }
    // )

    /* Переміщення за li елементом */

    // listItems.forEach(item => {
    //     item.addEventListener('dragstart', (e) => {
    //         draggedElement = item;
    //         e.dataTransfer.effectAllowed = 'move';
    //         e.dataTransfer.setData('text/plain', item.dataset.index);
    //         setTimeout(() => item.classList.add('dragging'), 0); // для стилю
    //     });

    //     item.addEventListener('dragover', (e) => {
    //         e.preventDefault();
    //         e.dataTransfer.dropEffect = 'move';
    //     });

    //     item.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         if (draggedElement === item) return;

    //         const draggedIndex = +draggedElement.dataset.index;
    //         const targetIndex = +item.dataset.index;

    //         // ⚡️ Переміщення DOM
    //         const list = item.parentElement;
    //         if (draggedIndex < targetIndex) {
    //             list.insertBefore(draggedElement, item.nextSibling);
    //         } else {
    //             list.insertBefore(draggedElement, item);
    //         }

    //         // ⚡️ Переміщення у даних
    //         const move = (arr, from, to) => {
    //             const item = arr.splice(from, 1)[0];
    //             arr.splice(to, 0, item);
    //         };

    //         move(currentGraphic.labels, draggedIndex, targetIndex);
    //         move(currentGraphic.datasets[0].data, draggedIndex, targetIndex);
    //         move(currentGraphic.datasets[0].pointRadius, draggedIndex, targetIndex);

    //         // 🔁 Оновлення
    //         createChart(selectChartType.value, chartContainer);
    //         updateModalWindowContent();
    //     });

    //     item.addEventListener('dragend', () => {
    //         draggedElement.classList.remove('dragging');
    //         draggedElement = null;
    //     });
    // });
    /* ------------------------------ */

    // document.addEventListener('mouseup', () => {
    //     dragMeButtons.forEach(e => e.classList.remove('dragging'));
    // });

    // dataSettingsModalWindow.querySelector(`button.addSectionButton`).addEventListener('click', ()=>
    // {
    //     const index = currentGraphic.labels.length-1;
        
    //     currentGraphic.labels.splice(index, 0, 'temp');
    //     currentGraphic.datasets[0].data.splice(index, 0, 50);
    //     currentGraphic.datasets[0].pointRadius.splice(index, 0, 4)
    //     createChart(_, chartContainer);
    //     updateModalWindowContent(type);
    // })

    // dataSettingsModalWindow.querySelectorAll('#dataSettingsValue').forEach(element =>
    // {
    //     element.addEventListener('input', (event)=>
    //     {
    //         const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
    //         changeChartData('value', index, event.target.value);
    //         createChart(selectChartType.value, chartContainer);
    //     });
    // });
        
    // dataSettingsModalWindow.querySelectorAll('#dataSettingsLabel').forEach(element =>
    // {
    //     element.addEventListener('input', (event)=>
    //     {
    //         const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
    //         changeChartData('label', index, event.target.value);
    //         createChart(selectChartType.value, chartContainer);
    //     });
    // });
}

let chartColorOutline;

const linePlugin = {
    id:'l1',
    afterDatasetsDraw(chart, args, plugins)
    {
        if (chart.config.type === 'bar') return;
        const {ctx, tooltip, chartArea: {top, bottom, left, right, width, height}, scales:{x, y}} = chart;
        ctx.save();
        ctx.lineWidth = 0.5;

        // Проходимо по кожному датасету
        chart.data.datasets.forEach((dataset, datasetIndex) => {
            if (!chart.isDatasetVisible(datasetIndex)) return;

            dataset.data.forEach((point, index) => {
                const xCoor = x.getPixelForValue(index);
                const yCoor = y.getPixelForValue(point);

                // Градієнт для кожної лінії
                const gradientLine = ctx.createLinearGradient(0, top, 0, bottom);
                gradientLine.addColorStop(0, chartColorOutline);
                gradientLine.addColorStop(1, `white`);

                ctx.strokeStyle = gradientLine;
                ctx.beginPath();
                ctx.moveTo(xCoor, yCoor);
                ctx.lineTo(xCoor, bottom);
                ctx.stroke();
                ctx.closePath();
            });
        });

        ctx.setLineDash([]);
        ctx.restore();
    }
}

Chart.register(linePlugin)


function changeChartData(type, index, newValue) {
    if (type === 'value') {
        currentGraphic.datasets[0].data[index] = +newValue;
    } else if (type === 'label') {
        currentGraphic.labels[index] = newValue;
    }
}

let currentChart = null;

function createChart(type = selectChartType.value, container = chartContainer) {
    if (currentChart) {
        currentChart.destroy();
    }
    let canvas = container.querySelector('canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        container.appendChild(canvas);
    }

    let dataToUse = JSON.parse(JSON.stringify(currentGraphic));

    if (type === 'bar') {
        dataToUse.labels = dataToUse.labels.splice(1, dataToUse.labels.length-2);
        dataToUse.datasets[0].data = dataToUse.datasets[0].data.splice(1, dataToUse.datasets[0].data.length-2)
    }
    
    const config =
    {
        type: type,
        data:dataToUse,
        options:
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins:[linePlugin],
            scales: 
            {
                y: {
                    beginAtZero: true,
                    grid:{display: false}
                },
                x:
                {
                    beginAtZero: true,
                    grid:{display: false}
                },
            },
        }
    }

    const isDarkTheme = document.getElementById('themeSwitcher').className === 'bi bi-moon';

    const chartColorOutlineLis = document.querySelectorAll(`section.graphic .group li`);
    for (let i = 0; i < chartColorOutlineLis.length; i++) {
        if (chartColorOutlineLis[i].classList.contains('active')) {
            chartColorOutline = chartColorOutlineLis[i].getAttribute('data-chart-color')
        }
    }
    
    dataToUse.datasets[0].borderColor = `${chartColorOutline}`;

    dataToUse.datasets[0].backgroundColor = isDarkTheme ? '#292929' : `white`
    if (type === 'bar') {
        config.options.scales.x = {grid:{display: false}};
    }
    else if(type === 'line')
    {
        config.options.scales.x = {
            grid: {
                display: true,
                color: isDarkTheme ? '#292929' : `white`

                /* градієнт по горизонталі */
                
                // color: function(context) {
                //     const chart = context.chart;
                //     const {ctx, chartArea} = chart;
                //     if (!chartArea) return 'rgba(0, 0, 0, 0.1)';

                //     const padding = 2; // Додаємо невеликий запас у пікселях

                //     const width = chartArea.right - chartArea.left + padding;
                //     const height = chartArea.bottom - chartArea.top + padding;

                //     const offCanvas = document.createElement('canvas');
                //     offCanvas.width = width;
                //     offCanvas.height = height;
                //     const offCtx = offCanvas.getContext('2d');

                //     // Вертикальний градієнт (основний для vertical grid)
                //     const verticalGradient = offCtx.createLinearGradient(0, 0, 0, height);
                //     verticalGradient.addColorStop(0, 'transparent');
                //     verticalGradient.addColorStop(1, 'transparent');
                //     offCtx.fillStyle = verticalGradient;
                //     offCtx.fillRect(0, 0, width, height);

                //     // Горизонтальний градієнт прозорий, щоб не перекривати
                //     const horizontalGradient = offCtx.createLinearGradient(0, 0, width, 0);
                //     horizontalGradient.addColorStop(0, 'red');
                //     horizontalGradient.addColorStop(1, 'green');
                //     offCtx.fillStyle = horizontalGradient;
                //     offCtx.fillRect(0, 0, width, height);

                //     // Патерн повторюємо по горизонталі
                //     return ctx.createPattern(offCanvas, 'repeat-x');
                // }


                    // color: function(context) { 
                    //     const chart = context.chart;
                    //     const {ctx, chartArea} = chart;

                    //     if (!chartArea) {
                    //         return 'rgba(0, 0, 0, 0.1)'; 
                    //     }

                    //     // Створення ЛІНІЙНОГО ГРАДІЄНТА ВЕРТИКАЛЬНО
                    //     // Він йде від верхнього краю області графіка до нижнього
                    //     const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    //     gradient.addColorStop(0, 'red');  // Синій зверху
                    //     gradient.addColorStop(1, 'green'); // Зелений знизу
                    //     return gradient;
                    // }
            }, 
            border: { display: false }
        };
        config.options.scales.y = {grid: {display: false}, ticks:{display:false}, border: { display: false }};
        config.options.scales.y.min = Math.min(...currentGraphic.datasets[0].data) - 10; 
        config.options.scales.y.max = Math.max(...currentGraphic.datasets[0].data) + 10;
    }
    currentChart = new Chart(canvas, config)

}


const selectChartSpread = document.getElementById('selectChartSpread');
const selectChartType = document.getElementById('selectChartType');


selectChartSpread.addEventListener('change', ()=>
{
    changeChartSpread(selectChartSpread.value);
    createChart(selectChartType.value, chartContainer);
    if (dataSettingsModalWindow.style.display === 'flex') {
        updateModalWindowContent('frame');
    }
})

selectChartType.addEventListener('change', ()=>
{
    createChart(selectChartType.value, chartContainer)
})

createChart('line', chartContainer)


let dataSettingsModalWindow = document.getElementsByClassName(`dataSettingsModalWindow`)[0];

function setDataIntoModalWindow(graphic) {
    dataSettingsModalWindow.innerHTML = '';
    if (graphic.querySelector(`.frame`)) {
        updateModalWindowContent('frame')
    }
    else if(graphic.querySelector(`.graph`) && graphic.querySelector(`.graph`).id === 'specialGraph')
    {
        updateModalWindowContent('specialGraph', graphic.querySelector(`.graph`))
    }
    else if(graphic.querySelector(`.graph`))
    {
        updateModalWindowContent('graph', graphic.querySelector(`.graph`))
    }
    else if(graphic.querySelector(`.table`))
    {
        updateModalWindowContent('list', graphic.querySelector(`.table ul.data`))
    }
}

document.querySelectorAll('#dataSettingsOpener').forEach(element =>
{
    element.addEventListener(`click`, (event)=>
    {
        dataSettingsModalWindow.style.display = (dataSettingsModalWindow.style.display === 'flex') ? `none` : `flex`
        setDataIntoModalWindow(event.target.closest(`section`))
    })
}
)

exports = {createChart};