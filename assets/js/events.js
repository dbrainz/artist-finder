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
           
            
            if (data.events.length > 0){
                
                
                for (var i = 0; i < data.events.length; i++) {

                    var listItem = document.createElement('li');
                    var formatDate = data.events[i].datetime_local;
                    var formatTime = data.events[i].datetime_local;

                    formatDate = dayjs(formatDate).format('dddd, MMMM D');
                    formatTime = dayjs(formatTime).format('hh:mm a');

                    if (formatTime == '03:30 am'){
                        formatTime = 'TBD';
                    }

                    console.log(formatDate);
                    console.log(formatTime);
                   
                    listItem.textContent = data.events[i].venue.city + ': ' + formatDate + ' at ' + formatTime;
                    eventList.appendChild(listItem);
                    
                }
            }
            else {

                var listItem = document.createElement('li');
                listItem.textContent = 'No events';
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
    var eventList = document.getElementById('event-list');

    artistName = formatUserInput(artistName);
    eventList.innerHTML = '';
    getEvents(artistName);

    eventList.classList.add('myStyle');
});

