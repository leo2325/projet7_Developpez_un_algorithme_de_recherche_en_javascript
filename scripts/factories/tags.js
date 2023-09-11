// Déclaration des éléments du DOM
// conteneur tags
const tagsSection = document.getElementById('tags_section')
/* eslint-disable */
function tagFactory (data) {
  const { ingredients, appliance, ustensils } = data

  // Fonction qui génère les tags sur la page index
  function getTagsDOM (tagValue, closeAction) {
    // Création de la constante div.
    const divTag = document.createElement('div')
    divTag.setAttribute('class', 'tag_container')
    // Constante titre du tag.
    const titleTag = document.createElement('p')
    // A complèter avec le contenu de l'élément de liste cliqué
    titleTag.innerText = tagValue // Utilisez la valeur de l'appareil comme texte du tag

    // icone de fermeture du tag
    const removeTag = document.createElement('span')
    removeTag.setAttribute('class', 'fa-solid fa-xmark')

    // Ajoutez le gestionnaire d'événements pour la suppression du tag
    removeTag.addEventListener('click', function () {
      // Suppression du tag de la page
      closeAction()
    })

    divTag.appendChild(titleTag)
    divTag.appendChild(removeTag)
    tagsSection.appendChild(divTag)

    return divTag
  }

  return { ingredients, appliance, ustensils, getTagsDOM }
};
