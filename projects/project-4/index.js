document.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.selected');
    const options = select.querySelector('.options');
  
    selected.addEventListener('click', () => {
      select.classList.toggle('open');
    });
  
    options.querySelectorAll('div').forEach(option => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        selected.setAttribute('data-value', option.dataset.value);
        select.classList.remove('open');
        // Якщо треба обробити вибране значення:
        console.log("Selected value:", option.dataset.value);
      });
    });
  
    // Закриття при кліку поза селектом
    document.addEventListener('click', e => {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    });
  });
  