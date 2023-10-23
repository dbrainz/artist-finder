var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'

function getEvents (performers){

    var artist = performers;
    var funnyURL = `https://api.seatgeek.com/2/events?performers.slug=${artist}&client_id=${funnyUrlApiKey}`;
    
      fetch(funnyURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){

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
                   
                    eventDisplayStr = data.events[i].venue.city + ': ' + formatDate + ' at ' + formatTime;
                    var record = data.events[i];
                    $("#event-list").append("<li class='sgListItem'><a id='sgShow" + i + "' href='" + record.url + "' class='sgLink' target='_blank'>" + eventDisplayStr + "</a></li>")
                    let seatEl = document.getElementById('sgShow' + i)
                    let tooltip = new bootstrap.Tooltip(seatEl,{
                        html:true,
                        title:"<b>" + record.short_title + "</b><br><b>Venue : </b>" + record.venue.name + "<br><b>Lowest Price : </b>" + record.stats.lowest_price + "<br><b>Average Price : </b>" + record.stats.average_price
                    })
                }
            }
            else {

                var listItem = document.createElement('li');
                listItem.textContent = 'No events 😭';
                eventList.appendChild(listItem);
            }
        })
}

function formatUserInput(input) {
    
    input = input.toLowerCase();    
    input = input.replace(/ /g, '-');

    return input;
}
