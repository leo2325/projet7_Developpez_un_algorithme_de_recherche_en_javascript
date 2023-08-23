// Déclaration de constantes
// Conteneur des fiches de recettes
const recettesSection = document.getElementById("recettes_section");
// Input de saisie utilisateur recherche principale
const inputSearchBar = document.getElementById('site-search');
// Listes de recherches spécifiques
const ingredientsListElementBox = document.querySelector("#ingredientsSearchListElement_box");
const appareilsListElementBox = document.querySelector("#appareilsSearchListElement_box");
const ustensilesListElementBox = document.querySelector("#ustensilesSearchListElement_box");

// Fonction pour afficher toutes les fiches de recettes
function displayAllRecipes() {
    const allRecipesHTML = window.recipes.reduce(function(html, recipe) {
        return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
    }, '');
    recettesSection.innerHTML = allRecipesHTML;
    // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
    updateRecipeCount();
}
// Initialisation : afficher toutes les fiches de recettes
displayAllRecipes();

// Fonction pour afficher le nombre total de fiches de recettes affichées sur la page
function updateRecipeCount() {
    const recipesCount = document.getElementById('recipesCount');
    const totalRecipes = recettesSection.querySelectorAll('article').length;
    recipesCount.innerText = `${totalRecipes} recettes`;
};



// Event de l'input de saisie utilisateur recherche principale
inputSearchBar.addEventListener('input', function(event) {
    const searchText = event.target.value.trim().toLowerCase();

    // Vider les listes de recherches spécifiques
    ingredientsListElementBox.innerHTML = '';
    appareilsListElementBox.innerHTML = '';
    ustensilesListElementBox.innerHTML = '';

    // Si la longueur du texte entré par l'utilisateur est égale ou supérieure à 3 caractères
    if (searchText.length >= 3) {
        // Filtrer les recettes en fonction du texte saisi
        const filteredRecipes = window.recipes.filter(function(recipe) {
            return (
                // par titre
                recipe.name.toLowerCase().includes(searchText) ||
                // par description
                recipe.description.toLowerCase().includes(searchText) ||
                // par ingrédient
                recipe.ingredients.some(function(ingredient) {
                    return ingredient.ingredient.toLowerCase().includes(searchText);
                })
            );
        });

        // Utilise la méthode reduce pour générer le contenu HTML des recettes filtrées
        const filteredRecipesHTML = filteredRecipes.reduce(function(html, recipe) {
            return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML;
        }, '');

        // Met à jour l'affichage des recettes filtrées sur la page
        recettesSection.innerHTML = filteredRecipesHTML;

        // Mettre à jour les listes avec les éléments correspondant aux résultats de recherche
        filteredRecipes.forEach(function(recipe) {
            recipe.ingredients.forEach(function(ingredient) {
                const ingredientName = ingredient.ingredient;
                if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
                    const ingredientElement = document.createElement('div');
                    ingredientElement.dataset.ingredient = ingredientName;
                    ingredientElement.textContent = ingredientName;
                    ingredientsListElementBox.appendChild(ingredientElement);
                }
            });
            
            const applianceName = recipe.appliance;
            if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
                const applianceElement = document.createElement('div');
                applianceElement.dataset.appliance = applianceName;
                applianceElement.textContent = applianceName;
                appareilsListElementBox.appendChild(applianceElement);
            }

            recipe.ustensils.forEach(function(ustensil) {
                if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
                    const ustensilElement = document.createElement('div');
                    ustensilElement.dataset.ustensil = ustensil;
                    ustensilElement.textContent = ustensil;
                    ustensilesListElementBox.appendChild(ustensilElement);
                }
            });
        });
    } else {
        // Afficher à nouveau toutes les fiches de recettes
        displayAllRecipes();

        // Remettre à jour les listes avec tous les ingrédients, ustensiles et appareils
        window.recipes.forEach(function(recipe) {
            recipe.ingredients.forEach(function(ingredient) {
                
                const ingredientName = ingredient.ingredient;
                    if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
                        const ingredientElement = document.createElement('div');
                        ingredientElement.dataset.ingredient = ingredientName;
                        ingredientElement.textContent = ingredientName;
                        ingredientsListElementBox.appendChild(ingredientElement);
                    }
            });

            const applianceName = recipe.appliance;
            if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
                const applianceElement = document.createElement('div');
                applianceElement.dataset.appliance = applianceName;
                applianceElement.textContent = applianceName;
                appareilsListElementBox.appendChild(applianceElement);
            }

            recipe.ustensils.forEach(function(ustensil) {
                if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
                    const ustensilElement = document.createElement('div');
                    ustensilElement.dataset.ustensil = ustensil;
                    ustensilElement.textContent = ustensil;
                    ustensilesListElementBox.appendChild(ustensilElement);
                }
            });
        });
    }
    // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
    updateRecipeCount(); 
});



// Fonction pour créer un tag à partir de l'élément cliqué, 
// déplacer l'élément cliqué dans la liste,
// changer le style de l'élément cliqué,
// 
function createTagFromClick(event) {
    const clickedElement = event.target;
    const tagText = clickedElement.textContent.trim();
    const parentList = clickedElement.parentElement;

    if (tagText && !existingTags.has(tagText)) {
        existingTags.add(tagText); // Ajoute la valeur au set des tags existants

        // Créer le tag
        const newTag = tagsFactory({ appliance: tagText }).getTagsDOM(tagText);
        tagsSection.appendChild(newTag);

        // Ajouter l'icône de fermeture à l'élément cliqué
        const closeIcon = document.createElement('span');
        closeIcon.setAttribute('class', 'fa-solid fa-xmark close-icon');
        clickedElement.appendChild(closeIcon);
        // Gestionnaire d'événements pour la suppression de l'élément
        closeIcon.addEventListener('click', function(event) {
            clickedElement.remove();
            event.stopPropagation(); // Empêche la propagation de l'événement aux autres gestionnaires d'événements
        });
        
        // Déplacer l'élément en haut de la liste en changeant sa place
        parentList.insertBefore(clickedElement, parentList.firstChild);        
        // Appliquer le style sur l'élément déplacé
        clickedElement.setAttribute('class', 'listElementSelected');
    };
    // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
    updateRecipeCount();
};

// Écouteurs d'événements pour les listes d'ingrédients, d'appareils et d'ustensiles
ingredientsListElementBox.addEventListener('click', createTagFromClick);
appareilsListElementBox.addEventListener('click', createTagFromClick);
ustensilesListElementBox.addEventListener('click', createTagFromClick);




// Fonction de suppression du tag
function removeTag(tagText) {
    if (existingTags.has(tagText)) {
        existingTags.delete(tagText); // Supprime la valeur du set des tags existants
    
        // Recherche de l'élément de liste correspondant et retrait de la classe de sélection
        const ingredientElement = ingredientsListElementBox.querySelector(`[data-ingredient="${tagText}"]`);
        const applianceElement = appareilsListElementBox.querySelector(`[data-appliance="${tagText}"]`);
        const ustensilElement = ustensilesListElementBox.querySelector(`[data-ustensil="${tagText}"]`);
    
        if (ingredientElement) {
            ingredientElement.classList.remove('listElementSelected');
        }
        else if (applianceElement) {
            applianceElement.classList.remove('listElementSelected');
        }
        else if (ustensilElement) {
            ustensilElement.classList.remove('listElementSelected');
        }
    }
    // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
    updateRecipeCount();
};

