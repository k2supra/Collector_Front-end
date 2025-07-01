var _ = undefined;

const button = document.getElementById('themeSwitcher');
const lightThemeClass = 'bi bi-brightness-high';
const darkThemeClass = 'bi bi-moon';

button.addEventListener('click', (e)=>
{
    if(e.target.className === lightThemeClass)
    {
        document.body.classList.add('dark-theme');
        e.target.className = darkThemeClass;
    }
    else
    {
        document.body.classList.remove('dark-theme');
        e.target.className = lightThemeClass;
    }
    createChart(_, _)
})