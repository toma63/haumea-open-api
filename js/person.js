const params = new URLSearchParams(window.location.search);
console.log("params: ", params);
const personURL = params.get("url");
console.log("personURL: ", personURL);
personHeader = document.getElementById('person');
personDetails = document.getElementById('details');
backButton = document.getElementById('back-button');

backButton.addEventListener('click', () => {
    window.location.href = './index.html';
})

// fetch and display the person details
fetch(personURL).then((res) => {
    if (!res.ok) {
        throw new Error("Error fetching data");
    }
    return res.json();
}).then((data) => {
    for (let propKey in data.result.properties) {
        console.log("propkey", propKey);
        if (propKey == 'homeworld' || propKey == 'url') {
            continue;  // skip these for now
        }
        if (propKey == 'name') {
            personHeader.innerText = data.result.properties[propKey];
        }
        else {
            let propItem = document.createElement('li');
            propItem.innerText = `${propKey}: ${data.result.properties[propKey]}`;
            personDetails.appendChild(propItem);
        }
    }
}).catch((err) => {
    console.log(err);
});