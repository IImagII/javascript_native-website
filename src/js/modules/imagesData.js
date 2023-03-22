const imagesData = () => {
   //создаем модальное окно
   const imgPopup = document.createElement('div'), //сама наша модалка
      workSection = document.querySelector('.works'), // тут мы показываем куда будет рикрепляться наша картинка
      bigImage = document.createElement('img') // создаем тег для его отображения

   //выводим элемент на страницу
   imgPopup.classList.add('popup')
   workSection.appendChild(imgPopup)

   //центрируем наш элемент
   imgPopup.style.justifyContent = 'center'
   imgPopup.style.alignItems = 'center'
   imgPopup.style.display = 'none'

   //выводим именно уже картинку
   imgPopup.appendChild(bigImage)

   workSection.addEventListener('click', e => {
      e.preventDefault()
      let target = e.target
      //проверяем что у нашего target именно такой класс
      if (target && target.classList.contains('preview')) {
         //показываем наше окно
         imgPopup.style.display = 'flex'
         document.body.style.overflow = 'hidden'

         //мы получаем то изображенеи которое у нас хнариться (большое изображение)
         const path = target.parentNode.getAttribute('href')

         //присваиваем нашему изображению другое (большее изображение) тоесть меняет картинку
         bigImage.setAttribute('src', path)
      }
      //тут мы закрываем окно если пользователь кликнул на подложку
      //методом matches() - мы ищем совпадение то есть в нашем случае мы проверяем что пользователь кликнул именно на наш popup
      if (target && target.matches('div.popup')) {
         imgPopup.style.display = 'none'
         document.body.style.overflow = 'scroll'
      }
   })
}

export default imagesData
