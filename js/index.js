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
        let personURL = person.url;
        //personElt.setAttribute('data-detailURL', person.url); // save the url 
        personElt.className = 'person';
        // add a header with the person's name
        personHeader = document.createElement("h2");
        personHeader.innerText = person.name;
        personElt.appendChild(personHeader);
        peopleContainer.appendChild(personElt);
        // add an even handler for a click of the person.
        personElt.addEventListener('click', () => {
          // clear any previous person information
          while (personDetails.firstChild) {
            personDetails.removeChild(personDetails.firstChild);
          }
          // fetch and display the person details
          fetch(personURL).then((res) => {
            if (!res.ok) {
              throw new Error("Error fetching data");
            }
            return res.json();
          }).then((data) => {
              for (let propKey in data.result.properties) {
                if (propKey == 'homeworld' || propKey == 'url') {
                  continue;  // skip these for now
                }
                if (propKey == 'name') {
                  onePersonHeader.innerText = data.result.properties[propKey];
                }
                else {
                  let propItem = document.createElement('li');
                  propItem.innerText = `${propKey}: ${data.result.properties[propKey]}`;
                  personDetails.appendChild(propItem);
                }
              }
              onePersonContainer.hidden = false;
              window.scrollTo(0, 0);
            }).catch((err) => {
              console.log(err);
            });
        });
      }
      return finalList;
    });

    doneButton.addEventListener('click', () => {
      onePersonContainer.hidden = true;
    })

    //console.log(finalResult);
    //console.log(finalResult.length);
}






