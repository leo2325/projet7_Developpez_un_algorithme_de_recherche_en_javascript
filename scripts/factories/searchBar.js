// Décalaration des constantes éléments du DOM
const recettesSection = document.getElementById("recettes_section");
const inputSearchBar = document.getElementById('site-search');

// Écoute de l'événement "input"
inputSearchBar.addEventListener('click', function(event) {
   // Réinitialise la valeur de l'input à une chaîne vide 
   event.target.value = ''; 
});

inputSearchBar.addEventListener('input', function(event) {
    // event.target.value Le texte saisi par l'utilisateur dans la barre de recherche,
    // trim() le nettoie en enlevant les espaces en début et en fin,
    // toLowerCase() le transforme en minuscules 
    const searchText = event.target.value.trim().toLowerCase();
    // Si la longueur du texte entré par l'utilisateur est égale ou plus de 3 caractères
    if (searchText.length >= 3) {
        // Filtrage des éléments 
        const filteredRecipes = window.recipes.filter(function(recipe) {
                    // par noms
            return  recipe.name.toLowerCase().includes(searchText) ||
                    // par descriptions
                    recipe.description.toLowerCase().includes(searchText) ||
                    // par ingrédients
                    recipe.ingredients.some(function(ingredient) {
                       return ingredient.ingredient.toLowerCase().includes(searchText);
                   });
        });
        // Utilise la méthode reduce pour générer le contenu HTML des recettes filtrées
        const filteredRecipesHTML = filteredRecipes.reduce(function(html, recipe) {
            return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
        }, '');
        // Met à jour l'affichage des recettes filtrées sur la page
        recettesSection.innerHTML = filteredRecipesHTML; 
    }
     // Si la longueur du texte entré par l'utilisateur est moins de 3 caractères
    else {
        recettesSection.innerHTML;
    }
});

