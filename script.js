const totalTime = '10:00:00:00';
const time = "Aug 30, 2024 00:00:00";

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.color-selector button').forEach(button => {
        button.onclick = () => {
            const root = document.querySelector(":root");
            root.style.setProperty("--text-card-color", button.className);
        }
    })
    
    /*const currentDate = new Date();
    const targetDate = currentDate;

    let [days, hours, minutes, seconds] = totalTime.split(':');

    targetDate.setDate(currentDate.getDate() + +days);
    targetDate.setHours(currentDate.getHours() + +hours);
    targetDate.setMinutes(currentDate.getMinutes() + +minutes);
    targetDate.setSeconds(currentDate.getSeconds() + +seconds);*/
    const targetDate = new Date(time);
    start(targetDate.getTime());
})

function start(sec) {
    const update = () => {
        const { timeLeft, daysLeft, hoursLeft, minutesLeft, secondsLeft } = getRemainingTime(sec);
        if (timeLeft <= 0) {
          clearInterval(timeInterval);
          return;
        }
        flipCard("days", daysLeft);
        flipCard("hours", hoursLeft);
        flipCard("minutes", minutesLeft);
        flipCard("seconds", secondsLeft);
    };
    update();
    const timeInterval = setInterval(update, 1000);
};

const getRemainingTime = (time) => {
    const timeLeft = time - Date.now();
    
    let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { timeLeft, 
      daysLeft, 
      hoursLeft,
       minutesLeft, 
       secondsLeft };
};

function flipCard(input, time) {
    const card = document.getElementById(input);
    const timeStr = formatTime(time);

    const halfTop = card.querySelector(".card_top");
    const halfBottom = card.querySelector(".card_bottom");

    const currentValue = card.querySelector('.card_top').textContent;

    if (timeStr == currentValue) {
        return;
    }

    const flipTop = document.createElement("div");
    flipTop.classList.add("card_top--flip");
    flipTop.innerText = currentValue;

    const flipBottom = document.createElement("div");
    flipBottom.classList.add("card_bottom--flip");
    flipBottom.innerText = timeStr;

    flipTop.addEventListener("animationstart", () => {
      halfTop.textContent = timeStr;
    });

    flipTop.addEventListener("animationend", () => {
      flipTop.remove();
    });

    flipBottom.addEventListener("animationend", () => {
        halfBottom.innerText = timeStr;
        flipBottom.remove();
    });

    card.appendChild(flipTop);
    card.appendChild(flipBottom);
};

function formatTime(time) {
  return time.toString().padStart(2, '0');
}