function initMap() {

    const southwest = L.latLng([-18.009309886294744, 25.639135216141245]); 
    const northeast = L.latLng([-17.77243750358626, 26.026059944935742]);

    const bounds = L.latLngBounds(southwest, northeast); 

    var street_view = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 7,
    maxzoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    });

    this.map = new L.map('map', {maxBounds: bounds}).fitWorld().addLayer(street_view).setView([-17.879640987467, 25.82830604741852], 12);

    //map.locate({setView: true, maxZoom: 16});

}

function locateUser() {
    this.map.locate({setView: true, maxZoom: 16});
}

var map = null; 

initMap(); 


// ##############################################################################################
// ------------------------------------ MARKER CREATION ----------------------------------------
// ##############################################################################################

// holds the number of snares 

let snareCount = 0; 


// what to do if the location is not found 

function onLocationError(e) {
    alert(e.message);
    console.log("An error was found");
}

// the function performed if the location is found 
function onLocationFound(e) {
    var radius = e.accuracy;

    console.log(e);

    console.log("new location added")

    snareCount += 1; 

    L.marker(e.latlng).addTo(map)
        .bindPopup(`Snare Number: ${snareCount}. <br> Location accuracy: ${radius}`).openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

// adds a marker to the map considering accuray if the add snare button is clicked. 
function addSnare() {

    console.log("snare added")

    this.map.locate();

    this.map.on('locationfound', onLocationFound);

    this.map.once('locationerror', onLocationError);

}


// map.on('locationfound', onLocationFound);

// map.on('locationerror', onLocationError);


// ##############################################################################################
// ------------------------------------ ADD SNARE BUTTON ----------------------------------------
// ##############################################################################################

// var snareButtonText = "Would you like to add a snare";

// var div = document.createElement("div");

// const newContent = document.createTextNode(snareButtonText); 
  
// div.appendChild(newContent); 
// div.id = "snareoptions"; 
// div.className = 'snareoptions'
// const testDiv = document.getElementById("snareoptions")

// console.log(div)

// document.body.insertBefore(div, testDiv);

$('#snareoptions').dialog({
    autoOpen: false,
    modal: true,
    zIndex: 10000,
    width: 'auto',
    buttons: [{
        id : 'addsnaresecondbutton', 
        text: 'Add Snare', 
        click : function() { 
            addSnare();
          $(this).dialog('close');
        }}, 
        {
        id : 'cancelButton', 
        text: 'Cancel', 
        click : function() { 
            $(this).dialog('close');
        }},   
        ]
});


$('#snarebutton').click(function() {
    console.log("Button Clicked")
    $('#snareoptions').dialog("open");
});
  
