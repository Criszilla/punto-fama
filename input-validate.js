export default function inputValidate() {   
    const button = document.getElementById('play');
    
    button.addEventListener('click', function() {
        let flag = false;
        const inputsArr = document.querySelectorAll('.form-control');

        let count_repeat = 0;

        inputsArr.forEach(function(input,index){
            //Reset
            input.classList.remove('is-invalid');
            input.nextElementSibling.innerHTML = '';
            input.nextElementSibling.classList.add('d-none');

            //Verificación de campós vacíos
            if(input.value.trim() === ''){
                count_repeat+=1;
                input.classList.add('is-invalid');
                input.nextElementSibling.innerHTML = 'Campo vacío';
                input.nextElementSibling.classList.remove('d-none');
            }else if(input.value*1 < 1 || input.value*1 > 9){
                count_repeat+=1;
            
                input.classList.add('is-invalid');
                input.nextElementSibling.innerHTML = 'Número erroneo';
                input.nextElementSibling.classList.remove('d-none');
            }else{
                inputsArr.forEach(function(input2,index2){
                    if(index != index2 && input.value == input2.value){
                        count_repeat+=1;
                        input.classList.add('is-invalid');
                        input.nextElementSibling.innerHTML = 'Número repetido';
                        input.nextElementSibling.classList.remove('d-none');
                        
                        input2.classList.add('is-invalid');
                        input2.nextElementSibling.innerHTML = 'Número repetido';
                        input2.nextElementSibling.classList.remove('d-none');
                    }
                });
            }
        });

        
        if(count_repeat === 0){
            flag = true;
            inputsArr.forEach(function(input){
                //Reset
                input.value = '';
                input.classList.remove('is-invalid');
                input.nextElementSibling.innerHTML = '';
                input.nextElementSibling.classList.add('d-none');
            });
            return `¡A jugar! Adivina el numero de la computadora`;
        }
    });

}