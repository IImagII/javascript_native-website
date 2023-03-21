import checkNumberInputs from './checkNumInputs' //переиспользуемая функция для валидации (можно вводить толко цифры)

//функция коотрая будет собирать все данные коотрые мы вводим при модальных окнах калькуояторе
const changeModalState = state => {
   //сюда мы прописываем то что нам необходимо лдля подсчета калькулятора (ширина высота тип окон и др.)
   const windowForm = document.querySelectorAll('.balcon_icons_img'), //сначало поулчим какое окно
      windowWidth = document.querySelectorAll('#width'), //тут получаем ширину которую пишет пользователь
      windowHeight = document.querySelectorAll('#height'), //тут получаем соответсвенно высоту которую вводит пользователь
      windowType = document.querySelectorAll('#view_type'), //выбирам соответсвенно тип окна
      windowProfile = document.querySelectorAll('.checkbox') //выбирам соответсвенно профиль для  окна

   checkNumberInputs('#width') //используя переиспользованную функцию мы получили ширину (после валидации где можно вводить только цифры)
   checkNumberInputs('#height') //высота

   //создаем функцию которая будет записывать те данные которые получает из модальных окон для калькуляции
   function bindActionToElements(event, elem, prop) {
      //event - мжно передавать кастомное событие
      //elem - передаем какой элемент нужно получить
      //prop - название полякоторое запишиться в форму

      elem.forEach((item, index) => {
         item.addEventListener(event, () => {
            /*тут соответсвенно будет создаваться нвоое поле  и в него
			как значение поместиться чифра которая соотвествует нашей форме
 		при этом это все будет передаваться в пустой объект котоый мы создали modalState*/

            //тут напишемконструкцию которая будет выбирать какой именно тег мы нажали длятого чтобы потом выбрать нужное нам событие(click,input,change)
            switch (item.nodeName) {
               // nodeName мы получаем название нашего тега (ВАЖНО В верхнем регистре) поэтому мы пишем case в врехнем регистре
               case 'SPAN':
                  state[prop] = index
                  break
               case 'INPUT':
                  if (item.getAttribute('type') === 'checkbox') {
                     // тут мы выделяем именно checkbox
                     index === 0
                        ? (state[prop] = 'Холодное')
                        : (state[prop] = 'Горячее')

                     //тут пропишем что в один момент может быть выбран только один checkebox
                     elem.forEach((box, j) => {
                        box.checked = false
                        if (index === j) {
                           box.checked = true
                        }
                     })
                  } else {
                     state[prop] = item.value
                  }
                  break
               case 'SELECT':
                  state[prop] = item.value // потомучто у нашей верстки есть установлен атрибут value именно ег мы и будем получать
                  break
            }

            //todo(боьше не работает смотри код выше)   if (elem.length > 1) {
            //      state[prop] = index // это отработает если у нас несмколько значений как например несколько form
            //   } else {
            //      state[prop] = item.value // данная строка отработает если у нас один input
            //   }
         })
      })
   }

   bindActionToElements('click', windowForm, 'form') // вызываем для добавления поля form где мы выбираем форму
   bindActionToElements('input', windowWidth, 'width') // вызываем для добавления поля width где мы выбираем форму
   bindActionToElements('input', windowHeight, 'height') // вызываем для добавления поля height где мы выбираем форму
   bindActionToElements('change', windowType, 'type') // вызываем для добавления поля type где мы выбираем форму
   bindActionToElements('change', windowProfile, 'profile') // вызываем для добавления поля profile где мы выбираем форму

   //todo (не действительно смотри выше там все делается через ффункцию)тут передаем на какую форму окна мы конкретно нажали
   //    windowForm.forEach((item, index) => {
   //       item.addEventListener('click', () => {
   //          /*тут соответсвенно будет создаваться нвоое поле в нашем случае form и в него
   // 		как значение поместиться чифра которая соотвествует нашей форме
   // 		при этом это все будет передаваться в пустой объект котоый мы создали modalState*/
   //          state[form] = index
   //       })
   //    })
}

export default changeModalState
