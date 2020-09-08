let recipeDropdown = false

document.addEventListener("DOMContentLoaded", function(e){
    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    const commentForm = document.querySelector(".comment-form")
   
    const apiUrl = "http://localhost:3000/api/v1/cuisines"
    const commentsUrl = "http://localhost:3000/api/v1/comments"

    let fetchApiData = () => {
        fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    fetchApiData()
    
    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "col"){
            let cuisineType = e.target.textContent
            //get image for cuisine to append to second page
            // get cuisine type to append to second page
            
            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                let formInput = ingredientsFormInput.value
                //use form input to filter and bring up recipes by ingredient

                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-bar">${cuisineType}</div>
                    <button id="dairy">Dairy Free 🥛</button>
                    <button id="egg">Egg Free 🥚</button>
                    <button id="nut">Nut Free 🌰</button>
                    <button id="peanut">Peanut Free 🥜</button>
                    <button id="shellfish">Shellfish Free 🦐</button>
                    <button id="wheat">Wheat Free 🌾</button>
                    <button id="soy">Soy Free 🌱</button>
                    <button id="fish">Fish Free 🐟</button>
                </div><br>
                <div class="filtered-recipes">
                    **RECIPE TITLE**
                    <button class="like-btn">Like ❤️</button>
                    <button class="recipe-detail-btn">See Detail</button> 
                    <div class="recipe-detail" style="display: none;"> **RECIPE GOES HERE** </div>
                    <ul class="comments">
                        <li>**USER COMMENT**</li>
                        <li>**USER COMMENT 2**</li>
                    </ul>
                    <form class="comment-form">
                        <input class="comment-input" type="text" name="comment" placeholder="Add a comment..."/>
                        <button class="comment-button" type="submit">Post</button>
                    </form>
                </div>
                `
                const recipeDetailButton = document.querySelector(".recipe-detail-btn")
                const recipeDetails = document.querySelector(".recipe-detail")
                
                recipeDetailButton.addEventListener("click", function(e){
                    recipeDropdown = !recipeDropdown
                    if (recipeDropdown) {
                        recipeDetails.style.display = "block";
                        recipeDetailButton.textContent = "Less Detail"
                      } else {
                        recipeDetails.style.display = "none";
                        recipeDetailButton.textContent = "See Detail"
                      }
                })

                //const commentFormButton = 
            })
                
        }
    })

})

/*
 

*/