const YT_API_KEY="AIzaSyDvGaotukI76kg-Q_EaojpRgRGFatg0M7c";


function getYTArtist(artistName) {
    var ytArtistQueryStr = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + artistName + "&type=video&key=" + YT_API_KEY;

    fetch(ytArtistQueryStr)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
                // test code that dumps the results to the page

            for (let x=0; x<data.items.length; x++) {
                let videoID = data.items[x].id.videoId
                let videoName = data.items[x].snippet.title
                let videoImage = "<img src='" + data.items[x].snippet.thumbnails.default.url + "'>"
                $("#yt-videos").append("<li><a href='https://www.youtube.com/watch?v=" + videoID + "' target='_blank'>" + videoImage + "  " + videoName +  "</a></li>")
            }
        });


}
