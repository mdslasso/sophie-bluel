
//function pour creer les elements du dom 
function createElement(element) {
    return document.createElement(element)
}


//function pour selectionner les elements  du dom
function selectElement(element) {
    return document.querySelector(element)
}



// Creation des elements du dom
const galerie = selectElement('.gallery')
const portfolio = selectElement('#portfolio')
const divBnt = createElement("div")
const btnTous = createElement("button")


divBnt.setAttribute("class", "btn-categorie")
btnTous.innerText = "Tous"
divBnt.append(btnTous)
portfolio.append(divBnt, galerie)


// Parametrage de l'Api
const optionGet = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
}


// Function pour afficher les elements de facon dynamique
function afficherElements(work) {

    const figure = createElement("figure")
    const img = createElement("img")
    //const img = new Image()
    const figcaption = createElement("figcaption")

    img.src = work.imageUrl;
    img.setAttribute("alt", work.title);
    figcaption.innerHTML = work.title;

    figure.append(img, figcaption)
    galerie.appendChild(figure)

}


const urlApiCategorie = "http://localhost:5678/api/categories"
const urlApiWorks = "http://localhost:5678/api/works"



function galerieAfficherPhotos() {

    function afficherWorks() {

        // Requete Fetch  pour faire appelle a  Api Works

        fetch(urlApiWorks, optionGet)

            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Mauvaise réponse du réseau')
                }
            })
            .then(function (works) {

                // Affichage des elements Works
                for (let work of works) {

                    afficherElements(work)

                }

                // Requete Fetch  pour faire appelle a Api Categorie
                fetch(urlApiCategorie, optionGet)
                    .then(function (response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            console.log('Mauvaise réponse du réseau')
                        }
                    })
                    .then(function (categories) {
                        for (let categorie of categories) {

                            //Creation de facon dynamique les buttons categories
                            const btnCategorie = createElement("button")
                            btnCategorie.innerHTML = categorie.name
                            divBnt.append(btnCategorie)

                            btnCategorie.addEventListener("click", function (event) {
                                document.querySelector(".gallery").innerHTML = "";

                                // Filtrage des  works par  cotegories
                                const worksByCategorie = works.filter((works) => {

                                    return works.category.name == categorie.name

                                });

                                for (let work of worksByCategorie) {
                                    afficherElements(work)
                                }

                            });
                        }

                    })


                //Affichages de tous les works avec les button Tous

                btnTous.addEventListener("click", function (event) {
                    document.querySelector(".gallery").innerHTML = "";

                    for (let work of works) {
                        afficherElements(work)

                    }

                });

            })

    }

    afficherWorks()

}



galerieAfficherPhotos()
















