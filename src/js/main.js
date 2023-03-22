import './slider'
import modals from './modules/modals' // импортируем модуль по работе с открытием/закрытием модулей
import tabs from './modules/tabs' // создание табов
import forms from './modules/forms' // модуль с формамми
import changeModalState from './modules/changeModalState' // для сбора данных при наборе калькуляторе
import timer from './modules/timerData'

//обработчиккотры будет обрабатывать наши скрипты только тогда когда у нас будет готова структура проэкта
// тут будет весь функционал
window.addEventListener('DOMContentLoaded', () => {
   let modalState = {} // создаем объект куда мы будем записывать все данные которые мы получаем с модальных окон калькулятора
   changeModalState(modalState) // тут вызываем функцию коотрая формирует то что мы указываем для калькулятора стоимости окна

   //для таймер
   const deadline = '2023-05-01' //пишем именно в таком формате

   modals() // вызывам тот модуль  что мы импортировали для тго чтобы он заработал

   // вызываем созданеи табов
   tabs(
      '.glazing_slider', // класс родителя
      '.glazing_block', // класс самого таба
      '.glazing_content', // класс контента соответсвующего табу
      'active' //класс чтобы показать какой класс активный
   )

   tabs(
      '.decoration_slider',
      '.no_click',
      '.decoration_content>div>div', // так делаем потому что у нас разные классы мы так указываем строгое соответсвие
      'after_click'
   )

   //табуляция для калькулятора
   tabs(
      '.balcon_icons',
      '.balcon_icons_img',
      '.big_img>img', // опять так указываем и показываем что только прямые наследники
      'do_image_more',
      'inline'
   )

   forms(modalState) // запускаем форму передаем туда параметры для подсчета калькулятора modalState

   timer('.container1', deadline) //заупскаем таймер
})
