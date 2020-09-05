document.addEventListener("DOMContentLoaded", function(e){
    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    
    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "col"){
            //grab textContent of button clicked
            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()
            })
            
        }
    })

})