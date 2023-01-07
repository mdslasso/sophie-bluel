
function createElement(element) {
    return document.createElement(element)
}

function selectElement(element) {
    return document.querySelector(element)
}

const galerie = selectElement('.gallery')

const portfolio = selectElement('#portfolio')
const divBnt = createElement("div")
divBnt.setAttribute("class", "btn-categorie")

const btnTous = createElement("button")
const btnObjets = createElement("button")
const btnAppart = createElement("button")
const btnHotels = createElement("button")


btnTous.innerText = "Tous"
btnObjets.innerText = "Objets"
btnAppart.innerText = "Appartements"
btnHotels.innerText = "Hotels & restaurants"

divBnt.append(btnTous, btnObjets, btnAppart, btnHotels)
portfolio.append(divBnt, galerie)




const optionGet = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
}

const urlApiWorks = "http://localhost:5678/api/works"

function galerieAfficherPhotos() {
    fetch(urlApiWorks, optionGet)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Mauvaise réponse du réseau')
            }
        })
        .then(function (works) {

            for (let work of works) {


                // Afficher tous les elements
                function afficherWorks() {
                    const figure = createElement("figure")
                    const img = new Image()
                    const figcaption = createElement("figcaption")

                    img.src = work.imageUrl;
                    img.setAttribute("alt", work.title);
                    figcaption.innerHTML = work.title;

                    figure.append(img, figcaption)
                    galerie.appendChild(figure)

                }


                afficherWorks()



                /// Filtrer elements par categorie

                document.querySelectorAll("button").forEach((button) => {

                    button.addEventListener("click", function () {

                        if (work.category.name == button.innerText) {

                            document.querySelector(".gallery").innerHTML = "";
                            afficherWorks()
                            button.style.background = "#1D6154";
                            button.style.color = "white"


                        } else if (button.innerText == "Tous") {

                            document.querySelector(".gallery").innerHTML = "";
                            afficherWorks()
                            button.style.background = "#1D6154";
                            button.style.color = "white"

                        }


                    });


                });



            }




        })
        .catch(function (error) {
            console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
        });


}




galerieAfficherPhotos()













