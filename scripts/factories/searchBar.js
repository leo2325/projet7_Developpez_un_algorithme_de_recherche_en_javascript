// DECLARATION DES CONSTANTES
// Conteneur des fiches de recettes
const recettesSection = document.getElementById('recettes_section')
// Input de saisie utilisateur recherche principale
const inputSearchBar = document.getElementById('site-search')
// Listes de recherches spécifiques
const ingredientsListElementBox = document.querySelector('#ingredientsSearchListElement_box')
const appareilsListElementBox = document.querySelector('#appareilsSearchListElement_box')
const ustensilesListElementBox = document.querySelector('#ustensilesSearchListElement_box')

// FONCTION POUR AFFICHER TOUTES LES FICHES DE RECETTES
function displayAllRecipes () {
  let allRecipesHTML = ''

  // Utilisation d'une boucle for...of pour parcourir les recettes
  for (const recipe of window.recipes) {
    /* global recettesFactory */
    /* eslint no-undef: "error" */
    allRecipesHTML += recettesFactory(recipe).getRecettesCardDOM().outerHTML
  }

  recettesSection.innerHTML = allRecipesHTML
  updateRecipeCount()
}
// Initialisation : afficher toutes les fiches de recettes
displayAllRecipes()

// FONCTION AFFICHE LE NOMBRE TOTAL DE FICHES DE RECETTES AFFICHEES SUR LA PAGE
function updateRecipeCount () {
  const recipesCount = document.getElementById('recipesCount')
  const recipeArticles = recettesSection.getElementsByTagName('article') // Utilisation de getElementsByTagName pour sélectionner les articles

  // Utilisation d'une boucle for au lieu de querySelectorAll
  let totalRecipes = 0
  for (let i = 0; i < recipeArticles.length; i++) {
    totalRecipes++
  }

  recipesCount.innerText = `${totalRecipes} recettes`
}

// Initialisation du tableau de recettes filtrées, tableau vide
const selectedTags = []

// Event de l'input de saisie utilisateur recherche principale
inputSearchBar.addEventListener('input', function (event) {
  const searchText = event.target.value.trim().toLowerCase()
  search(searchText, selectedTags)
})

// FONCTION POUR CREER UN TAG A PARTIR DE : L'ELEMENT CLIQUE -> LE DEPLACER DANS LA LISTE ET CHANGER SON STYLE
function createTagFromClick (event) {
  const clickedElement = event.target
  const tagText = clickedElement.textContent.trim()
  const parentList = clickedElement.parentElement
  const tagsSection = document.getElementById('tags_section')

  if (tagText && !selectedTags.includes(tagText)) {
    selectedTags.push(tagText) // Ajoute la valeur au set des tags existants
    // Créer le tag
    /* global tagFactory */
    /* eslint no-undef: "error" */
    const newTag = tagFactory({ appliance: tagText }).getTagsDOM(tagText, () => removeTag(tagText))

    tagsSection.appendChild(newTag)
    // Ajouter l'icône de fermeture à l'élément cliqué
    const closeIcon = document.createElement('span')
    closeIcon.setAttribute('class', 'fa-solid fa-xmark close-icon')
    clickedElement.appendChild(closeIcon)
    // Gestionnaire d'événements pour la suppression de l'élément
    closeIcon.addEventListener('click', function (event) {
      removeTag(clickedElement.innerText)
      event.stopPropagation() // Empêche la propagation de l'événement aux autres gestionnaires d'événements
    })
    // Déplacer l'élément en haut de la liste en changeant sa place
    parentList.insertBefore(clickedElement, parentList.firstChild)
    // Appliquer le style sur l'élément déplacé
    clickedElement.setAttribute('class', 'listElementSelected')
  }
  filterRecipesByTag()
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
};

// FONCTION POUR FILTRER LES RECETTES PAR TAG, SELON L'ELEMENT CLIQUE
function filterRecipesByTag () {
  search(document.getElementById('site-search').value, selectedTags)
};

// Écouteurs d'événements pour les listes d'ingrédients, d'appareils et d'ustensiles
ingredientsListElementBox.addEventListener('click', createTagFromClick)
appareilsListElementBox.addEventListener('click', createTagFromClick)
ustensilesListElementBox.addEventListener('click', createTagFromClick)

// FONCTION DE SUPPRESSION DU TAG
function removeTag (tagText) {
  if (selectedTags.includes(tagText)) {
    // selectedTags.delete(tagText); // Supprime la valeur du set des tags existants
    selectedTags.splice(selectedTags.indexOf(tagText), 1)

    // Recherche de l'élément de liste correspondant et retrait de la classe de sélection
    const ingredientElement = ingredientsListElementBox.querySelector(`[data-ingredient="${tagText}"]`)
    const applianceElement = appareilsListElementBox.querySelector(`[data-appliance="${tagText}"]`)
    const ustensilElement = ustensilesListElementBox.querySelector(`[data-ustensil="${tagText}"]`)

    if (ingredientElement) {
      ingredientElement.classList.remove('listElementSelected')
      ingredientElement.lastChild.remove()
    } else if (applianceElement) {
      applianceElement.classList.remove('listElementSelected')
      applianceElement.lastChild.remove()
    } else if (ustensilElement) {
      ustensilElement.classList.remove('listElementSelected')
      ustensilElement.lastChild.remove()
    }

    const tags = document.querySelectorAll('.tag_container')
    for (let t = 0; t < tags.length; t++) {
      const tag = tags[t] // extrait l'élément HTML actuel à partir de l'objet tags.
      if (tag.firstChild.innerText === tagText) {
        tag.remove()
      }
    }
  }
  filterRecipesByTag()
  updateRecipeCount()
};

function search (text, tags) {
  const searchText = text.trim().toLowerCase()
  let filteredRecipes = []

  // Vider les listes de recherches spécifiques
  ingredientsListElementBox.innerHTML = ''
  appareilsListElementBox.innerHTML = ''
  ustensilesListElementBox.innerHTML = ''

  // Si la longueur du texte entré par l'utilisateur est égale ou supérieure à 3 caractères
  if (searchText.length >= 3) {
    // Filtrer les recettes en fonction du texte saisi
    for (let i = 0; i < window.recipes.length; i++) {
      const recipe = window.recipes[i]
      if (
      // par titre
        recipe.name.toLowerCase().includes(searchText) ||
                // par description
                recipe.description.toLowerCase().includes(searchText) ||
                // par ingrédient
                recipe.ingredients.some(function (ingredient) {
                  return ingredient.ingredient.toLowerCase().includes(searchText)
                })
      ) {
        filteredRecipes.push(recipe)
      }
    }

    // Mettre à jour les listes avec les éléments correspondant aux résultats de recherche
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i]
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = recipe.ingredients[j].ingredient
        if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
          const ingredientElement = document.createElement('div')
          ingredientElement.dataset.ingredient = ingredientName
          ingredientElement.textContent = ingredientName
          ingredientsListElementBox.appendChild(ingredientElement)
        }
      }

      const applianceName = recipe.appliance
      if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
        const applianceElement = document.createElement('div')
        applianceElement.dataset.appliance = applianceName
        applianceElement.textContent = applianceName
        appareilsListElementBox.appendChild(applianceElement)
      }

      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ustensil = recipe.ustensils[j]
        if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
          const ustensilElement = document.createElement('div')
          ustensilElement.dataset.ustensil = ustensil
          ustensilElement.textContent = ustensil
          ustensilesListElementBox.appendChild(ustensilElement)
        }
      }
    }
  } else {
  // Si la longueur du texte entré par l'utilisateur est inférieure à 3 caractères
    // Afficher à nouveau toutes les fiches de recettes
    displayAllRecipes()

    // Remettre à jour les listes avec tous les ingrédients, ustensiles et appareils
    for (let i = 0; i < window.recipes.length; i++) {
      const recipe = window.recipes[i]
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = recipe.ingredients[j].ingredient
        if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
          const ingredientElement = document.createElement('div')
          ingredientElement.dataset.ingredient = ingredientName
          ingredientElement.textContent = ingredientName
          ingredientsListElementBox.appendChild(ingredientElement)
        }
      }

      const applianceName = recipe.appliance
      if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
        const applianceElement = document.createElement('div')
        applianceElement.dataset.appliance = applianceName
        applianceElement.textContent = applianceName
        appareilsListElementBox.appendChild(applianceElement)
      }

      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ustensil = recipe.ustensils[j]
        if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
          const ustensilElement = document.createElement('div')
          ustensilElement.dataset.ustensil = ustensil
          ustensilElement.textContent = ustensil
          ustensilesListElementBox.appendChild(ustensilElement)
        }
      }
    }
  }

  filteredRecipes = (filteredRecipes.length > 0 || searchText.length >= 3 ? filteredRecipes : window.recipes).filter(function (recipe) {
    // every(), vérifie si une condition est vraie pour tous les éléments du tableau
    // s'assure que tous les tags actifs correspondent à au moins un critère dans la recette.
    return tags.every(function (tag) {
      return recipe.name.toLowerCase().includes(tag.toLowerCase()) ||
                recipe.description.toLowerCase().includes(tag.toLowerCase()) ||
                recipe.ingredients.some(function (ingredient) {
                  return ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                }) ||
                recipe.appliance.toLowerCase().includes(tag.toLowerCase()) ||
                recipe.ustensils.some(function (ustensil) {
                  return ustensil.toLowerCase().includes(tag.toLowerCase())
                })
    })
  })

  // Si la recherche de l'utilisateur ne correspond à aucune des recettes
  if (filteredRecipes.length === 0) {
    recettesSection.innerHTML =
            '<p id="noMatchingRecipes">  Aucune recette ne contient \'' + searchText + '\' vous pouvez chercher "tarte aux pommes", "poisson", etc.  </p>'
  } else {
    // générer le contenu HTML des recettes filtrées
    let filteredRecipesHTML = ''
    for (let i = 0; i < filteredRecipes.length; i++) {
      filteredRecipesHTML += recettesFactory(filteredRecipes[i]).getRecettesCardDOM().outerHTML
    }
    recettesSection.innerHTML = filteredRecipesHTML
  }
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
}
