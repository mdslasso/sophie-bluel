
//function pour creer les elements du dom 
function createElement(element) {
    return document.createElement(element)
}


//function pour selectionner les elements  du dom
function selectElement(element) {
    return document.querySelector(element)
}

// function pour ajouter plusieur attribute a un element
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}



// Creation des elements du dom
const body = selectElement("body")
const introduction = selectElement(".introduction")
const galerie = selectElement(".gallery")
const main = selectElement("main")
const portfolio = selectElement("#portfolio")
const divBnt = createElement("div")
const btnTous = createElement("button")
const login = selectElement("#login")


divBnt.setAttribute("class", "btn-categorie")
btnTous.innerText = "Tous"
divBnt.append(btnTous)
portfolio.append(divBnt, galerie)


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
    fetch(urlApiWorks)

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
            fetch(urlApiCategorie)
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

                            event.currentTarget.setAttribute("class", "button-active")


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



// Section Login

login.addEventListener("click", function (event) {
    event.preventDefault();
    login.setAttribute("class", "active-login")
    main.innerHTML = ""

    const sectionLogin = createElement("section")
    const loginText = createElement("h2")
    const labelEmail = createElement("label")
    const labelPassword = createElement("label")
    const loginForm = createElement("form")
    const inputEmail = createElement("input")
    const inputPassword = createElement("input")
    const submitLogin = createElement("input")
    const motDePasseOublier = createElement("a")

    setAttributes(labelEmail, { "for": "email" });
    setAttributes(labelPassword, { "for": "password" });
    setAttributes(inputEmail, { "type": "email", "name": "email", "id": "email" });
    setAttributes(inputPassword, { "type": "password", "name": "password", "id": "password" });
    setAttributes(submitLogin, { "type": "submit", "value": "Se connecter" });
    setAttributes(motDePasseOublier, { "href": "#" });

    labelEmail.innerText = "Email"
    labelPassword.innerText = "Password"
    motDePasseOublier.innerText = "Mot de passe oublié"
    loginText.innerText = "Login"

    sectionLogin.setAttribute("class", "section-login")
    loginForm.append(labelEmail, inputEmail, labelPassword, inputPassword, submitLogin)
    sectionLogin.append(loginText, loginForm, motDePasseOublier)
    main.appendChild(sectionLogin)

});


body.addEventListener("click", function (event) {



});
















