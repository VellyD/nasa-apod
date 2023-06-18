const count = 10;
const APIKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&count=${count}`;

let resultsArr = [];

async function getNasaPicturers() {
  try {
    const response = await fetch(apiUrl);
    resultsArr = await response.json();
    console.log(resultsArr);
  } catch (err) {}
}

getNasaPicturers();
