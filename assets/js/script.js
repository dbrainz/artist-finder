
// place any code that runs on page load inside here, so that it won't run until
// after jquery finishes loading - global variable declarations and functions and such
// can go outside of here
var performers = 'new-york-mets';
var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'
var funnyURL = 'https://api.seatgeek.com/2/events?performers.slug='+performers+'&client_id='+funnyUrlApiKey;
var storedArtists = "";


function loadPrevious() {
    storedArtists = JSON.parse(localStorage.getItem('previousSearch')) || [];   
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

function displayPrevious(){

    var previousEl = $("#previousSearch")
    previousEl.html('Previous Searches: ' + storedArtists.join(', ')); 
}

$(function() {

    // load and display previous artist search list
    loadPrevious();


    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        var artistNameInput = document.getElementById('artist-name');
        var artistName = artistNameInput.value;
        
        // add new search to the previous searches list
        addPrevious(artistName);
    
        artistName = formatUserInput(artistName);
        var eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        getEvents(artistName);
        getYTArtist(artistNameInput.value)
        eventList.classList.add('myStyle');

    });

});

