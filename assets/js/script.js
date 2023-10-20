
// place any code that runs on page load inside here, so that it won't run until
// after jquery finishes loading - global variable declarations and functions and such
// can go outside of here
var performers = 'new-york-mets';
var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'
var funnyURL = 'https://api.seatgeek.com/2/events?performers.slug='+performers+'&client_id='+funnyUrlApiKey;



$(function() {
    var storedArtists = JSON.parse(localStorage.getItem('previousSearches')) || [];       
    var hansDiv = document.getElementById('hansDiv');
    
    hansDiv.innerHTML = 'Previous Searches: ' + storedArtists.join(', ');

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        var artistNameInput = document.getElementById('artist-name');
        var artistName = artistNameInput.value;
        var hansDiv = document.getElementById('hansDiv');
        
        storedArtists.push(artistName);

        localStorage.setItem('previousSearches', JSON.stringify(storedArtists));
        
        hansDiv.innerHTML = 'Previous Searches: ' + storedArtists.join(', ');


        artistName = formatUserInput(artistName);
        var eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        getEvents(artistName);
        getYTArtist(artistNameInput.value)
        eventList.classList.add('myStyle');

    });

});

