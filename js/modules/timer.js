function timer(id, deadline) {

        // Функция для формирования окончательной даты
        function getTimeRemaining(deadline) {
            const t = Date.parse(deadline) - Date.parse(new Date()),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60) ) % 24),
                  minutes = Math.floor(t / (1000 * 60) ) % 60,
                  seconds = Math.floor((t / 1000) ) % 60;
            return {
                "total" : t,
                "days" : days,
                "hours" : hours,
                "minutes" : minutes,
                "seconds" : seconds
            };
        }
    
    
        // Главная функция 
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  minutes = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
                  //Включаем повтор функции обновления таймера   
                  timeInterval = setInterval(updateClock, 1000);
    
            // Обновляем таймер, чтобы сразу показывалось актуальная дата окончания 
            updateClock();
    
            // Функция обновления таймера
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = t.days > 9 ? t.days : "0"+ t.days;
                hours.innerHTML = t.hours > 9 ? t.hours : "0"+ t.hours;
                minutes.innerHTML = t.minutes > 9 ? t.minutes : "0"+ t.minutes;
                seconds.innerHTML = t.seconds > 9 ? t.seconds : "0"+ t.seconds;
                // Если наступил дедлайн останавливаем обновление таймера
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    days.innerHTML = "00";
                    hours.innerHTML = "00";
                    minutes.innerHTML = "00";
                    seconds.innerHTML = "00";
                }
            }
        }
    
        // Запуск главной функции
        setClock(id, deadline);
}
export default timer;