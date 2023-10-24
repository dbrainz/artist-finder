
// place any code that runs on page load inside here, so that it won't run until
// after jquery finishes loading - global variable declarations and functions and such
// can go outside of here

var storedArtists = "";

function loadPrevious() {
    storedArtists = JSON.parse(localStorage.getItem('previousSearch')) || []; 
    //storedArtists= [];  
    displayPrevious();    
}

function addPrevious(searchStr) {
    // search for entry matching current search in previous searches and remove the old one if found
    removeIndex = storedArtists.findIndex( (name) => name === searchStr)

    if (removeIndex >= 0) {
        storedArtists.splice(removeIndex, 1)
    }
    // add new search to the end of the list and remove entries from the front of the list if there are more than 10 entries
    storedArtists.push(searchStr);
    if (storedArtists.length>10) {
        storedArtists = storedArtists.slice(storedArtists.length - 10)
    }
    localStorage.setItem('previousSearch', JSON.stringify(storedArtists));
    displayPrevious();
}

function displayIndex(prevIndex) {
    $("#artist-name").val(storedArtists[prevIndex])
    artistSearch(storedArtists[prevIndex])
}

function displayPrevious(){
    // build and display the list of previous searches
    var previousEl = $("#previousSearchEl")
    buildStr = "Previous Searches : "

    previousEl.empty()
    previousEl.append("Previous Searches : ")
    for (x=0; x<storedArtists.length;x++) {
        previousEl.append("<li><a href = '#' id='#prevSearch" + x + "' onclick=displayIndex(" +  x + ")>" + storedArtists[x] + "</a></li>")

        listenEl = $("#prevSearch" + x)
        listenEl.click(function() {
            console.log("foo")
            artistSearch(storedArtists[x])
        })
    }
}

function artistSearch(searchName) {
    // main work function
    // add new search to previous searches list
    addPrevious(searchName);
    // clean up the user input
    var cleanName = formatUserInput(searchName);
    var eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    // call seatgeek api
    getEvents(cleanName);
    // call youtube api
    getYTArtist(searchName)

}
$(function() {

    // load and display previous artist search list omn page load 
    loadPrevious();

    // listen for clicks on search button
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        var artistNameInput = document.getElementById('artist-name');
        var artistName = artistNameInput.value;

        artistSearch(artistName)
        
    });

});

