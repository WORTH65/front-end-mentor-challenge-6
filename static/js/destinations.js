const destinationContainer = document.getElementById('destinationContainer');
const destinationImage = document.getElementById('destinationImage');
const controlsContainer = document.querySelector('.destinationControl ul');
let current = 0;
// Fetch Destinations data from JSON
fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        data['destinations'].forEach( (destinationInfo) => {
            let newButton = document.createElement('li');
            if (current === 0) {
                newButton.innerHTML = `
                <li>
                    <button onclick="destinationToggle(event, ${current++})" style="text-transform: uppercase;" class="btn btnPrimary active">${destinationInfo.name}</button>
                </li>`;
            } else {
                newButton.innerHTML = `
                <li>
                    <button onclick="destinationToggle(event, ${current++})" style="text-transform: uppercase;" class="btn btnPrimary">${destinationInfo.name}</button>
                </li>`;
            }
            controlsContainer.appendChild(newButton);

            let newDestination = document.createElement('article');
            newDestination.className = 'destinationContent';
            newDestination.innerHTML = `
            <h2 class="mainHeading">${destinationInfo.name}</h2>
            <p>${destinationInfo.description}</p>
            <hr class="transparent">
            <aside class="distanceTravel">
                <div>
                    <p class="btn btn-primary">AVG. DISTANCE</p>
                    <h3 class="heading">${destinationInfo.distance}</h3>
                </div>
                <div>
                    <p class="btn btn-primary">EST. TRAVEL TIME</p>
                    <h3 class="heading">${destinationInfo.travel}</h3>
                </div>
            </aside>`;
            destinationContainer.appendChild(newDestination);

            let newImage = document.createElement('img');
            newImage.src = destinationInfo.images.png;
            newImage.alt = 'Destination' + destinationInfo.name;
            destinationImage.appendChild(newImage);
        });
    })

// Toggle the destinations based on button click
function destinationToggle(e, flag) {
    if (e.currentTarget !== document.querySelector('.destinationControl').querySelector('.btnPrimary.active')) {
        let moveFlag = flag*100;
        destinationContainer.style.transform = `translate(-${moveFlag}%, 0)`;
        destinationImage.style.transform = `translate(-${moveFlag}%, 0)`;
        document.querySelector('.destinationControl').querySelector('.btnPrimary.active').classList.toggle('active');
        e.currentTarget.classList.toggle('active');
    }
}