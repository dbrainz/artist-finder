
// place any code that runs on page load inside here, so that it won't run until
// after jquery finishes loading - global variable declarations and functions and such
// can go outside of here
var performers = 'new-york-mets';
var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'
var funnyURL = 'https://api.seatgeek.com/2/events?performers.slug='+performers+'&client_id='+funnyUrlApiKey;


$(function() {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        var artistNameInput = document.getElementById('artist-name');
        var artistName = artistNameInput.value;
        artistName = formatUserInput(artistName);
        var eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        getEvents(artistName);
        eventList.classList.add('myStyle');
    });






});

