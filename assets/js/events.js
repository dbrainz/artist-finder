var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'

function getEvents (performers){

    var artist = performers;
    var funnyURL = `https://api.seatgeek.com/2/events?performers.slug=${artist}&client_id=${funnyUrlApiKey}`;
    
      fetch(funnyURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)

            var eventList = document.getElementById('event-list');

            for (var i = 0; i < data.length; i++) {

                var listItem = document.createElement('li');
                listItem.textContent = data.events[i].venue.city + ': ' + data.events[i].datetime_local + ' local time'
                eventList.appendChild(listItem);

            }


        })


}


function formatUserInput(input) {
    
    input = input.toLowerCase();

    
    input = input.replace(/ /g, '-');

    return input;
}



document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var artistNameInput = document.getElementById('artist-name');
    var artistName = artistNameInput.value;
    artistName = formatUserInput(artistName);
    getEvents(artistName);
});