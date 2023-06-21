const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const count = 10;
const APIKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&count=${count}`;

let resultsArr = [];
let favorites = {};

function createDomNodes() {
  resultsArr.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View full image.";
    link.target = "_blank";
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "Nasa Picture of the day";
    image.loading = "lazy";
    image.classList.add("card-image-top");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    const date = document.createElement("strong");
    date.textContent = result.date;
    const copyRightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyRight = document.createElement("span");
    copyRight.textContent = `${copyRightResult}`;

    footer.append(date, copyRight);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);

    imagesContainer.appendChild(card);
  });
}

function updateDOM() {
  createDomNodes();
}

async function getNasaPicturers() {
  try {
    const response = await fetch(apiUrl);
    resultsArr = await response.json();
    updateDOM();
  } catch (err) {}
}

function saveFavorite(itemURl) {
  resultsArr.forEach((item) => {
    if (item.url.includes(itemURl) && !favorites[itemURl]) {
      favorites[itemURl] = item;
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);

      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

getNasaPicturers();
