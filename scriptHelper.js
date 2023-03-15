// Write your helper functions here!
require('isomorphic-fetch');

// formats mission target div with information about the planet //
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML += `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `
}

//returns the type of information entered into each input (either 'empty', 'Is a Number', or 'NaN')//
function validateInput(testInput) {
   if (testInput === '')  return 'Empty';
   if (isNaN(testInput) === false) return 'IaN';
   if (isNaN(testInput) === true) return 'NaN';
}

//prompts user if they do not enter valid information or if any fields are left blank//
function requireInput(pilot, copilot, fuelLevel, cargoLevel) {
 
    let args = [pilot, copilot, fuelLevel, cargoLevel];
    let valuePresent = ['NaN', 'NaN', 'IaN', 'IaN'];

    for( let i = 0; i < args.length || i < valuePresent.length; i++ ) {

        if (validateInput(args[i]) !== valuePresent[i]) {
            window.alert('Make sure to enter valid information for each field!');
            return false;
        }
    }

    return true;
}

//sets launchStatus header to "Shuttle is Ready for Launch" and styles the color to green//
function launchReady(document) {
    const launchStatus = document.getElementById("launchStatus");
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
}

//sets launchStatus header to "Shuttle Not Ready for Launch" and styles the color to red//
function launchNotReady(document) {
    const launchStatus = document.getElementById("launchStatus");
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
}

//prevents page reloading upon submission of the form//
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    //validates information for each input in the form//
    if (requireInput(pilot, copilot, fuelLevel, cargoLevel)) {
        
        //sets the faultyItems div to visible (shows launch information to user)//
        document.getElementById("faultyItems").style.visibility = "visible";
        const listItem = list.getElementsByTagName('*'); //grabs each li in the faultyItems div and puts them into an array

        //sets launch information based on user input//
            listItem[1].innerHTML = `Pilot ${pilot} is ready`;

            listItem[2].innerHTML = `co-pilot ${copilot} is ready`;

        if (fuelLevel >= 10000) {
            listItem[3].innerHTML = `Fuel level high enough for launch`;
        } else {
            listItem[3].innerHTML = `Fuel level too low for launch`;

        }
        if (cargoLevel <= 10000) {
            listItem[4].innerHTML = `Cargo mass low enough for launch`;
        } else {
            listItem[4].innerHTML = `Cargo mass exceeds shuttle capacity`;
        }

        //updates and styles the launchStatus header based on user input//
        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            launchReady(document);
        } else {
            launchNotReady(document);
        }
    }

    event.preventDefault();
    
}

//fetches the planets json and returns a usable json document//
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

//randomly selects a number in the range of planets.length//
function pickPlanet(planets) {
    return Math.floor(Math.random() * planets.length);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
