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

function updateModalWindowContent() {
    dataSettingsModalWindow.innerHTML = '';
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
    /* ------------------------------ */
    
    let draggedElement = null;

    const listItems = dataSettingsModalWindow.querySelectorAll('ul.settingsList > li');

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
        updateModalWindowContent();
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
            updateModalWindowContent();
        });
        btn.addEventListener('dragend', () => {
            draggedElement.classList.remove('dragging');
            removeSectionButton.style.height = '0px'
            draggedElement = null;
        });
    }
    )

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
        updateModalWindowContent();
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
                gradientLine.addColorStop(0, `violet`);
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

    if (type === 'bar') {
        dataToUse.datasets[0].backgroundColor = isDarkTheme ? '#292929' : `white`
        config.options.scales.x = {grid:{display: false}};
    }
    else if(type === 'line')
    {
        config.options.scales.x = {
            grid: {
                display: true,
                color: isDarkTheme ? '#292929' : `white`
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
        updateModalWindowContent();
    }
})

selectChartType.addEventListener('change', ()=>
{
    createChart(selectChartType.value, chartContainer)
})

createChart('line', chartContainer)


let dataSettingsModalWindow = document.getElementsByClassName(`dataSettingsModalWindow`)[0];

function setDataIntoModalWindow(isGraphic) {
    dataSettingsModalWindow.innerHTML = '';
    if (isGraphic) {
        updateModalWindowContent()
    }
    else
    {
        console.log(`--`);
        
    }
}

document.querySelectorAll('#dataSettingsOpener').forEach(element =>
{
    element.addEventListener(`click`, (event)=>
    {
        dataSettingsModalWindow.style.display = (dataSettingsModalWindow.style.display === 'flex') ? `none` : `flex`
        setDataIntoModalWindow(event.target.closest(`section`).querySelector(`.frame`))
    })
}
)

exports = {createChart};