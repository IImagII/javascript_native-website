import checkNumberInputs from './checkNumInputs' //переиспользуемая функция для валидации (можно вводить толко цифры)

const forms = state => {
   // для отправки на сервер данных
   const form = document.querySelectorAll('form'), // тут получаем даннеы со всех форм
      inputs = document.querySelectorAll('input') // туту поулчаем все даннеы с input (будем использовать для очистки)
   // phoneInputs = document.querySelectorAll('input[name="user_phone"]') //todo получаем всеполя где будет прописан номер телефона для использования валидации на них

   //делаем саму валидацию
   //самый простой способ провалидировать это использовать регулярные выражения
   //todo(не действиетльно так как мы сделали переиспользованную функцию смотри ниже )
   // phoneInputs.forEach(input => {
   //    input.addEventListener('input', () => {
   //       input.value = input.value.replace(/\D/, '') //если находится не число оно просто заменяется пустой строкой
   //    })
   // })

   //!второй вариант с переиспользуемой функцией
   checkNumberInputs('input[name="user_phone"]')

   //сообщения которые бьудут выводиться для пользователя
   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! С вами связуться',
      failure: 'Что-то пошло не так...',
   }
   //реализуем саму оправку насервер
   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading // показываем что у наспошла загрузка
      let res = await fetch(url, {
         method: 'POST',
         body: data,
      })
      return await res.text()
   }

   const clearInputs = () => {
      inputs.forEach(input => {
         input.value = '' //очищаем наши все input
      })
   }

   //собираем все данные с форм
   form.forEach(item => {
      item.addEventListener('submit', e => {
         e.preventDefault()
         let statusMessage = document.createElement('div') // создаем для того чтобы тудапомещать наши сообщения
         statusMessage.classList.add('status') // даем класс чтобы было красиво на странице
         item.appendChild(statusMessage) // выводим на страницу

         //собираем все данные с форм
         const formData = new FormData(item) // этот обьект найдет все input и поместит в специальную структуру

         //тут проверяем что если у нас именно последня форма то будем выполнять следующее
         if (item.getAttribute('data-calc') === 'end') {
            for (let key in state) {
               formData.append(key, state[key]) //тут мы дбавляем все значения которые мы получили
            }
         }

         //отправляем те даннеы которые мы собрали
         postData('assets/server.php', formData)
            .then(response => {
               console.log(response)
               statusMessage.textContent = message.success // покказываем сооьбщение если все прошло удачно
            })
            .catch(() => (statusMessage.textContent = message.failure))
            .finally(() => {
               //оно выполниться всегда
               clearInputs() //тут идет очистка input

               //тут удаляем сообщение через какоето время
               setTimeout(() => {
                  statusMessage.remove()
               }, 5000)
            })
      })
   })
}

export default forms
