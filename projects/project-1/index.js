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

let currentGraphic = chartDataWeek;

function changeChartSpread(newType) {
    switch (newType) {
        case 'week':
            currentGraphic = chartDataWeek;
            break;
        case 'month':
            currentGraphic = chartDataMonth;
            break;
        default:
            break;
    }
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

function createChart(type, container) {
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
    
    if (type === 'bar') {
        config.options.scales.x = {grid:{display: false}};
    }
    else if(type === 'line')
    {
        config.options.scales.x = {
            grid: {
                display: true,
                color: `white`
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
        config.options.scales.y.min = Math.min(...chartDataWeek.datasets[0].data) - 10; 
        config.options.scales.y.max = Math.max(...chartDataWeek.datasets[0].data) + 10;
    }
    currentChart = new Chart(canvas, config)

}


const selectChartSpread = document.getElementById('selectChartSpread');
const selectChartType = document.getElementById('selectChartType');


selectChartSpread.addEventListener('change', ()=>
{
    changeChartSpread(selectChartSpread.value);
    createChart(selectChartType.value, document.querySelector('.graphic .frame .graph'))
})

selectChartType.addEventListener('change', ()=>
{
    createChart(selectChartType.value, document.querySelector('.graphic .frame .graph'))
})

createChart('line', document.querySelector('.graphic .frame .graph'))


const dataSettingsModalWindow = document.getElementsByClassName(`dataSettingsModalWindow`)[0];

function setDataIntoModalWindow(isGraphic) {
    dataSettingsModalWindow.innerHTML = '';
    if (isGraphic) {
        dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
            <div class='dataSettingSection'>
                <div>value</div>
                <div>label</div>
            </div>`)
        for (let i = 1; i < currentGraphic.labels.length-1; i++) {
            dataSettingsModalWindow.insertAdjacentHTML(`beforeend`, `
                <div class='dataSettingSection' data-index='${i}'>
                    <input type='text' value='${currentGraphic.datasets[0].data[i]}' id='dataSettingsValue'>
                    <input type='text' value='${currentGraphic.labels[i]}' id='dataSettingsLabel'>
                </div>
            `)
        }
        dataSettingsModalWindow.querySelectorAll('#dataSettingsValue').forEach(element =>
            {
                element.addEventListener('input', (event)=>
                {
                    const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
                    changeChartData('value', index, event.target.value);
                    createChart(selectChartType.value, document.querySelector('.graphic .frame .graph'));
                });
            });
            
            dataSettingsModalWindow.querySelectorAll('#dataSettingsLabel').forEach(element =>
            {
                element.addEventListener('input', (event)=>
                {
                    const index = +event.target.closest(`.dataSettingSection`).getAttribute('data-index');
                    changeChartData('label', index, event.target.value);
                    createChart(selectChartType.value, document.querySelector('.graphic .frame .graph'));
                });
            });
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