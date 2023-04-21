export function setupPlay(element) {
  const form = document.getElementById('form')
  let user_numbersArr = [];
  let user_pointsArr = [];
  let pc_numbersArr = [];
  let pc_pointsArr = [];

  //On Key inputs
  const inputs = document.getElementsByClassName('form-control')
  Array.from(inputs).forEach(function(input){
    input.addEventListener("keyup", function(event) {
      if (input.value.length === 1) {
        // Focus on the next sibling
        input.parentElement.nextElementSibling.firstElementChild.focus();
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

            const user_numberObj = {
              first: e.target[0].value*1,
              second: e.target[1].value*1,
              third: e.target[2].value*1,
              fourth: e.target[3].value*1,
            }

            user_numbersArr.push(user_numberObj);

            form.reset()

            playGame()
          }
        }
      }
    }
  })

  //Set user number
  const playGame = () => {
    document.getElementById('messages').innerHTML = 'Adivina el número de la computadora'

    let numbers = [1,2,3,4,5,6,7,8,9]

    //Obtains random number from array "numbers"
    function random_item(numbers){
      return numbers[Math.floor(Math.random()*numbers.length)];
    }

    if(pc_numbersArr.length == 0){
      console.log('No tiene valores')

      let pc_number = [];

      for (var x = 0; x < 4; x++){
        let random_number = random_item(numbers)
        numbers = numbers.filter(item => item !== random_number)
        pc_number.push(random_number)
      }

      const pc_numberObj = {
        first: pc_number[0],
        second: pc_number[1],
        third: pc_number[2],
        fourth: pc_number[3],
      }

      pc_numbersArr.push(pc_numberObj);

    }else{
      console.log('tiene valores');

      //User Secret Number
      const usnObj = user_numbersArr[0];

      //PC Secret Number
      const pcsnObj = pc_numbersArr[0];

      console.log(usnObj);
      console.log(pcsnObj);

      //Ultimo numero intentado por el usuario (Last Try Number)
      let user_ltn = user_numbersArr.length-1;
      let user_ltnObj = user_numbersArr[user_ltn];

      var point = []
      
      //Compare numbers
      Object.entries(user_ltnObj).forEach(item => {
        const [name, value] = item;
        Object.entries(pcsnObj).forEach(item2 => {
          const [name2, value2] = item2;
          if(name == name2 && value == value2){point.push('F');}
          if(name != name2 && value == value2){point.push('P');}          
        });
      });

      const user_pointObj = {
        first: point[0],
        second: point[1],
        third: point[2],
        fourth: point[3],
      }

      user_pointsArr.push(user_pointObj);

      const my_plays = document.getElementById('my_plays');
      const my_score = document.getElementById('my_score');

      //Make the User Play List in Html
      var my_playList = '<ul>';
      user_numbersArr.slice(1).forEach(function(item){
        my_playList += '<li>'+item.first+','+item.second+','+item.third+','+item.fourth+'</li>';
      });
      my_playList += '</ul>'


      //Make the User Score List in Html
      var my_scoreList = '<ul>';
      user_pointsArr.forEach(function(item){
        var val1;
        var val2;
        var val3;
        var val4;

        if(typeof item.first != 'undefined'){val1 = item.first}else{val1 = ''}
        if(typeof item.second != 'undefined'){val2 = item.second}else{val2 = ''}
        if(typeof item.third != 'undefined'){val3 = item.third}else{val3 = ''}
        if(typeof item.fourth != 'undefined'){val4 = item.fourth}else{val4 = ''}

        my_scoreList += '<li>'+val1+val2+val3+val4+'</li>';
      });
      my_scoreList += '</ul>';

      my_plays.innerHTML = my_playList;
      my_score.innerHTML = my_scoreList;

      //Check win game
      if(point[0]=='F' && point[1]=='F' && point[2]=='F' && point[3]=='F'){
        alert('GANASTE EL JUEGO');
      }

    }
  }    
}
