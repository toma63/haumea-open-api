// fetch all the people from the Star Wars API (SWAPI)
//   Add all the people and thgeir basic info to the container in the people section
// fetch one page
const baseUrl = "https://swapi.dev/api/people?page=";
const recordLength = 9;
const urls = [];
const peopleContainer = document.getElementById('people-container')
for (let i = 0; i < recordLength; i++) {
    urls.push(baseUrl + (i + 1));
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





