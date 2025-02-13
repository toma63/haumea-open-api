// fetch all the people from the Star Wars API (SWAPI)
//   Add all the people and their basic info to the container in the people section

// fetch to get record count and then fetch all pages
const baseURL = "https://www.swapi.tech/api/people";
const peopleContainer = document.getElementById('people-container');
const onePersonContainer = document.getElementById('one-person-container');
const onePersonHeader = document.getElementById('one-person-header');
const personDetails = document.getElementById('person-details'); // ul of details
const doneButton = document.getElementById('done-button');

// show person details only when clicked
onePersonContainer.hidden = true;

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
            urls.push(pageUrl + (i + 1) + '&limit=10');
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
        personElt.setAttribute('data-detailURL', person.url); // save the url 
        personElt.classList.add('person');
        personElt.classList.add('clickable');
        // add a header with the person's name
        personHeader = document.createElement("h2");
        personHeader.innerText = person.name;
        personElt.appendChild(personHeader);
        peopleContainer.appendChild(personElt);
      }
      return finalList;
    });

    doneButton.addEventListener('click', () => {
      onePersonContainer.hidden = true;
    })

    //console.log(finalResult);
    //console.log(finalResult.length);
}

// single event handler
peopleContainer.addEventListener('click', (event) => {
  if (event.target && event.target.closest('.clickable')) {
    let target = event.target.closest('.clickable');
    console.log('Clicked element:', target);
    // Get the id and do a second fetch
    let url = target.getAttribute('data-detailURL');
    getPersonDetails(url);
  }
} );

async function getPersonDetails(url) {
  // clear previous details
  personDetails.innerHTML = '';
  try {
    // fetch details for the selected character
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('detail fetch failed');
    }

    let details = await response.json();
    for (let propKey in details.result.properties) {
      if (propKey == 'homeworld' || propKey == 'url') {
        continue;  // skip these for now
      }
      if (propKey == 'name') {
        onePersonHeader.innerText = details.result.properties[propKey];
      }
      else {
        let propItem = document.createElement('li');
        propItem.innerText = `${propKey}: ${details.result.properties[propKey]}`;
        personDetails.appendChild(propItem);
      }
    }
    onePersonContainer.hidden = false;
    window.scrollTo(0, 0);
  }
  catch(error) {
    console.log('An error occurred during the detail fetch: ', error);
  }
}






