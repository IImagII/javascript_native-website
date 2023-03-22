//алгорит выполнения 1) задания а именно мы включаем показ модального окна и его закрываем
const modals = () => {
   //!создаем функцию которая будет привязыватьься к модальному окну привязка к кнопке
   function bindModal(
      triggerSelector,
      modalSelector,
      closeSelector,
      closeClickOverlay = true // для того чтобы контролировать какое окно необходимо закрывать а какое нет
   ) {
      //это сделано для птимизации то есть мы просто будем передавать селекторы а они будут искаться уже в самой функции
      const trigger = document.querySelectorAll(triggerSelector), // тут мы берем все элементы на случай если у насбудет несколько селекторов открываться
         modal = document.querySelector(modalSelector),
         close = document.querySelector(closeSelector),
         windows = document.querySelectorAll('[data-modal]'),
         scroll = calcScroll()

      //trigger - это сама кнопка
      //modal - это само окно которое может быть открытым
      //close - крестик по закрытию окна
      //windows - для того чтобы получать всемодальные окна с data-атрибутом

      //?реализуем появление модального окна (тут проходимся по всем селекторам на случчай если у нас их будет много)
      trigger.forEach(item => {
         item.addEventListener('click', e => {
            if (e.target) {
               e.preventDefault()
            }
            //реализация закрыавем все окна модальные если они у нас были открыты
            windows.forEach(item => {
               item.style.display = 'none'
            })

            modal.style.display = 'block' // меняем стиль css для того чтобы модальное окна стало видимым
            //todo     document.body.style.overflow = 'hidden' // для того чтобы нескролилось содержимое сайта когда открыто модальное окно
            document.body.classList.add('modal-open') // это второй вариант как можно работать с классами то функционалу будет тоже самое
            document.body.style.style.marginRight = `${scroll}px` // добавляем тот отсутп из за которого у нас прыгает наш сайт при появлении модального окна
         })
      })

      //?реализуем закрытие модаьного окна
      close.addEventListener('click', () => {
         modal.style.display = 'none' // делаем закрытие модального окна при клике на крестик
         //todo     document.body.style.overflow = '' //возвращаем свойство для того чтобы скролл работал после закрытия модального окна
         document.body.classList.remove('modal-open') // это второй вариант как можно работать с классами то функционалу будет тоже самое
         document.body.style.style.marginRight = `0px` //уберает наш отсуп когда окно закроется чтобы опять не прыгало
      })

      //?реализуем закрытие окна при клике вне его по черному фону
      modal.addEventListener('click', e => {
         //этой проверкой мы подключаем  клик по черному фрну нашего моадльного кона
         if (e.target === modal && closeClickOverlay) {
            //реализация закрыавем все окна модальные если они у нас были открыты
            windows.forEach(item => {
               item.style.display = 'none'
            })
            modal.style.display = 'none' // делаем закрытие модального окна при клике на крестик
            //todo   document.body.style.overflow = '' //возвращаем свойство для того чтобы скролл работал после закрытия модального окна
            document.body.classList.remove('modal-open') // это второй вариант как можно работать с классами то функционалу будет тоже самое
            document.body.style.style.marginRight = `0px` //уберает наш отсуп когда окно закроется чтобы опять не прыгало
         }
      })
   }

   //!руализуем функцию которая будет показывать модальное окно если пользователь на странице более 60сек
   function showModalByTime(selector, time) {
      //именно тут функция по открыти. окна
      setTimeout(function () {
         document.querySelector(selector).style.display = 'block' // тут мы вешаемся на то модальное окно которое должно показываться
         document.body.style.overflow = 'hidden'
      }, time)
   }

   //функция которая вычисляет отступ для того чтобы сайт не прыгал когда появляется модальное окно
   function calcScroll() {
      //сначало создадим некий элемент
      let div = document.createElement('div')
      div.style.width = '50px'
      div.style.height = '50px'
      div.style.overflowY = 'scroll'
      div.style.visibility = 'hidden'

      //показывапем элемент настранице
      document.body.appendChild(div)

      //вычисляем размер прокрутки
      let scrollWidth = div.offsetWidth - div.clientWidth //тут мы получм саму прокрутку
      //div.offsetWidth - это полная величина
      //div.clientWidth - а тут включается только прокрутка

      div.remove() // удаляем элемент так как он выполнял временную функцию для того чтобы вычислить значение а потом нам он больше не нужен

      return scrollWidth
   }

   /*==================вызываем первое модальное окно==========*/
   bindModal(
      '.popup_engineer_btn', // привязываемся к кнопке по вызову модального окна
      '.popup_engineer', // подвязываемся к самому модальному окну которое должно появиться
      '.popup_engineer .popup_close' // крестик для закрытия окна
   )
   /*==================END -вызываем первое модальное окно==========*/

   /*==================вызываем второе модальное окно "заказать обратный звонок"==========*/
   bindModal('.phone_link', '.popup', '.popup .popup_close')
   /*==================END -вызываем первое модальное окно==========*/

   /*==================вызываем модальное окно с задержкой в 60сек==========*/
   // showModalByTime('.popup', 60000)
   /*==================END -вызываем модальное окно с задержкой в 60сек==========*/

   /*=================Модальное окно калькулятор=================*/
   bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
   /*=================END-модальное окно калькулятор=================*/

   /*=================Модальное окно для появления следующего модального окна калькулятора=================*/
   bindModal(
      '.popup_calc_button',
      '.popup_calc_profile',
      '.popup_calc_profile_close',
      false
   )
   /*=================END-Модальное окно для появления следующего модального окна калькулятора=================*/
   /*=================Модальное окно для появления второго с параметрами модального окна калькулятора=================*/
   bindModal(
      '.popup_calc_profile_button',
      '.popup_calc_end',
      '.popup_calc_end_close',
      false
   )
   /*=================END-Модальное окно для появления следующего модального окна калькулятора=================*/
}

export default modals
