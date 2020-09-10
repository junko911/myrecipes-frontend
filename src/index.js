document.addEventListener("DOMContentLoaded", function(e){

    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    const apiUrl = "http://localhost:3000/api/v1/cuisines"
    const commentsUrl = "http://localhost:3000/api/v1/comments"
    let recipeContent
    let filterKeywords = []
    let cuisineType = ""
    let ingredient = ""

    // let fetchApiData = () => {
    //     fetch(apiUrl)
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
    // }
    // fetchApiData()

    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "cuisine"){
            cuisineType = e.target.id
            let cuisineCapitalized = e.target.textContent

            document.querySelectorAll(".cuisine").forEach(e => e.classList.remove("clicked"))
            e.target.classList.add("clicked")
            document.querySelectorAll(".cuisine").forEach(e => {
                if (e.classList.contains('clicked') === false) {
                    e.style.opacity = "0.5"
                } else {
                    e.style.opacity = ""
                }
            })

            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                ingredient = ingredientsFormInput.value.toLowerCase()
                
                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-nav">
                        <div class="cuisine-bar"><h2>${cuisineCapitalized}</h2></div>
                        <button class="filter-btn" id="dairy" data-status="off">Dairy Free 🥛</button>
                        <button class="filter-btn" id="egg"  data-status="off">Egg Free 🥚</button>
                        <button class="filter-btn" id="nut"  data-status="off">Nut Free 🥜</button>
                        <button class="filter-btn" id="shellfish"  data-status="off">Shellfish Free 🦐</button>
                        <button class="filter-btn" id="wheat"  data-status="off">Wheat Free 🌾</button>
                        <button class="filter-btn" id="soy"  data-status="off">Soy Free 🌱</button>
                    </div>
                    <div class="recipe-container"></div>
                </div><br>
                `

                document.querySelector(".cuisine-bar").style.background = `url(./images/${cuisineType}.jpg) no-repeat center`
                document.querySelector(".cuisine-bar").style.backgroundSize = "cover"
                const recipeContainer = document.querySelector(".recipe-container")
            
                let fetchFilteredRecipes = () => {
                    fetch(`${apiUrl}/${cuisineType}/?ingredient=${ingredient}`)
                    .then(resp => resp.json())
                    .then(data => {
                        allRecipesArray = data 
                        console.log(allRecipesArray)
                        renderRecipes(recipeContainer, data)})  
                }
                fetchFilteredRecipes()

                
                


//                 // const recipeDetails = document.querySelector(".recipe-detail") 
//                 // console.log(recipeDetails)
//                 // const recipeDetailButton = document.querySelector(".recipe-detail-btn")
//                 // console.log(recipeDetailButton)


//             //const commentForm = document.querySelector(".comment-form")
//             // const commentButton = document.querySelector(".comment-button")

                const secondPageContainer = document.querySelector("#second-page")                
                secondPageContainer.addEventListener("click", function(e){
                    if(e.target.className === "recipe-detail-btn"){
                        const recipeDetails = e.target.nextElementSibling
                                console.log("button click working")
                        if(recipeDetails.id === e.target.dataset.id && recipeDetails.style.display === "none"){
                            recipeDetails.style.display = "block"
                            e.target.textContent = "See Less"
                        } else if(recipeDetails.id === e.target.dataset.id && recipeDetails.style.display === "block"){
                            recipeDetails.style.display = "none"
                            e.target.textContent = "See Detail"
                        }
                
                    }
                })
                

               
              
            })
        } else if (e.target.className === "filter-btn") {
            if (e.target.dataset.status === "off") {
                e.target.dataset.status = "on"
                filterKeywords.push(`&${e.target.id}_free=1`)
                fetchRecipes(e.target.parentElement.nextElementSibling)
            } else {
                e.target.dataset.status = "off"
                filterKeywords = filterKeywords.filter( word => word !== `&${e.target.id}_free=1`)
                fetchRecipes(e.target.parentElement.nextElementSibling)
            }
        }        
    })
    
//                 //render all recipes
    const renderRecipes = (container, recipesArray) => {
        document.querySelector('.recipe-container').innerHTML = ""

        recipesArray.forEach(recipe => {
            renderRecipe(container, recipe)
        })
    }
//                 //render single recipe
    const renderRecipe = (container, recipe) => {
        let recipeId = recipe.id
        console.log(recipe.content)
        //console.log(recipeContent)
        let recipeDiv = document.createElement("div")
        recipeDiv.className = "filtered-recipes"
        recipeDiv.innerHTML = 
        `
        <br>
        <img src="${recipe.image}">
        <h3>${recipe.title}</h3>
        <button class="like-btn">Like ❤️</button>
        <button class="recipe-detail-btn" data-id=${recipeId}>See Detail</button> 
        <div class="recipe-detail" id=${recipeId} style="display: none;"> ${recipe.content} </div>
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
        container.append(recipeDiv)
    }

    // Rerender recipe when filter buttons are clicked
    const fetchRecipes = container => {
        const filterKeyword = filterKeywords.join('')
        if (ingredient === "") {
            fetch(`${apiUrl}/${cuisineType}?${filterKeyword}`)
            .then(resp => resp.json())
            .then(data => renderRecipes(container, data))   
        } else {
            fetch(`${apiUrl}/${cuisineType}?ingredient=${ingredient}&${filterKeyword}`)
            .then(resp => resp.json())
            .then(data => renderRecipes(container, data))  
        }
    }
})



 /*
//                     const recipeDetailButton = document.querySelector(".recipe-detail-btn")
//                     const recipeDetails = document.querySelector(".recipe-detail")
//                     const commentForm = document.querySelector(".comment-form")
//                     // const commentButton = document.querySelector(".comment-button")
//                     recipeDetailButton.addEventListener("click", function(e){
//                     recipeDropdown = !recipeDropdown
//                     if (recipeDropdown) {
//                         recipeDetails.style.display = "block";
//                         recipeDetailButton.textContent = "Less Detail"
//                       } else {
//                         recipeDetails.style.display = "none";
//                         recipeDetailButton.textContent = "See Detail"
//                       }
//                     })
//                 */

//add comments to database 

//                 // commentForm.addEventListener("submit", function(e){
//                 //     e.preventDefault()
//                 //     let newComment = document.querySelector(".comment-input").value

//                 //     // fetch(commentsUrl, {
//                 //     //     method: "POST",
//                 //     //     headers:{
//                 //     //         "Content-Type": "application.json",
//                 //     //         "Accepts": "application/json"
//                 //     //     },
//                 //     //     body: JSON.stringify({
//                 //     //         comments: newComment
//                 //     //     })
//                 //     // })
//                 //     // .then(resp => resp.json())
//                 //     // .then(recipe => renderRecipe(recipe))
//                 //       
//                 // })



                   
                    
                        
              