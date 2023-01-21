
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
const loginBtn = selectElement("#login")


// Creation des elements du formulaire login
const loginForm = createElement("form")
const sectionLogin = createElement("section")
const loginText = createElement("h2")
const labelEmail = createElement("label")
const labelPassword = createElement("label")
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



//Creation des elements de la modal
const modal = createElement("div")



// Creations des button pour la gestion des filtres par categorie
const divBnt = createElement("div")
const btnTous = createElement("button")
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

    // Recuperation des elements  Works via l'Api
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

            // Recuperation des elements de la Categorie via l'Api 
            fetch(urlApiCategorie)
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
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

                            // Filtrage des works par categories
                            const worksByCategorie = works.filter((works) => {

                                return works.category.id == categorie.id

                            });

                            afficherElements(worksByCategorie)

                        });
                    }

                })


            //Affichage de tous les works avec le button "Tous"
            btnTous.addEventListener("click", function (event) {
                galerie.innerHTML = "";

                afficherElements(works)

            });

        })
}


galerieAfficherPhotos()




// formulaire de connexion

loginBtn.addEventListener("click", function () {
    main.innerHTML = "";
    loginForm.innerHTML = "";

    labelEmail.innerText = "Email"
    labelPassword.innerText = "Password"
    motDePasseOublier.innerText = "Mot de passe oublié"
    loginText.innerText = "Login"

    sectionLogin.setAttribute("id", "section-form")
    loginForm.append(labelEmail, inputEmail, labelPassword, inputPassword, submitLogin)
    sectionLogin.append(loginText, loginForm, motDePasseOublier)
    main.appendChild(sectionLogin)
    sectionAdmin.remove()




})




// Connexion
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


        .then(response => {

            loginText.innerText = ""

            console.log(response)


            if (response.status == 200) {


                console.log(response.status)


                main.innerText = ""
                modeEdition.innerText = ""

                icoEdit.setAttribute("class", "fa-solid fa-pen-to-square")
                sectionAdmin.setAttribute("class", "section-admin")
                modeEdition.setAttribute("class", "edition")
                publierChargement.setAttribute("class", "publier-chargement")

                modeEdition.innerText = ""
                publierChargement.innerText = "publier les changements"

                modeEdition.append(icoEdit, "Mode édition")
                sectionAdmin.append(modeEdition, publierChargement)

                body.prepend(sectionAdmin)
                main.append(introduction, portfolio)



                // Edition Mode
                modeEdition.addEventListener("click", function () {


                    const modalEntete = createElement("div")
                    const modalContent = createElement("div")
                    const modalElement = createElement("div")
                    const close = createElement("span")
                    const retour = createElement("span")
                    const titreGalerie = createElement("h3")
                    const modalSectionPhoto = createElement("div")
                    const hr = createElement("hr")
                    const btnAjouter = createElement("button")
                    const btnSupprimer = createElement("span")
                    const modalSectionForm = createElement("section")
                    const ajoutForm = createElement("form")
                    const submitValider = createElement("input")


                    close.innerHTML = "&times;"
                    retour.innerHTML = "&leftarrow;"
                    btnAjouter.innerText = "Ajouter une photo"
                    btnSupprimer.innerText = "Supprimer la galerie"

                    ajoutForm.setAttribute("enctype", "multipart/form-data")
                    modal.setAttribute("class", "modal")
                    close.setAttribute("class", "close")
                    retour.setAttribute("class", "retour")
                    modalContent.setAttribute("id", "modal-content")
                    modalElement.setAttribute("id", "modal-element")
                    modalEntete.setAttribute("id", "modal-entete")
                    modalSectionPhoto.setAttribute("id", "modal-section-photo")
                    modalSectionForm.setAttribute("id", "section-form")
                    modal.setAttribute("hr", "#")


                    modal.style.display = "block"
                    modal.innerHTML = ""
                    modalSectionPhoto.innerHTML = ""
                    modalElement.innerHTML = ""
                    modalContent.innerHTML = ""
                    titreGalerie.innerText = "Galerie photo"


                    modal.appendChild(modalContent)

                    modalEntete.appendChild(close)
                    modalElement.append(titreGalerie, modalSectionPhoto, hr, btnAjouter, btnSupprimer)
                    modalContent.append(modalEntete, modalElement)



                    fetch(urlApiWorks)

                        .then(function (res) {
                            if (res.ok) {

                                return res.json();
                            }
                        }).then(function (works) {

                            for (let work of works) {

                                const article = createElement("article")
                                const cadreImage = createElement("div")
                                const editWork = createElement("span")
                                const deleteWork = createElement("i")
                                const img = new Image()

                                editWork.innerText = "édit"
                                img.src = work.imageUrl
                                img.crossOrigin = "Anonymous";

                                deleteWork.setAttribute("class", "fa-solid fa-trash-can")
                                cadreImage.setAttribute("id", "cadre-image")

                                cadreImage.append(img, deleteWork)
                                article.append(cadreImage, editWork)

                                modalSectionPhoto.append(article)


                                // Suppression  work 
                                deleteWork.addEventListener("click", function (event) {
                                    event.preventDefault();
                                    modalElement.innerHTML = ""

                                    let id = work.id

                                    let options = {
                                        method: "DELETE",
                                        headers: {
                                            "Content-type": "application/json; charsert=UTF-8",
                                        }

                                    }

                                    fetch(`http://localhost:5678/api/works/${id}`, options)

                                        .then((response) => response.json())
                                        .then((json) => console.log(json))

                                    console.log(' Delete ID : ', id)
                                    modalElement.append(titreGalerie, modalSectionPhoto, hr, btnAjouter, btnSupprimer)


                                })

                            }

                        })



                    // Ajout d'un nouveau work
                    btnAjouter.addEventListener("click", function (event) {

                        titreGalerie.innerText = "Ajout photo"
                        modalEntete.innerText = ""
                        modalEntete.append(retour, close)
                        modalElement.innerHTML = ""
                        modalSectionForm.innerHTML = ""


                        const image = createElement("input")
                        const title = createElement("input")
                        const icoImage = createElement("i")
                        const conditionImage = createElement("p")
                        const cadreImageAjout = createElement("div")
                        const labelTitle = createElement("label")
                        const labelCategory = createElement("label")
                        const selectCategory = createElement("select")


                        labelTitle.innerText = "Titre"
                        image.innerText = ""
                        labelCategory.innerText = "Catégorie"
                        conditionImage.innerText = "jpg, png : 4mo max"
                        submitValider.innerHTML = ""



                        ajoutForm.setAttribute("id", "ajout-form")
                        selectCategory.setAttribute("name", "category")
                        icoImage.setAttribute("class", "fa-sharp fa-solid fa-image")
                        cadreImageAjout.setAttribute("id", "cadre-image-ajout")


                        setAttributes(labelTitle, { "for": "Titre" });
                        setAttributes(submitValider, { "type": "submit", "id": "submit-valider", "value": "Valider" });
                        setAttributes(labelCategory, { "for": "Catégorie", });
                        setAttributes(image, { "type": "file", "name": "image", "id": "image", "accept": "image/png, image/jpg", "required": "" });
                        setAttributes(title, { "type": "text", "name": "title", "id": "title", "required": "" });



                        fetch(urlApiCategorie)
                            .then(function (response) {
                                if (response.ok) {
                                    return response.json();
                                }
                            })
                            .then(function (categories) {
                                for (let categorie of categories) {
                                    ajoutForm.innerText = ""
                                    const optionCategory = createElement("option")
                                    optionCategory.setAttribute("value", categorie.id)

                                    optionCategory.innerText = categorie.name
                                    selectCategory.append(optionCategory)
                                    ajoutForm.append(cadreImageAjout, labelTitle, title, labelCategory, selectCategory, hr, submitValider)

                                }

                            });

                        cadreImageAjout.append(icoImage, image, conditionImage)
                        modalSectionForm.append(ajoutForm)
                        modalElement.append(titreGalerie, modalSectionForm)


                        // Envoie du nouveau work dans la base de donnee
                        ajoutForm.addEventListener("submit", function (event) {
                            event.preventDefault();

                            const form = event.currentTarget
                            const data = new FormData(form)

                            const imageValue = data.get("image")
                            const titleValue = data.get("title")
                            const categorieValue = data.get("category")


                            let newWork = {
                                image: imageValue,
                                title: titleValue,
                                category: categorieValue,
                            };


                            const options = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(newWork)
                            }


                            fetch(urlApiWorks, options)

                                .then(response => {

                                    if (response.status == 200) {

                                        console.log("Ajout  OK")

                                    } else {

                                        console.log("Erreur")

                                    }

                                })



                        })


                    })

                    // Gestion de la  modal
                    close.addEventListener("click", function (event) {
                        modal.style.display = "none"
                        modalEntete.innerText = ""
                        modalEntete.append(close)


                    })




                    window.addEventListener("click", function (event) {

                        if (event.target == modal) {
                            modal.style.display = "none"
                            modalEntete.innerText = ""
                            modalEntete.append(close)


                        }

                    })



                    retour.addEventListener("click", function (event) {
                        titreGalerie.innerText = "Galerie photo"
                        modal.style.display = "block"
                        modalElement.innerText = ""
                        modalEntete.innerText = ""
                        modalEntete.append(close)
                        console.log("ok")
                        modalElement.append(titreGalerie, modalSectionPhoto, hr, btnAjouter, btnSupprimer)



                    })



                });



            } else {

                loginText.innerText = "Email ou Mot de passe incorrect"
                sectionAdmin.remove()


            }

        })

});






























