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
  const allRecipesHTML = window.recipes.reduce(function (html, recipe) {
    /* global recettesFactory */
  /* eslint no-undef: "error" */
    return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML
  }, '')
  recettesSection.innerHTML = allRecipesHTML
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
}
// Initialisation : afficher toutes les fiches de recettes
displayAllRecipes()

// FONCTION AFFICHE LE NOMBRE TOTAL DE FICHES DE RECETTES AFFICHEES SUR LA PAGE
function updateRecipeCount () {
  const recipesCount = document.getElementById('recipesCount')
  const totalRecipes = recettesSection.querySelectorAll('article').length
  recipesCount.innerText = `${totalRecipes} recettes`
};

// Initialisation du tableau de recettes filtrées, tableau vide
let filteredRecipes = []

// Event de l'input de saisie utilisateur recherche principale
inputSearchBar.addEventListener('input', function (event) {
  const searchText = event.target.value.trim().toLowerCase()

  // Vider les listes de recherches spécifiques
  ingredientsListElementBox.innerHTML = ''
  appareilsListElementBox.innerHTML = ''
  ustensilesListElementBox.innerHTML = ''

  // Si la longueur du texte entré par l'utilisateur est égale ou supérieure à 3 caractères
  if (searchText.length >= 3) {
    // Filtrer les recettes en fonction du texte saisi
    filteredRecipes = window.recipes.filter(function (recipe) {
      return (
      // par titre
        recipe.name.toLowerCase().includes(searchText) ||
                // par description
                recipe.description.toLowerCase().includes(searchText) ||
                // par ingrédient
                recipe.ingredients.some(function (ingredient) {
                  return ingredient.ingredient.toLowerCase().includes(searchText)
                })
      )
    })

    // Utilise la méthode reduce pour générer le contenu HTML des recettes filtrées
    const filteredRecipesHTML = filteredRecipes.reduce(function (html, recipe) {
      return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML
    }, '')

    // Si la recherche de l'utilisateur ne correspond à aucune des recettes
    if (filteredRecipes.length === 0) {
      // const container = document.getElementById('recettes_section');
      // container.removeAttribute('display', 'grid');
      // container.setAttribute('display', 'block');
      recettesSection.innerHTML =
                '<p id="noMatchingRecipes">  Aucune recette ne contient \'' + searchText + '\' vous pouvez chercher "tarte aux pommes", "poisson", etc.  </p>'
    } else {
      // Met à jour l'affichage des recettes filtrées sur la page
      recettesSection.innerHTML = filteredRecipesHTML
    }

    // Mettre à jour les listes avec les éléments correspondant aux résultats de recherche
    filteredRecipes.forEach(function (recipe) {
      recipe.ingredients.forEach(function (ingredient) {
        const ingredientName = ingredient.ingredient
        if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
          const ingredientElement = document.createElement('div')
          ingredientElement.dataset.ingredient = ingredientName
          ingredientElement.textContent = ingredientName
          ingredientsListElementBox.appendChild(ingredientElement)
        }
      })

      const applianceName = recipe.appliance
      if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
        const applianceElement = document.createElement('div')
        applianceElement.dataset.appliance = applianceName
        applianceElement.textContent = applianceName
        appareilsListElementBox.appendChild(applianceElement)
      }

      recipe.ustensils.forEach(function (ustensil) {
        if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
          const ustensilElement = document.createElement('div')
          ustensilElement.dataset.ustensil = ustensil
          ustensilElement.textContent = ustensil
          ustensilesListElementBox.appendChild(ustensilElement)
        }
      })
    })
  } else {
  // Si la longueur du texte entré par l'utilisateur est inférieure à 3 caractères
    // Afficher à nouveau toutes les fiches de recettes
    displayAllRecipes()

    // Remettre à jour les listes avec tous les ingrédients, ustensiles et appareils
    window.recipes.forEach(function (recipe) {
      recipe.ingredients.forEach(function (ingredient) {
        const ingredientName = ingredient.ingredient
        if (!ingredientsListElementBox.querySelector(`[data-ingredient="${ingredientName}"]`)) {
          const ingredientElement = document.createElement('div')
          ingredientElement.dataset.ingredient = ingredientName
          ingredientElement.textContent = ingredientName
          ingredientsListElementBox.appendChild(ingredientElement)
        }
      })
      const applianceName = recipe.appliance
      if (!appareilsListElementBox.querySelector(`[data-appliance="${applianceName}"]`)) {
        const applianceElement = document.createElement('div')
        applianceElement.dataset.appliance = applianceName
        applianceElement.textContent = applianceName
        appareilsListElementBox.appendChild(applianceElement)
      }
      recipe.ustensils.forEach(function (ustensil) {
        if (!ustensilesListElementBox.querySelector(`[data-ustensil="${ustensil}"]`)) {
          const ustensilElement = document.createElement('div')
          ustensilElement.dataset.ustensil = ustensil
          ustensilElement.textContent = ustensil
          ustensilesListElementBox.appendChild(ustensilElement)
        }
      })
    })
  }
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
})

// FONCTION POUR CREER UN TAG A PARTIR DE : L'ELEMENT CLIQUE -> LE DEPLACER DANS LA LISTE ET CHANGER SON STYLE
function createTagFromClick (event) {
  const clickedElement = event.target
  const tagText = clickedElement.textContent.trim()
  const parentList = clickedElement.parentElement
  /* global existingTags */
  /* eslint no-undef: "error" */
  if (tagText && !existingTags.has(tagText)) {
    existingTags.add(tagText) // Ajoute la valeur au set des tags existants
    // Créer le tag
    /* global tagsFactory */
    /* eslint no-undef: "error" */
    const newTag = tagsFactory({ appliance: tagText }).getTagsDOM(tagText, function () {
      removeTag(tagText)
    })
    /* global tagsSection */
    /* eslint no-undef: "error" */
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
  };
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
};

// FONCTION POUR FILTRER LES RECETTES PAR TAG, SELON L'ELEMENT CLIQUE
function filterRecipesByTag (event) {
  const clickedElement = event.target
  const tagText = clickedElement.textContent.trim()
  // Filtrer les recettes en fonction de l'élément cliqué
  filteredRecipes = window.recipes.filter(function (recipe) {
    return (
      recipe.name.toLowerCase().includes(tagText.toLowerCase()) ||
            recipe.description.toLowerCase().includes(tagText.toLowerCase()) ||
            recipe.ingredients.some(function (ingredient) {
              return ingredient.ingredient.toLowerCase().includes(tagText.toLowerCase())
            }) ||
            recipe.appliance.toLowerCase().includes(tagText.toLowerCase()) ||
            recipe.ustensils.some(function (ustensil) {
              return ustensil.toLowerCase().includes(tagText.toLowerCase())
            })
    )
  })
  // Méthode reduce -> générer le contenu HTML des recettes filtrées
  const filteredRecipesHTML = filteredRecipes.reduce(function (html, recipe) {
    return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML
  }, '')
  // Mise à jour affichage des recettes filtrées sur la page
  recettesSection.innerHTML = filteredRecipesHTML
  // Mettre à jour le nombre total de recettes affichées dans l'élément prévu à cet effet
  updateRecipeCount()
};

// Écouteurs d'événements pour les listes d'ingrédients, d'appareils et d'ustensiles
ingredientsListElementBox.addEventListener('click', createTagFromClick)
appareilsListElementBox.addEventListener('click', createTagFromClick)
ustensilesListElementBox.addEventListener('click', createTagFromClick)

ingredientsListElementBox.addEventListener('click', filterRecipesByTag)
appareilsListElementBox.addEventListener('click', filterRecipesByTag)
ustensilesListElementBox.addEventListener('click', filterRecipesByTag)

// FONCTION DE SUPPRESSION DU TAG
function removeTag (tagText) {
  if (existingTags.has(tagText)) {
    existingTags.delete(tagText) // Supprime la valeur du set des tags existants

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
    for (const t in tags) {
      if (Object.hasOwnProperty.call(tags, t)) {
        const tag = tags[t] // extrait l'élément HTML actuel à partir de l'objet tags.
        if (tag.firstChild.innerText === tagText) {
          tag.remove()
        }
      }
    }

    // METTRE A JOUR LES RECETTES AFFICHEES EN FONCTION DES TAGS RESTANTS
    // crée un nouveau tableau activeTags contenant les mêmes éléments que existingTags
    const activeTags = Array.from(existingTags)
    // Filtre le tableau window.recipes pour obtenir les recettes qui correspondent aux tags actifs.
    // Constante filteredByTagsRecipes = résultat filtré.
    const filteredByTagsRecipes = window.recipes.filter(function (recipe) {
      // every(), vérifie si une condition est vraie pour tous les éléments du tableau
      // s'assure que tous les tags actifs correspondent à au moins un critère dans la recette.
      return activeTags.every(function (tag) {
        return (
          recipe.name.toLowerCase().includes(tag) &&
                    recipe.description.toLowerCase().includes(tag) &&
                    recipe.ingredients.some(function (ingredient) {
                      return ingredient.ingredient.toLowerCase().includes(tag)
                    })
        )
      })
    })
    // Si au moins une recette correspond aux critères de filtrage
    if (filteredByTagsRecipes.length > 0) {
      // Méthode reduce(), itère le tableau filteredByTagsRecipes (recettes filtrées) et accumule le résultat
      const filteredRecipesHTML = filteredByTagsRecipes.reduce(function (html, recipe) {
        return html + recettesFactory(recipe).getRecettesCardDOM().outerHTML
      }, '')

      // Met à jour le contenu de la section des recettes dans le document HTML.
      // -> Remplace le contenu de l'élément ID recettesSection, par le contenu de filteredRecipesHTML.
      recettesSection.innerHTML = filteredRecipesHTML
    }
  }
  updateRecipeCount()
};
