
//function pour creer les elements du dom 
function createElement(element) {
    return document.createElement(element)
}


//function pour selectionner les elements  du dom
function selectElement(element) {
    return document.querySelector(element)
}

// function pour ajouter plusieur attribute a un element
function setAttributes(element, attrs) {
    for (var key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}



// Creation des elements du dom
const body = selectElement("body")
const galerie = selectElement(".gallery")
const main = selectElement("main")
const introduction = selectElement("#introduction")
const portfolio = selectElement("#portfolio")
const divBnt = createElement("div")
const btnTous = createElement("button")


//Creation des elements du Formulaire login
const login = selectElement("#login")
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
setAttributes(labelPassword, { "for": "password", });
setAttributes(inputEmail, { "type": "email", "name": "email", "id": "email", "required": "" });
setAttributes(inputPassword, { "type": "password", "name": "password", "id": "password", "required": "" });
setAttributes(submitLogin, { "type": "submit", "value": "Se connecter" });
setAttributes(motDePasseOublier, { "href": "#" });

//Creation des elements admin 
const sectionAdmin = createElement("div")
const publierChargement = createElement("button")
const modeEdition = createElement("button")
const icoEdit = createElement("i")

icoEdit.setAttribute("class", "fa-solid fa-pen-to-square")
sectionAdmin.setAttribute("class", "section-admin")
modeEdition.setAttribute("class", "edition")
publierChargement.setAttribute("class", "publier-chargement")


// Creation des elements de la modale
const modal = createElement("div")
const close = createElement("span")
const modalContent = createElement("div")
const modalElement = createElement("div")
const textGalerie = createElement("h3")
const modalPhotos = createElement("div")
const hr = createElement("hr")
const btnAjouter = createElement("button")
const btnSupprimer = createElement("button")

close.innerHTML = "&times;"
textGalerie.innerText = "Galerie photo"
btnAjouter.innerText = "Ajouter une photo"
btnSupprimer.innerText = "Supprimer la galerie"


btnAjouter.setAttribute("class", "button-active")
modal.setAttribute("class", "modal")
close.setAttribute("class", "close")
modalPhotos.setAttribute("id", "modal-photos")
modalContent.setAttribute("id", "modal-content")
modalElement.setAttribute("id", "modal-element")
btnSupprimer.setAttribute("id", "btn-supprimer")

modalElement.append(textGalerie, modalPhotos, hr, btnAjouter, btnSupprimer)
modalContent.append(close, modalElement)
modal.appendChild(modalContent)




divBnt.setAttribute("class", "btn-categorie")
btnTous.innerText = "Tous"
divBnt.append(btnTous)
portfolio.append(modal, divBnt, galerie)


// Function pour afficher les elements de facon dynamique
function afficherElements(works) {

    for (let work of works) {

        const figure = createElement("figure")
        const img = createElement("img")
        //const img = new Image()
        const figcaption = createElement("figcaption")

        img.src = work.imageUrl;
        img.crossOrigin = "Anonymous";

        img.setAttribute("alt", work.title);
        figcaption.innerHTML = work.title;

        figure.append(img, figcaption)
        galerie.appendChild(figure)


    }
}


const urlApiCategorie = "http://localhost:5678/api/categories"
const urlApiWorks = "http://localhost:5678/api/works"
const urlApiLogin = "http://localhost:5678/api/users/login"


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
            afficherElements(works)

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
                        btnCategorie.innerText = categorie.name
                        divBnt.append(btnCategorie)

                        btnCategorie.addEventListener("click", function (event) {

                            galerie.innerHTML = "";
                            event.currentTarget.setAttribute("class", "button-active")

                            // Filtrage des works par categories
                            const worksByCategorie = works.filter((works) => {

                                return works.category.id == categorie.id

                            });


                            afficherElements(worksByCategorie)


                        });
                    }

                })



            //Affichage tous les works avec le button "Tous"
            btnTous.addEventListener("click", function (event) {
                galerie.innerHTML = "";

                afficherElements(works)

            });

        })
}


galerieAfficherPhotos()




// Section form Login

login.addEventListener("click", function () {
    login.setAttribute("class", "active-login")
    main.innerHTML = ""
    sectionAdmin.remove()


    labelEmail.innerText = "Email"
    labelPassword.innerText = "Password"
    motDePasseOublier.innerText = "Mot de passe oublié"
    loginText.innerText = "Login"

    sectionLogin.setAttribute("class", "section-login")
    loginForm.append(labelEmail, inputEmail, labelPassword, inputPassword, submitLogin)
    sectionLogin.append(loginText, loginForm, motDePasseOublier)
    main.appendChild(sectionLogin)



});



// Se connecter
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.currentTarget
    const data = new FormData(form)

    const emailValue = data.get("email")
    const passwordValue = data.get("password")


    let user = {
        email: emailValue,
        password: passwordValue
    };


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        },
        body: JSON.stringify(user)
    }

    fetch(urlApiLogin, options)

        .then(result => {

            console.log(result.status)

            loginText.innerText = ""

            if (result.status == 200) {

                //window.location.replace("/FrontEnd");

                main.innerText = ""
                modeEdition.innerText = ""
                publierChargement.innerText = "publier les changements"

                modeEdition.append(icoEdit, " Mode édition ")
                sectionAdmin.append(modeEdition, publierChargement)



                body.prepend(sectionAdmin)
                main.append(introduction, portfolio)



            } else {

                loginText.innerText = "Email ou Mot de passe incorrect"
                sectionAdmin.remove()


            }



        })



});





// Modale

modeEdition.addEventListener("click", function (event) {

    modal.style.display = "block"



})


close.addEventListener("click", function (event) {

    modal.style.display = "none"

})


window.addEventListener("click", function (event) {

    if (event.target == modal) {

        modal.style.display = "none"

    }


})



















