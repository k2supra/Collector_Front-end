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
  

//circle slider
const pointer = document.querySelector(".app-proto .progress-ring .arrow-progress .arrow");
const progressRing = document.querySelector(".app-proto .progress-ring");
const circle = document.querySelector(".app-proto .progress-ring svg .circle-3");
const circleOutline = document.querySelector(".app-proto .progress-ring svg .circle-2");

let isRotating = false;
let circleLength = 377;

const rotatePointer = (e)=>
{
  if (isRotating) {

    const svgRect = progressRing.getBoundingClientRect();
    const centerX = svgRect.left + svgRect.width / 2;
    const centerY = svgRect.top + svgRect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = (angleRad * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;

    let rotationAngle = (angleDeg + 180 + 360) % 360;
    

    pointer.style.transform = `rotate(${rotationAngle}deg)`;
    

    const adjustedAngle = (angleDeg + 90) % 360;
    const offset = circleLength - (circleLength * adjustedAngle / 360);
    circle.style.strokeDashoffset = offset;

    circleOutline.style.strokeDashoffset = offset+5;
  }
  else return;
}

pointer.addEventListener("mousedown", ()=>
{
  isRotating = true;
})

document.addEventListener("mousemove", rotatePointer);

document.addEventListener("mouseup", ()=>
  {
    isRotating = false;
  })