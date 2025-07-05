const buttons = document.querySelectorAll(`section.graphic .group li`);

buttons.forEach(b =>
{
    b.addEventListener('click', ()=>
    {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i] === b) {
                buttons[i].classList.add('active');
                continue;
            }
            buttons[i].classList.remove('active');
        }
        createChart(_, _)
    })
}
)