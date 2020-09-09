
document.addEventListener("DOMContentLoaded", function(e){
    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    const apiUrl = "http://localhost:3000/api/v1/cuisines"
    const commentsUrl = "http://localhost:3000/api/v1/comments"
    let recipeContent
    let allRecipesArray

    let fetchApiData = () => {
        fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    fetchApiData()

    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "col"){
            let cuisineType = e.target.textContent.toLowerCase()
            let cuisineCapitalized = e.target.textContent
            
            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                let formInput = ingredientsFormInput.value.toLowerCase()
                
                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-bar">${cuisineCapitalized}</div>
                    <button id="dairy">Dairy Free 🥛</button>
                    <button id="egg">Egg Free 🥚</button>
                    <button id="nut">Nut Free 🌰</button>
                    <button id="peanut">Peanut Free 🥜</button>
                    <button id="shellfish">Shellfish Free 🦐</button>
                    <button id="wheat">Wheat Free 🌾</button>
                    <button id="soy">Soy Free 🌱</button>
                    <button id="fish">Fish Free 🐟</button>
                </div><br>
                `
                const secondPageContainer = document.querySelector("#second-page")
            
                let fetchFilteredRecipes = () => {
                    fetch(`${apiUrl}/${cuisineType}/?ingredient=${formInput}`)
                    .then(resp => resp.json())
                    .then(data => {
                        allRecipesArray = data 
                        renderRecipes(data)})  
                }
                fetchFilteredRecipes()

                //render single recipe
                let renderRecipe = (recipe) => {
                    let recipeId = recipe.id
                    //console.log(recipeContent)
                    let recipeDiv = document.createElement("div")
                    recipeDiv.className = "filtered-recipes"
                    recipeDiv.innerHTML = 
                    `
                    <br>
                    ${recipe.title}
                    <button class="like-btn">Like ❤️</button>
                    <button class="recipe-detail-btn">See Detail</button> 
                    <div class="recipe-detail" id=${recipeId} style="display: none;"> **RECIPE GOES HERE** </div>
                    <ul class="comments">
                        <li>**USER COMMENT 1**</li>
                        <li>**USER COMMENT 2**</li>
                    </ul>
                    <form class="comment-form">
                        <input class="comment-input" type="text" name="comment" placeholder="Add a comment..."/>
                        <button class="comment-button" type="submit">Add Comment</button>
                    </form>
                    <br>
                    `
                    secondPageContainer.append(recipeDiv)
                }

                //render all recipes
                let renderRecipes = (recipesArray) => {
                    recipesArray.forEach(recipe => {
                        renderRecipe(recipe)
                    })
                }


                // const recipeDetails = document.querySelector(".recipe-detail") 
                // console.log(recipeDetails)
                // const recipeDetailButton = document.querySelector(".recipe-detail-btn")
                // console.log(recipeDetailButton)
                //const commentForm = document.querySelector(".comment-form")
            // const commentButton = document.querySelector(".comment-button")
            
             
              
               
                
            //add comments to database 

                // commentForm.addEventListener("submit", function(e){
                //     e.preventDefault()
                //     let newComment = document.querySelector(".comment-input").value

                //     // fetch(commentsUrl, {
                //     //     method: "POST",
                //     //     headers:{
                //     //         "Content-Type": "application.json",
                //     //         "Accepts": "application/json"
                //     //     },
                //     //     body: JSON.stringify({
                //     //         comments: newComment
                //     //     })
                //     // })
                //     // .then(resp => resp.json())
                //     // .then(recipe => renderRecipe(recipe))
                // })
            })
                
        }
    })

})

