// DECLARATION DE CONSTANTES & VARIABLES
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

const ingredientsSearchList =document.getElementById('appareilsSearchList');
const appareilsSearchList =document.getElementById('appareilsSearchList');
const ustensilesSearchList =document.getElementById('appareilsSearchList');

let menuVisible = false;

/* Fonction dérouler la sortList */
function launchSearchSpecific(event) {
    const clickedIcon = event.target;

    if ( clickedIcon === ingredientsListDownIcon ) {
        ingredientsSearchBar.classList.toggle('visible');
        ingredientsSearchListElement_box.classList.toggle('visible');
        ingredientsListDownIcon.classList.toggle('rotated');
    } 
    else if ( clickedIcon === appareilsListDownIcon ) {
        appareilsSearchBar.classList.toggle('visible');
        appareilsSearchListElement_box.classList.toggle('visible');
        appareilsListDownIcon.classList.toggle('rotated');
    } 
    else if ( clickedIcon === ustensilesListDownIcon ) {
        ustensilesSearchBar.classList.toggle('visible');
        ustensilesSearchListElement_box.classList.toggle('visible');
        ustensilesListDownIcon.classList.toggle('rotated');
    }
}

/* Evenement affichage de la classList */
ingredientsListDownIcon.addEventListener('click', launchSearchSpecific);
appareilsListDownIcon.addEventListener("click", launchSearchSpecific);
ustensilesListDownIcon.addEventListener("click", launchSearchSpecific);