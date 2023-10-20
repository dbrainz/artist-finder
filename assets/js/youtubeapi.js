// call the youtube api with the function getYTArtist(artist_name, num_of_results (optional))
// example : getYTArtist("metallica") or getYTArtist("fugees", 20)
// default number of results returned is 10
//
// returns an array of objects
// name - title of the video
// description - description of the video
// url - url of the video
// channelTitle - name of the youtube channel the video is attached to
// channelURL - url of the video's channel
// imageSm - url of the small thumbnail for the video - 120px x 90px
// imageMd - url of the medium thumbnail for the video - 320px x 180px
// imageLg - url of the large thumbnail for the video - 480px x 360px

const YT_API_KEY="AIzaSyDvGaotukI76kg-Q_EaojpRgRGFatg0M7c";

function getYTArtist(artistName, numOfResults=10) {
    var ytArtistQueryStr = ""
    var results=[];

    // remove single and double quotes, ampersands, and replace spaces with underscores
    queryArtistName = artistName.replace(" & ", "_and_")
        .replace("&", "_and_")
        .replace(" ", "_")       
        .replace("'","")
        .replace('"',"");

    console.log(queryArtistName);
    ytArtistQueryStr = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=" + numOfResults + "&q=" + artistName + "&type=video&key=" + YT_API_KEY;

    fetch(ytArtistQueryStr)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // build an object for each video to add to the results array
            for (let x=0; x<data.items.length; x++) {
                let videoObj = {
                    name : data.items[x].snippet.title,
                    description : data.items[x].snippet.description,
                    imageSm : data.items[x].snippet.thumbnails.default.url,
                    imageMd : data.items[x].snippet.thumbnails.medium.url,
                    imageLg : data.items[x].snippet.thumbnails.high.url,
                    url : "https://www.youtube.com/watch?v=" + data.items[x].id.videoId,
                    channelTitle : data.items[x].snippet.channelTitle,
                    channelURL : "https://www.youtube.com/channel/" + data.items[x].snippet.channelID               
                }
                results.push(videoObj);
            }

            return results;
        });


}
