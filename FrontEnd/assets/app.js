
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
const main = selectElement('main')
const portfolio = selectElement('#portfolio')
const divBnt = createElement("div")
const btnTous = createElement("button")
const login = selectElement('#login')


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
    img.setAttribute("crossorigin", "anonymous")
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

    // Recuperation des elements de l'Api Works
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

            // Recuperation des elements de l'Api Categorie
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
                            galerie.innerHTML = "";

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


            //Affichage works avec le button Tous
            btnTous.addEventListener("click", function (event) {
                galerie.innerHTML = "";

                for (let work of works) {
                    afficherElements(work)

                }

            });

        })





}


galerieAfficherPhotos()

login.addEventListener("click", function (event) {
    login.setAttribute("class", "active-login")

    main.innerHTML = ""
    const sectionLogin = createElement("div")
    sectionLogin.setAttribute("class", "section-login")
    main.appendChild(sectionLogin)



});
















