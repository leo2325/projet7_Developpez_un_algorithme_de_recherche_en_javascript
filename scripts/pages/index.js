// Fonction asynchrone de récupération des données depuis le fichier data recipes.js
async function getAllRecettes() {
    try {
        // Retourner directement les données du fichier data recipes.js
        return window.recipes;
    } catch (error) {
        // En cas d'erreur, retourner un tableau vide pour éviter les problèmes lors de l'affichage
        console.error('Erreur lors de la récupération des recettes:', error);
        return []; 
    }
} 

// Fonction asynchrone d'affichage des recettes
async function displayData(recipes) {
    try {
        const recettesSection = document.querySelector("#recettes_section");

        // Constantes éléments HTML <ul>, qui acceuillent les éléments de liste des recherches tag
        const ingredientsListElementBox = document.querySelector("#ingredientsSearchListElement_box");
        const appareilsListElementBox = document.querySelector("#appareilsSearchListElement_box");
        const ustensilesListElementBox = document.querySelector("#ustensilesSearchListElement_box");

        recipes.forEach((recipe) => {
            const recettesModel = recettesFactory(recipe);
            const recettesCardDOM = recettesModel.getRecettesCardDOM();
            
            recettesSection.appendChild(recettesCardDOM);

            // Affichage des ingrédients
            recipe.ingredients.forEach((ingredient) => {
                // Constante de la valeur de la propriété ingredient à partir de l'objet ingredient.
                const ingredientName = ingredient.ingredient;
                // On vérifie si l'ingrédient n'existe pas déjà dans la liste
                if ( ingredientsListElementBox.querySelector(`li[data-ingredient="${ingredientName}"]`) === null){
                    
                    const ingredientElement = document.createElement('li');

                    ingredientElement.textContent = ingredientName;
                    ingredientElement.dataset.ingredient = ingredientName;
                    ingredientsListElementBox.appendChild(ingredientElement);
                }
            });

            // Affichage des appareils
            const applianceName = recipe.appliance;
            if ( appareilsListElementBox.querySelector(`li[data-appliance="${applianceName}"]`) === null){
                
                const applianceElement = document.createElement('li');

                applianceElement.textContent = applianceName;
                applianceElement.dataset.appliance = applianceName;
                appareilsListElementBox.appendChild(applianceElement);
            }

            // Affichage des ustensiles
            recipe.ustensils.forEach((ustensil) => {
                if ( ustensilesListElementBox.querySelector(`li[data-ustensil="${ustensil}"]`) === null) {
                    
                    const ustensilElement = document.createElement('li');

                    ustensilElement.textContent = ustensil;
                    ustensilElement.dataset.ustensil = ustensil;
                    ustensilesListElementBox.appendChild(ustensilElement);
                }
            });
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage des recettes:', error);
    }
}

// fonction d'initialisation appelant getAllRecettes() puis displaydata().
async function init() {
    try {
        // Récupère les datas des recettes
        const recipes = await getAllRecettes();
        displayData(recipes);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

init();