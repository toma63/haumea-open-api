// fetch all the people from the Star Wars API (SWAPI)
//   Add all the people and thgeir basic info to the container in the people section

// initial fetch to get record count
const baseURL = "https://www.swapi.tech/api/people";
let recordLength = 0;
async function getRecordCount(baseURL) {
    await fetch(baseURL)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Failed to fetch initial record");
            }
        })
        .then((data) => {
            const peoplePage = JSON.parse(data);
            console.log(peoplePage);
            return recordLength = peoplePage.total_pages;
        })
        .catch((error) => {
            if (error instanceof SyntaxError) {
                console.error("Unparsable response from server");
            } else {
                console.error("Error fetching data: ", error.message);
            }
        });
}
getRecordCount(baseURL).then(res => {recordLength = res});
console.log("recordLength: ", recordLength);

const pageUrl = baseURL + "?page=";
const urls = [];
const peopleContainer = document.getElementById('people-container')
for (let i = 0; i < recordLength; i++) {
    urls.push(pageUrl + (i + 1));
}
async function getAllPages() {
    const promiseList = urls.map(text => fetch(text).then(r => r.json().catch(err => console.log(err))));
    const finalResult = await Promise.all(promiseList).then(result => {
        let finalList = []
        result.forEach(res => {
            finalList = finalList.concat(res.results);
        });
        console.log("finalList: ", finalList);
        for (let person of finalList) {
            let personElt = document.createElement("div");
            personElt.className = 'person';
            // add a header with the person's name
            personHeader = document.createElement("h2");
            personHeader.innerText = person.name;
            personElt.appendChild(personHeader);
            peopleContainer.appendChild(personElt);
        }
        return finalList
    });
    //console.log(finalResult);
    //console.log(finalResult.length);
}
getAllPages();





