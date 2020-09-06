document.addEventListener("DOMContentLoaded", function(e){
    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    
    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "col"){
            let cuisineType = e.target.textContent
            // get cuisine type to append to new page
            
            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                let formInput = ingredientsFormInput.value
                //use form input to filter and bring up recipes by ingredient

                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-bar">${cuisineType}</div>
                    <button id="nuts">Dairy Free</button>
                    <button id="eggs">Egg Free</button>
                    <button id="nuts">Nut Free</button>
                    <button id="eggs">Peanut Free</button>
                    <button id="nuts">Shellfish Free</button>
                    <button id="eggs">Wheat Free</button>
                    <button id="nuts">Soy Free</button>
                    <button id="eggs">Fish Free</button>
                </div>
                `
            })
            
        }
    })

})