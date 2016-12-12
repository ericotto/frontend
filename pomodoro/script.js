$(document).ready(function() {

  var sessionTime;
  var breakTime;
  
  //Event listener to start clock
  $('#start').on('click', function(event){
    event.preventDefault();
    $('#start').hide();
    $('#stop').show();
    
    sessionTime = $('#session_time').val() * 60;
    breakTime = $('#break_time').val() * 60;
    
    setInterval(function() {
      if (sessionTime < 1 && breakTime < 1) {
        sessionTime = $('#session_time').val() * 60;
        breakTime = $('#break_time').val() * 60;
        return;
      } else if (sessionTime < 1) {
        $('#session_status').text('Break')
        playSound(breakTime);
        displayTime(breakTime);
        breakTime -= 1;
        return;
      } else {
        $('#session_status').text('Session')
        playSound(sessionTime);
        displayTime(sessionTime);
        sessionTime -= 1;
        return;
      }
    }, 1000);
  });
  
  //Event listener to reset clock
  $('#stop').on('click', function() {
    $('#stop').hide();
    $('#start').show();
    clearInterval();
  });
  
});

  //Sets default time
  $('#session_time').val(25);
  $('#break_time').val(5);
  $('#stop').hide();

//Plays warning sound
function playSound(time) {
  if (time < 5) {
    var sound = new Audio('http://soundjax.com/reddo/35782%5EBEEP1.mp3');
    sound.play();
  }
}

//Displays time
function displayTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - (minutes * 60);

  if (seconds < 10) {
    $('#time_left').text(minutes + ":0" + seconds);
  } else {
  $('#time_left').text(minutes + ":" + seconds);
  }
}