// fetch all the people from the Star Wars API (SWAPI)
//   Add all the people and their basic info to the container in the people section

// fetch to get record count and then fetch all pages
const baseURL = "https://www.swapi.tech/api/people";
const peopleContainer = document.getElementById('people-container');
async function fetchRecords() {
    try {
      const response = await fetch(baseURL);
      
      if (!response.ok) {
        throw new Error('Request failed');
      }
      
        let record = await response.json();
        console.log("record: ", record);
        const recordLength = record.total_pages;
        console.log('Data fetched successfully:', recordLength);
 
        const pageUrl = baseURL + "?page=";
        const urls = [];
        for (let i = 0; i < recordLength; i++) {
            urls.push(pageUrl + (i + 1));
        }
        getAllPages(urls);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
fetchRecords();


async function getAllPages(urls) {
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






