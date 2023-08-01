// Fonction asynchrone de récupération des données depuis le fichier data.js
async function getRecettes() {
    try {
        // Retourner directement les données du fichier data.js (assurez-vous que window.recipes est bien défini dans data.js)
        return window.recipes;
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        return []; // En cas d'erreur, retourner un tableau vide pour éviter les problèmes lors de l'affichage
    }
}

// Fonction asynchrone d'affichage des recettes
async function displayData(recipes) {
    try {
        const recettesSection = document.querySelector("#recettes_section");

        recipes.forEach((recipe) => {
            const recettesModel = recettesFactory(recipe);
            const recettesCardDOM = recettesModel.getRecettesCardDOM();
            recettesSection.appendChild(recettesCardDOM);
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage des recettes:', error);
    }
}

// fonction d'initialisation appelant getRecettes() puis displaydata().
async function init() {
    try {
        // Récupère les datas des recettes
        const recipes = await getRecettes();
        displayData(recipes);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

init();
