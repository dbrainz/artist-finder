
// place any code that runs on page load inside here, so that it won't run until
// after jquery finishes loading - global variable declarations and functions and such
// can go outside of here
var performers = 'new-york-mets';
var funnyUrlApiKey = 'Mzc1ODA2NjR8MTY5NzUwNDM1MS4yMDEzNTM'
var funnyURL = 'https://api.seatgeek.com/2/events?performers.slug='+performers+'&client_id='+funnyUrlApiKey;


$(function() {

/*    fetch(funnyURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
*/

getYTArtist("the fugees")


});