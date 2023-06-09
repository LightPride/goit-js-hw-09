import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timer: document.querySelector('.timer'),
  startButton: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

refs.startButton.addEventListener('click', countdownTime);
const now = new Date();
refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (fp.selectedDates[0] - now <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startButton.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function countdownTime() {
  refs.startButton.disabled = true;
  const interval = setInterval(() => {
    const now = new Date();
    const dif = fp.selectedDates[0] - now;
    const time = convertMs(dif);

    updateTimerValue(time);
    console.log(dif);
    if (dif <= 0999) {
      clearInterval(interval);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerValue({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}
