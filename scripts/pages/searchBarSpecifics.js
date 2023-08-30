// DECLARATION DES ELEMENTS DU DOM
// elements de liste contenant les différentes options 
const ingredientsSearchBar = document.getElementById('ingredientsSearchBar');
const appareilsSearchBar = document.getElementById('appareilsSearchBar');
const ustensilesSearchBar = document.getElementById('ustensilesSearchBar');

const ingredientsSearchListElement_box = document.getElementById('ingredientsSearchListElement_box');
const appareilsSearchListElement_box = document.getElementById('appareilsSearchListElement_box');
const ustensilesSearchListElement_box = document.getElementById('ustensilesSearchListElement_box');

const ingredientsListDownIcon = document.getElementById('ingredientsListDownIcon');
const appareilsListDownIcon = document.getElementById('appareilsListDownIcon');
const ustensilesListDownIcon = document.getElementById('ustensilesListDownIcon');

const ingredientsSearchList = document.getElementById('ingredientsSearchList');
const appareilsSearchList = document.getElementById('appareilsSearchList');
const ustensilesSearchList = document.getElementById('ustensilesSearchList');

let ingredientVisible = false;
let appareilsVisible = false;
let ustensilesVisible = false;

/* Fonction dérouler la sortList */
function launchSearchSpecific(event) {
    const clickedIcon = event.target;
    if (clickedIcon === ingredientsListDownIcon) {
        ingredientsSearchBar.classList.toggle('visible');
        ingredientsSearchListElement_box.classList.toggle('visible');
        ingredientsListDownIcon.classList.toggle('rotated');
        if (!ingredientVisible)
            ingredientsSearchList.classList.add('searchActive');
        else
            ingredientsSearchList.classList.remove('searchActive')
        ingredientVisible = !ingredientVisible;
    }
    else if (clickedIcon === appareilsListDownIcon) {
        appareilsSearchBar.classList.toggle('visible');
        appareilsSearchListElement_box.classList.toggle('visible');
        appareilsListDownIcon.classList.toggle('rotated');
        if (!appareilsVisible)
            appareilsSearchList.classList.add('searchActive');
        else
            appareilsSearchList.classList.remove('searchActive')
        appareilsVisible = !appareilsVisible;
    }
    else if (clickedIcon === ustensilesListDownIcon) {
        ustensilesSearchBar.classList.toggle('visible');
        ustensilesSearchListElement_box.classList.toggle('visible');
        ustensilesListDownIcon.classList.toggle('rotated');
        if (!ustensilesVisible)
            ustensilesSearchList.classList.add('searchActive');
        else
            ustensilesSearchList.classList.remove('searchActive')
        ustensilesVisible = !ustensilesVisible;
    }
}

/* Evenement affichage de la classList */
ingredientsListDownIcon.addEventListener('click', launchSearchSpecific);
appareilsListDownIcon.addEventListener("click", launchSearchSpecific);
ustensilesListDownIcon.addEventListener("click", launchSearchSpecific);








// INPUT DE RECHERCHE SECONDAIRE 

// DECLARATION DES ELEMENTS DU DOM
// Les inputs
const inputIngredientsSearch = document.getElementById("inputIngredientsSearch");
const inputAppareilsSearch = document.getElementById("inputAppareilsSearch");
const inputUstensilesSearch = document.getElementById("inputUstensilesSearch");


// RECHERCHE PAR INGREDIENTS
// Event de l'input de saisie utilisateur recherche ingredients
inputIngredientsSearch.addEventListener('input', function (event) {
    const searchText = event.target.value.trim().toLowerCase();
    // Vider la liste de recherche ingrédients
    ingredientsSearchListElement_box.innerHTML = '';

    // Filtrer les recettes en fonction du texte saisi
    const filteredRecipes = window.recipes.filter(function (recipe) {
        return (
            recipe.ingredients.some(function (ingredient) {
                const ingredientName = ingredient.ingredient.toLowerCase();
                return ingredientName.includes(searchText);
            })
        );
    });

    // Utilise la méthode reduce pour générer le contenu HTML des recettes filtrées
    const filteredRecipesHTML = filteredRecipes.reduce(function (html, recipe) {
        return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
    }, '');
    // Met à jour l'affichage des recettes filtrées sur la page
    recettesSection.innerHTML = filteredRecipesHTML;

    // Filtrer les ingrédients en fonction du texte saisi
    const filteredIngredients = window.recipes.reduce(function (ingredients, recipe) {
        recipe.ingredients.forEach(function (ingredient) {
            const ingredientName = ingredient.ingredient.toLowerCase();
            if (ingredientName.includes(searchText)) {
                ingredients.add(ingredientName);
            }
        });
        return ingredients;
    }, new Set());
    // Mettre à jour la liste des ingrédients affichés dans la page
    filteredIngredients.forEach(function (ingredientName) {
        const ingredientElement = document.createElement('li');
        ingredientElement.textContent = ingredientName;
        ingredientElement.dataset.ingredient = ingredientName;
        ingredientsSearchListElement_box.appendChild(ingredientElement);
    });
    // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
    updateRecipeCount();
});



// RECHERCHE PAR APPAREILS
// Event de l'input de saisie utilisateur recherche appareils
inputAppareilsSearch.addEventListener('input', function (event) {
    const searchText = event.target.value.trim().toLowerCase();
    // Vider la liste de recherche appareils
    appareilsSearchListElement_box.innerHTML = '';

    // Filtrer les recettes en fonction du texte saisi
    const filteredRecipes = window.recipes.filter(function (recipe) {
        return (
            recipe.appliance.toLowerCase().includes(searchText)
        );
    });

    // Utilise la méthode reduce pour générer le contenu HTML des recettes filtrées
    const filteredRecipesHTML = filteredRecipes.reduce(function (html, recipe) {
        return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
    }, '');
    recettesSection.innerHTML = filteredRecipesHTML;

    const filteredAppareils = window.recipes.reduce(function (appareils, recipe) {
        const appareilName = recipe.appliance.toLowerCase();
        if (appareilName.includes(searchText)) {
            appareils.add(appareilName);
        }
        return appareils;
    }, new Set());

    filteredAppareils.forEach(function (appareilName) {
        const appareilElement = document.createElement('li');
        appareilElement.textContent = appareilName;
        appareilElement.dataset.appliance = appareilName;
        appareilsSearchListElement_box.appendChild(appareilElement);
    });
    updateRecipeCount();
});



// RECHERCHE PAR USTENSILES
inputUstensilesSearch.addEventListener('input', function (event) {
    const searchText = event.target.value.trim().toLowerCase();
    ustensilesSearchListElement_box.innerHTML = '';

    const filteredRecipes = window.recipes.filter(function (recipe) {
        return (
            recipe.ustensils.some(function (ustensil) {
                const ustensilName = ustensil.toLowerCase();
                return ustensilName.includes(searchText);
            })
        );
    });

    const filteredRecipesHTML = filteredRecipes.reduce(function (html, recipe) {
        return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
    }, '');
    recettesSection.innerHTML = filteredRecipesHTML;

    // Filtrer les ustensiles en fonction du texte saisi
    const filteredUstensiles = window.recipes.reduce(function (ustensiles, recipe) {
        recipe.ustensils.forEach(function (ustensil) {
            const ustensilName = ustensil.toLowerCase();
            if (ustensilName.includes(searchText)) {
                ustensiles.add(ustensilName);
            }
        });
        return ustensiles;
    }, new Set());

    filteredUstensiles.forEach(function (ustensilName) {
        const ustensilElement = document.createElement('li');
        ustensilElement.textContent = ustensilName;
        ustensilElement.dataset.ustensil = ustensilName;
        ustensilesSearchListElement_box.appendChild(ustensilElement);
    });
    updateRecipeCount();
});