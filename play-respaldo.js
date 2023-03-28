export function setupPlay(element) {
  const form = document.getElementById('form')
  const fragment = document.createDocumentFragment()
  let user_numbers = {}
  let pc_numbers = {}

  //On Key inputs
  const inputs = document.getElementsByClassName('form-control')
  Array.from(inputs).forEach(function(input){
    input.addEventListener("keyup", function(event) {
      if (input.value.length === 1) {
        // Focus on the next sibling
        input.parentElement.nextElementSibling.firstElementChild.focus()
      }
    });
  })

  //Click Play
  form.addEventListener('submit', e => {
    e.preventDefault()

    let flag = 0
    
    for (var i = 0; i < 4; i++){
      //Reset
      e.target[i].classList.remove('is-invalid')
      e.target[i].nextElementSibling.innerHTML = ''
      e.target[i].nextElementSibling.classList.add('d-none')

      //Empty
      if(e.target[i].value.trim() === ''){
        e.target[i].classList.add('is-invalid')
        e.target[i].nextElementSibling.innerHTML = 'Empty field'
        e.target[i].nextElementSibling.classList.remove('d-none')
      }else{
        //Numbers between 1-9
        if(e.target[i].value*1 > 9 || e.target[i].value*1 < 1){
          e.target[i].classList.add('is-invalid')
          e.target[i].nextElementSibling.innerHTML = 'Wrong number'
          e.target[i].nextElementSibling.classList.remove('d-none')
        }else{
          //Repeat number

          for (var j = 0; j < 4; j++){
            if(i != j){
              if(e.target[i].value*1 === e.target[j].value*1){
                e.target[i].classList.add('is-invalid')
                e.target[i].nextElementSibling.innerHTML = 'Repeated'
                e.target[i].nextElementSibling.classList.remove('d-none')

                e.target[j].classList.add('is-invalid')
                e.target[j].nextElementSibling.innerHTML = 'Repeated'
                e.target[j].nextElementSibling.classList.remove('d-none')

                flag += 0
              }else{
                flag += 1
              }
            }
          }

          if(flag === 12){
            //Reset
            e.target[i].classList.remove('is-invalid')
            e.target[i].nextElementSibling.innerHTML = ''
            e.target[i].nextElementSibling.classList.add('d-none')

            const user_number = {
              id: Date.now(),
              first: e.target[0].value*1,
              second: e.target[1].value*1,
              third: e.target[2].value*1,
              fourth: e.target[3].value*1,
            }

            user_numbers[user_number.id] = user_number

            form.reset()

            playGame()
          }
        }
      }
    }
  })

  //Set user number
  const playGame = () => {
    let numbers = [1,2,3,4,5,6,7,8,9]

    //Obtains random number from array "numbers"
    function random_item(numbers){
      return numbers[Math.floor(Math.random()*numbers.length)];
    }
    
    if(Object.keys(pc_numbers).length == 0){
      //PC Secret Number Election
      let pc_number = []

      for (var x = 0; x < 4; x++){
        let random_number = random_item(numbers)
        numbers = numbers.filter(item => item !== random_number)
        pc_number.push(random_number)
      }

      const pc_numberObj = {
        id: Date.now(),
        first: pc_number[0],
        second: pc_number[1],
        third: pc_number[2],
        fourth: pc_number[3],
      }

      pc_numbers[pc_numberObj.id] = pc_numberObj;

    }else{
      console.log('este objeto NO esta vacío')

      const recent_user_number = user_numbers[Object.keys(user_numbers)[Object.keys(user_numbers).length - 1]];

      console.log ('Numero del usuario reciente');
      console.log(recent_user_number);

      console.log ('Numero secreto PC');
      console.log(pc_numbers[0]);

    }
  }
    
}
