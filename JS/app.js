//The URIs of the REST endpoint
RAI = "https://prod-00.uksouth.logic.azure.com/workflows/6d86eaeba3314b1a8f0b8798b0ccd913/triggers/manual/paths/invoke/rest/v1/videodata?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Kgk2692jdA-M1n1fCEbDsU7mlXyUUL_lh6cxeRxIZ-g";
CUPS = "https://prod-21.uksouth.logic.azure.com/workflows/0ff7800009cb430f87e59f3c3d5332c2/triggers/manual/paths/invoke/rest/v1/videocomments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=H31D2nbqj6kn0WQ2zXCFxnT7Vqzp2e4AIWgFP4R_J6o"
RAC = "https://prod-22.uksouth.logic.azure.com/workflows/91ab6c57075b45ca8e793bb1913850c0/triggers/manual/paths/invoke/rest/v1/videocomments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_TysTMWQNH5Cr_FBs5L1rlWQDLZ0Nqe0IGsEIbQQ9X4"

RIDURL0 = "https://prod-30.uksouth.logic.azure.com/workflows/1cfd548615a641969392e89c680ce069/triggers/manual/paths/invoke/rest/v1/videodata/"
RIDURL1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3Pag8RKTUpQyHvgDd9m_pp4_CfgPjbUgrH0zSdqF9ww"

BLOB_ACCOUNT = "https://b00645579blob.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

  $("#retComments").click(function(){

    //Run the get asset list function
    getComments();

  });

  $("#retVidID").click(function(){

    //Run the get asset list function
    getVidID();

  });
  //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//window.onload = getUserInfo();
window.onload = getUserInfo()

//A function to retrieve logged in user info
async function getUserInfo() {
  const response = await fetch('/.auth/me');
  const payload = await response.json();
  const { clientPrincipal } = payload;
  const user = clientPrincipal.userDetails;
  return user;  

}


function doThings() {
  getUserInfo().then((thing1) => {
    //do something with the first response
    console.log(thing1);
  });

}

console.oldLog = console.log;

console.log = function log(value)
{
    console.oldLog(value);
    window.$log = value;
    return value;

};


//doThings()



//A function to retrieve logged in user info
//async function getUserInfo() {
  //const baseUri = "https://gentle-cliff-07dc61c03.2.azurestaticapps.net";
  //const http = new HttpClient(); { BaseAddress = new Uri(baseUri) };
  //const response = await http.GetStringAsync("/.auth/me").ConfigureAwait(false);
  //return response;

//}

//let testy = await getUserInfo();
//var test = getUserInfo();

//var obj = JSON.stringify(test);
var DisplayName = log();


//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
  //Construct JSON Object for new item
  var subObj = {
    videoID: $('#videoID').val(),
    userName: $('#userDetails').val(),
    Comment: $('#Comment').val(),
    Rating: $('#Rating').val()

    }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CUPS,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
    getComments();
    });
    
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<video width='500' height='400' controls>");
      items.push("<source src="+BLOB_ACCOUNT + val["filePath"] +" /> <br />");
      items.push("</video>");
      items.push( "<br>");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "Title: " + val["Title"] + "<br />");
      items.push( "Publisher: " + val["Publisher"] + "<br />");
      items.push( "Producer: " + val["Producer"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Age Rating: " + val["ageRating"] + "<br />");
      //items.push( "Uploaded By: " + val["userName"] + "<br />");
      items.push( "Uploaded By: " + DisplayName + "<br />");

     });

      //Clear the assetlist div 
      $('#ImageList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-list",
       html: items.join( "" )
     }).appendTo( "#ImageList" );
   });
}

//A function to get a list of all the comments and write them to the Div with the CommentList Div
function getComments(){

  //Replace the current HTML in that div with a loading message
  $('#CommentList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAC, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "User Name: " + val["userName"] + "<br />");
      items.push( "Comment: " + val["Comment"] + "<br />");
      items.push( "Rating: " + val["Rating"] + "<br />");


     });

      //Clear the assetlist div 
      $('#CommentList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-comments",
       html: items.join( "" )
     }).appendTo( "#CommentList" );
   });
}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVidID(){

  videoIDSearch = $('#videoIDSearch').val();

  //Replace the current HTML in that div with a loading message
  $('#VideoIDList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RIDURL0 + videoIDSearch + RIDURL1, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<video width='500' height='400' controls>");
      items.push("<source src="+BLOB_ACCOUNT + val["filePath"] +" /> <br />");
      items.push("</video>");
      items.push( "<br>");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "Title: " + val["Title"] + "<br />");
      items.push( "Publisher: " + val["Publisher"] + "<br />");
      items.push( "Producer: " + val["Producer"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Age Rating: " + val["ageRating"] + "<br />");
      items.push( "Uploaded By: " + val["userName"] + "<br />");

     });

      //Clear the assetlist div 
      $('#VideoIDList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-video-list",
       html: items.join( "" )
     }).appendTo( "#VideoIDList" );
   });
}