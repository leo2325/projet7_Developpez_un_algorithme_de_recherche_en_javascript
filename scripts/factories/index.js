function recettesFactory(data) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    const picture = `assets/photos_recettes/${image}`;
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
                const timeElement = document.createElement('p');
                timeElement.innerText= time +'min';
                timeElement.setAttribute('aria-label', 'temps de cuisson' + ' ' + time);

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
                ingredientsBox.appendChild(ingredientsTitle);
                
                const ingredientsBoxElements = document.createElement('div');
                ingredientsBoxElements.setAttribute('class', 'ingredientsBoxElements');

                
                // ingredients content
                ingredients.forEach((ingredient) => {
                    const ingredientsBoxElement = document.createElement('div');
                    ingredientsBoxElement.setAttribute('class', 'ingredientsBoxElement');

                    const ingredientNameElement = document.createElement('p');
                    ingredientNameElement.setAttribute('class', 'ingredientNameElement');
                    const { ingredient: ingredientName } = ingredient;
                    ingredientNameElement.innerText = `${ingredientName} `;
                    
                    const ingredientElement = document.createElement('p');
                    ingredientElement.setAttribute('class', 'ingredientElement');
                    const { quantity: quantity, unit } = ingredient;
                    ingredientElement.innerText = ` ${quantity} ${unit ? unit : ''}`;
                    
                    ingredientsBoxElement.appendChild(ingredientNameElement);
                    ingredientsBoxElement.appendChild(ingredientElement);

                    ingredientsBoxElements.appendChild(ingredientsBoxElement);
                    ingredientsBox.appendChild(ingredientsBoxElements);
                });

       
        
        
        // Création des éléments enfants de l'article
        article.appendChild(imgCardBox);
        imgCardBox.appendChild(timeElement);
        imgCardBox.appendChild(imgElement);
        

        article.appendChild(titleElement);
        
        article.appendChild(descriptionBox);
        descriptionBox.appendChild(descriptionTitle);
        descriptionBox.appendChild(descriptionElement);

        article.appendChild(ingredientsBox);
        

        return (article);
    }

    return { id, image, name, servings, ingredients, time, description, appliance, ustensils, getRecettesCardDOM }

}