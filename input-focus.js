export default function inputFocus() {
    const inputs = document.querySelectorAll('.form-control')
    Array.from(inputs).forEach(function(input){
        input.addEventListener("keyup", function() {
            if (input.value.length === 1) {
                input.parentElement.nextElementSibling.firstElementChild.focus();
            }
        });
    });
}