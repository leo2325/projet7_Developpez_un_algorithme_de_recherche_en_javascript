function recettesFactory(data) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    //const picture = `assets/photographers/${portrait}`;

    // Fonction qui génère les fiches de présentation des recettes sur la page index
    function getRecettesCardDOM() {

        // Création de la constante article (Articles qui contiennent les fiches de présentation des recettes).
        const article = document.createElement('article');
        article.setAttribute('aria-label', 'fiche de recette' + name);
        
            // Constante de la div contenant les éléments du DOM de présentation image
            const imgCardBox = document.createElement('div');
            imgCardBox.setAttribute('class', 'imgCardBox');
                // constante image = création de l'élément 'img' dans le DOM 
                const imgElement = document.createElement('img');
                imgElement.src = picture;
                imgElement.setAttribute('alt', 'photo de' + name);
                // Constante de temps = création de l'élément temps dans le DOM
                const timeElement = document.createElement('');
                timeElement.src = time;
                timeElement.setAttribute('aria-label', 'temps de cuisson' + time);

            // Constante titre de la recette = création de l'élément 'h2' dans le DOM
            const titleElement = document.createElement('h2');
            titleElement.innerText = name;
        
            // Constante de la div contenant les éléments du DOM relatifs à la recette
            const descriptionBox = document.createElement('div');
            descriptionBox.setAttribute('class', 'descriptionBox');
                // description title
                const descriptionTitle = document.createElement('h3');
                descriptionTitle.innerText = 'RECETTE';
                // Constante description = création de l'élément 'p' dans le DOM
                const descriptionElement = document.createElement('p');
                descriptionElement.innerText = description;

            // Constante de la div contenant les éléments du DOM relatifs aux ingrédients
            const ingredientsBox = document.createElement('div');
            ingredientsBox.setAttribute('class', 'ingredientsBox');
                // ingredients title
                const ingredientsTitle = document.createElement('h3');
                ingredientsTitle.innerText = 'INGREDIENTS';


       
        
        
        // Création des éléments enfants de l'article
        article.appendChild(imgCardBox);
        imgCardBox.appendChild(imgElement);
        imgCardBox.appendChild(timeElement);

        article.appendChild(titleElement);
        
        article.appendChild(descriptionBox);
        descriptionBox.appendChild(descriptionTitle);
        descriptionBox.appendChild(descriptionElement);

        article.appendChild(ingredientsBox);
        ingredientsBox.appendChild(ingredientsTitle);
        descriptionBox.appendChild(descriptionElement);

        return (article);
    }

    return { id, image, name, servings, ingredients, time, description, appliance, ustensils, getRecettesCardDOM }

}