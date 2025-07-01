document.querySelector(`i.bi-layout-sidebar`).addEventListener('click', ()=>
{
    const aside = document.querySelector(`aside`);
    const main = document.querySelector('main');

    if (aside.style.display === 'none') {
        aside.style.display = 'flex'
        aside.style.width = '240px';
        main.style.width = 'calc(100% - 240px)';
        return;
    }
    
    aside.style.width = '0px';
    main.style.width = '100%';
    setTimeout(()=>{aside.style.display = 'none'}, 310)
})