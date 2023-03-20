//пишем модуль по созданию табов на сайте
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
   //тут получаем наши селекторы коотрыми будем управлять
   const header = document.querySelector(headerSelector), // селектор родительского тега где находяться все табы
      tab = document.querySelectorAll(tabSelector), // конкретно самы табы их класс
      content = document.querySelectorAll(contentSelector) //класс переключаемых контента по классу

   //функция скрытия табов
   function hiddenTabContent() {
      //тут мы скрыли весь контент
      content.forEach(item => {
         item.style.display = 'none'
      })

      //тут мы удаляем активный класс
      tab.forEach(item => {
         item.classList.remove(activeClass)
      })
   }

   //функция показа табов
   function showTabContent(arg = 0) {
      //тут передаем конкретный arg чтобы показывать именно его
      content[arg].style.display = 'block'

      //тут мы добавляем  активный класс конкретному таб
      tab[arg].classList.add(activeClass)
   }

   //вызываем соотвествующие функции
   hiddenTabContent()
   showTabContent()

   //отслеживаем какой именно таб нажал пользователь
   header.addEventListener('click', e => {
      const target = e.target

      if (
         //проверяем что мы действиетльно нажали именно в один из табов
         target &&
         (target.classList.contains(tabSelector.replace('.', '')) || //tabSelector.replace('.', '') - в этом случае мы убрали .  так как нам нужно чтобы приходил класс без .
            target.parentNode.classList.contains(tabSelector.replace('.', '')))
         //после выполнения этого условия мы точно удостоверимся что кликнули в этот элемент
      ) {
         //мы находимна какой именно элемент нажал пользователь путем уловия
         tab.forEach((item, index) => {
            if (target === item || target.parentNode === item) {
               hiddenTabContent()
               showTabContent(index) //сюда передается номер того элемента куда нажал пользователь
            }
         })
      }
   })
}

export default tabs
