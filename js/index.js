// fetch all the people from the Star Wars API (SWAPI)
//   Add all the people and thgeir basic info to the container in the people section
// fetch one page
url = "https://www.swapi.tech/api/people";
const peopleContainer = document.getElementById("people-container");
fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Failed to fetch repositories");
        }
    })
    .then((data) => {
        const peoplePage = JSON.parse(data);
        console.log(peoplePage);
        // Create a new element for each person
        for (let person of peoplePage.results) {
            let personElt = document.createElement("div");
            personElt.className = 'person';
            // add a header with the person's name
            personHeader = document.createElement("h2");
            personHeader.innerText = person.name;
            personElt.appendChild(personHeader);
            peopleContainer.appendChild(personElt);
        }
    })
    .catch((error) => {
        if (error instanceof SyntaxError) {
            console.error("Unparsable response from server");
        } else {
            console.error("Error fetching data: ", error.message);
        }
    });


