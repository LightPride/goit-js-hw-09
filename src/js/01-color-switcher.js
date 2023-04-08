const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let colorChanger = null;

startButton.addEventListener('click' ,onStartButtonClick);

function onStartButtonClick() {
  colorChanger = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000); 
  startButton.disabled = true;
  if ((startButton.disabled = true)) {
    stopButton.disabled = false
  }
}

stopButton.addEventListener('click', onStopButtonClick);


function onStopButtonClick() {
  clearInterval(colorChanger);
  startButton.disabled = false;
  stopButton.disabled = true;
}