window.addEventListener("load", function() {

    const form = document.querySelector("form");
    const list = document.getElementById("faultyItems");

    //grabs user input values then runs the formSubmission function//
    form.addEventListener("submit", function() {

        const pilot = form['pilotName'].value;
        const copilot = form['copilotName'].value;
        const fuelLevel = form['fuelLevel'].value;
        const cargoMass = form['cargoMass'].value;

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);

    });


   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       const planetIndex = pickPlanet(listedPlanets); //sets planetIndex variable to the index of the selected planet
       const planetSelected = listedPlanets[planetIndex]; //sets planetSelected variable because im lazy
       window.console.log(planetSelected);

       //puts info for the selected planet from the json document into corresponding variables//
       const name = planetSelected.name;
       const diameter = planetSelected.diameter;
       const star = planetSelected.star;
       const distance = planetSelected.distance;
       const moons = planetSelected.moons;
       const imageUrl = planetSelected.image;
       
       addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl,);
   })

});