import './slider'
import modals from './modules/modals' // импортируем модуль по работе с открытием/закрытием модулей
import tabs from './modules/tabs' // создание табов

//обработчиккотры будет обрабатывать наши скрипты только тогда когда у нас будет готова структура проэкта
// тут будет весь функционал
window.addEventListener('DOMContentLoaded', () => {
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
})
