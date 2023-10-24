// call the youtube api with the function getYTArtist(artist_name, num_of_results (optional))
// example : getYTArtist("metallica") or getYTArtist("fugees", 20)
// default number of results returned is 10
//
// returns an array of objects
// -------
// name - title of the video
// description - description of the video
// url - url of the video
// channelTitle - name of the youtube channel the video is attached to
// channelURL - url of the video's channel
// imageSm - url of the small thumbnail for the video - 120px x 90px
// imageMd - url of the medium thumbnail for the video - 320px x 180px
// imageLg - url of the large thumbnail for the video - 480px x 360px
// id - Youtubes unique ID for the video
// videoLength - string with the video length formatted for display
// views - number of views the video has had
// publishDate - date the video was added to Youtube


const YT_API_KEY="AIzaSyDvGaotukI76kg-Q_EaojpRgRGFatg0M7c";


function getYTArtist(artistName, numOfResults=10) {
    var ytArtistQueryStr = ""
    var ytVideoQueryStr= ""
    var videoIdQueryStr = ""
    var results=[];

    // remove single and double quotes, ampersands, and replace spaces with underscores
    queryArtistName = artistName.replace(" & ", "_and_")
        .replace("&", "_and_")
        .replace(" ", "_")       
        .replace("'","")
        .replace('"',"");

    ytArtistQueryStr = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=" + numOfResults + "&q=" + artistName + "&type=video&key=" + YT_API_KEY;

    // first youtube api query - searches based on the user input
    // uses 100 youtube api quota coins
    fetch(ytArtistQueryStr)
        .then(function (artistResponse) {
            if (!artistResponse.ok) {
                const error = (data && data.message) || Response.status;
                return Promise.reject(error);
            }
            return artistResponse.json();
        })
        .then(function (artistData) {

            
            // build the a comma delimited list of the video ids retrieved by the first search so we can
            // call a different endpoint on the youtube api to get more detailed info for each video
            for (let x=0; x<artistData.items.length; x++) {
                if (x===0) {
                    videoIdQueryStr = artistData.items[x].id.videoId
                } else {
                    videoIdQueryStr = videoIdQueryStr + "%2C" + artistData.items[x].id.videoId
                }
            }

            ytVideoQueryStr = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics%2Cstatus&id=" + videoIdQueryStr + "&key=" + YT_API_KEY;

            // call youbue api a second time to get detailed info about each video
            fetch(ytVideoQueryStr)
                .then(function(videoResponse){
                    return videoResponse.json()
                })
                .then(function(videoData){
                    
                    // build an object for each video combining the info that we will actually use from the first and second objects
                    for (let x=0; x<artistData.items.length; x++) {
                        let workDate = videoData.items[x].snippet.publishedAt
                        let videoObj = {
                            id : artistData.items[x].id.videoId,
                            name : artistData.items[x].snippet.title,
                            description : artistData.items[x].snippet.description,
                            imageSm : artistData.items[x].snippet.thumbnails.default.url,
                            imageMd : artistData.items[x].snippet.thumbnails.medium.url,
                            imageLg : artistData.items[x].snippet.thumbnails.high.url,
                            url : "https://www.youtube.com/watch?v=" + artistData.items[x].id.videoId,
                            channelTitle : artistData.items[x].snippet.channelTitle,
                            channelURL : "https://www.youtube.com/channel/" + artistData.items[x].snippet.channelID, 
                            videoLength : videoData.items[x].contentDetails.duration.substr(2).replace(/hms/g,":"),
                            views : videoData.items[x].statistics.viewCount,
                            publishDate : workDate.substr(5,2) + "/" + workDate.substr(8,2) + "/" + workDate.substr(0,4)

                        }
                        results.push(videoObj);
                    }

                    displayYTData(results);
                })

        })
        .catch((error) => {
            $("#yt-videos").append("<li><b>YouTube API daily quota exceeded</b></li>")
        })
}


// Generate and append list items for the video list
function displayYTData(ytData) {
    $("#yt-videos").empty();
    for (x=0; x<ytData.length; x++) {                                  
        $("#yt-videos").append("<li class='ytListItem'><a id='ytVideo" + x + "' href='" + ytData[x].url + " class='ytLink' target='_blank'><div class='row'><img src='" + ytData[x].imageSm + "' class='ytImage col-3'><span class='col-9 my-auto'>" + ytData[x].name + "</span></div></a></li>")
        // Build tooltip with video views, length, and date added to youtube
        let videoEl = document.getElementById('ytVideo' + x)
        let tooltip = new bootstrap.Tooltip(videoEl,{
            html:true,
            title:"<b>Views : </b>" + ytData[x].views + "<br><b>Length : </b>" + ytData[x].videoLength + "<br><b>Released : </b>" + ytData[x].publishDate
        })
    }
}