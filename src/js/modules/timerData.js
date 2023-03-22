const timer = (id, deadline) => {
   //id - куда именно будет помещаеться мой таймер
   //*пишем функцию коотрая будет сичтать сокльо времени осталось до deadline
   const getTimeRemaning = endTime => {
      const timeTotal = Date.parse(endTime) - Date.parse(new Date())
      //new Date() - это наша текущая дата
      //Date.parse(endTime) - тут у нас вычисляется солько мисисекунл прошло с 1970г.

      //Выделяем из всего значения то что будет показываться на нашем сайте
      const seconds = Math.floor((timeTotal / 1000) % 60),
         /* time / 1000 - получяем количество секунд всего вске время таймера, но в данном случае мы делим с остатком на 60 чтобы получить еоличество минут и остаток и будет наши секунды*/
         minutes = Math.floor((timeTotal / 1000 / 60) % 60), //получаем часы и остаток и будет наши минуты
         hours = Math.floor((timeTotal / 1000 / 60 / 60) % 24), //получаем сутки и остаток будет уже наши часы что намнужны
         days = Math.floor(timeTotal / (1000 * 60 * 60 * 24)) // тут просто считаем количество дней которое у нас осталось

      return {
         timeTotal,
         days,
         hours,
         minutes,
         seconds,
      }
   }

   //*функция которая  будет добавлять "0" когда будет показываться у нас на сайте
   const addZero = num => {
      if (num <= 9) {
         return '0' + num
      } else {
         return num
      }
   }

   //*пишем функцию которая размещает наши элементы на странице
   const setClock = (selector, endTime) => {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000) // это переменная длятого чтобы останавливать таймер

      //функция коотрая считает сколько времени осталось до deadline
      function updateClock() {
         const t = getTimeRemaning(endTime)
         days.textContent = addZero(t.days) // мы записываем значение которое вернулосьу нас с нашей функции
         hours.textContent = addZero(t.hours)
         minutes.textContent = addZero(t.minutes)
         seconds.textContent = addZero(t.seconds)

         //пишем условие чтобы таймер показывал 0 если воемя вышло
         if (t.timeTotal <= 0) {
            days.textContent = '00'
            hours.textContent = '00'
            minutes.textContent = '00'
            seconds.textContent = '00'

            //удаляем сам отсчет
            clearInterval(timeInterval)
         }
      }
   }
   setClock(id, deadline)
}

export default timer
