/*мы создали функцию которая будет валидировть input и будет позволять вводить только цифры
 это мы  сделали для последующего переиспользования*/

const checkNumberInputs = selector => {
   const numInputs = document.querySelectorAll(selector)
   //делаем саму валидацию
   //самый простой способ провалидировать это использовать регулярные выражения
   numInputs.forEach(input => {
      input.addEventListener('input', () => {
         input.value = input.value.replace(/\D/, '') //если находится не число оно просто заменяется пустой строкой
      })
   })
}

export default checkNumberInputs
