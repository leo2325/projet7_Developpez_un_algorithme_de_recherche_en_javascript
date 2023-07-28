//Fonction asynchrone de récupération des données
async function getRecettes() {
    // Récupération des données depuis le fichier JS
        const reponse = await fetch('./data/recipes.js');
        const recettesFiches = await reponse;

    // et bien retourner le tableau seulement une fois récupéré
    console.log(recettesFiches);
    return recettesFiches;

}

// Fonction asynchrone d'affichage des recettes
async function displayData(recipes) {
    const recettesSection = document.querySelector(".recettes_section");

    recipes.forEach((recipe) => {
        const recettesModel = recettesFactory(recipe);
        const recettesCardDOM = recettesModel.getRecettesCardDOM();
        recettesSection.appendChild(recettesCardDOM);
    });
}

// fonction d'initialisation appelant getRecettes() puis displaydata().
async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getRecettes();
    displayData(recipes);
}

init();