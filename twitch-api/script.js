$(document).ready(function() {
  
  //all twitch channels that are checked
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
  
  //create html for each channel and appends to DOM
  channels.forEach(getChannel);
  
  //buttons to show all, online, or offline channels 
  $("#all").on("click", all);
  $("#online").on("click", online);
  $("#offline").on("click", offline);
  
});

//creates html for a given channel and appends to DOM
function getChannel(channel) {
  $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channel,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
          buildChannel(data);
      }
    })
}

function buildChannel(data) {
    var status = checkStatus(data.display_name);
    var opening = status ? "<div class='on'>" : "<div class='off'>";
    //adds image if available or generic placeholder
    if (data.logo) {
      var logo = "<img src='" + data.logo + "' height='50' width='50'>";
    } else {
      var logo = "<span class='glyphicon glyphicon-user'></span>";
    }
    //adds channel name
    if (data.display_name == undefined) {
        var name = "<p class='name-undefined'>Account Closed</p>";
    } else {
        var name = "<a href="+data.url+">"
        name += "<p class='name'>" + data.display_name + "</p></a>";
    }
    //adds "check" if streaming or "x" if not streaming
    if (status) {
      var status = "<span class='glyphicon glyphicon-ok'></span>";
    } else {
      var status = "<span class='glyphicon glyphicon-remove'></span>";
    }
    //combine all parts together to create HTML object
    var closing = "</div>";
    var output = opening + logo + name + status + closing;
    //append the channel into the DOM
    $("#channels").append(output);
}
 
//checks if channel is currently streaming
function checkStatus(channel) {
  $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channel,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        if (data.stream === null) {
            return false;
        } else {
            return true;
        }
      }
    });
}

//show all channels
function all() {
  $(".on").show();
  $(".off").show();
}
  
//show only streaming channels
function online() {
  $(".off").hide();
  $(".on").show();
}

//show only offline channels
function offline() {
  $(".on").hide();
  $(".off").show();
}