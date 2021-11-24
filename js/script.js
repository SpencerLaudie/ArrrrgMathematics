// elements
var map = "<div id='map'></div>";
var title_screen = "<div id='title_screen' style='opacity:0'><img src='images/pirate-ship-front.svg' alt='pirate ship' id='title_img'><div id='title_screen_cont'><h1 id='title'>Arrrg!!<br>Mathematics</h1><div id='start_button_cont'><button id='start_button'>Start</button></div></div></div>";
var pirate_ship = "<div class='ship' id='player-ship'><img src='images/pirate-ship-top.svg' alt='pirate ship'></div>";
var skull = "<div class='life'><img src='images/skull.svg' alt='skull'></div>";
var skull_sil = "<div class='life'><img src='images/skull-silhouette.svg' alt='skull silhouette'></div>";
var lives = "<div id='lives-container'></div>";
var score = "<div id='score-container'><img id='score-doubloon' src='images/doubloon.svg' alt='doubloon'/><p id='score'></p></div>";
var cannon_ball_r = "<div class='cannon-ball' id='cannon-ball-r'></div>";
var cannon_ball_l = "<div class='cannon-ball' id='cannon-ball-l'></div>";
var cannon_ball = "<div class='cannon-ball'></div>";
var left_math = "<div id='left-math' class='math'><p class='shoot-instructions'>Shoot Left</p><p id='equation-left' class='operand'></p></div>";
var right_math = "<div id='right-math' class='math'><p class='shoot-instructions'>Shoot Right</p><p id='equation-right' class='operand'></p></div>";
var math_answer = "<div id='math-answer'><div id='answer-input'></div></div>"
var explosion = "<iframe src='https://giphy.com/embed/QYkViQRNkpS1Sgx0js' width='300' height='180' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>";
var ship_left = "<div class='ship ship-left enemy' id='ship-left'><img src='images/ship-top.svg' alt='ship'></div>";
var ship_right = "<div class='ship ship-right enemy' id='ship-right'><img src='images/ship-top.svg' alt='ship'></div>";

// move vars
var player_pos;
var change = {
  38: {top: "-=1", transform: "rotate(-90deg)"},
  40: {top: "+=1", transform: "rotate(90deg)"}
}
var nums = {
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  96: "0",
  97: "1",
  98: "2",
  99: "3",
  100: "4",
  101: "5",
  102: "6",
  103: "7",
  104: "8",
  105: "9"
}
var going;

var num_score = 0;
var num_lives = 5;

var attack_delay = 5000;
var timer;

var answer_l;
var answer_r;

$(document).ready(function() {

  //create game canvas
  $('body').html(map);

  //load title screen
  $('#map').html(title_screen);
  $('#title_screen').delay(1000).fadeTo(2000, 1);

  $('button').click(function() {
    startGame();
  });

})

function startGame() {
  $('#title_screen').remove();

  $('#map').append(pirate_ship);
  $('#map').append(lives);
  setLives();

  $('#map').append(score);
  setScore();

  $('#map').append(left_math);
  $('#map').append(right_math);
  $('#map').append(math_answer);
  setEquations();

  $('#map').append(cannon_ball_l);
  $('#map').append(cannon_ball_r);


  $(document).one("keydown", keyDown);
  timer = setInterval(attack, attack_delay);
}

function gameOver() {
  $('#map').empty();

}

function keyDown(e) {
  $(document).one("keyup", keyup);
  if (e.which == 38 || e.which == 40) {
    var animation = change[e.which];
    going = setInterval(keepGoing, 1);
  }
  if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
    $('#answer-input').append(nums[e.which]);
    $('#answer-input').text($('#answer-input').text().substring(0,3));
  }
  if (e.which == 8) {
    $('#answer-input').text($('#answer-input').text().substring(0,$('#answer-input').html().length - 1));
  }
  if (e.which == 13) {
    if ($('#answer-input').text() != "") {
      checkAnswer();
      $('#answer-input').empty();
    }
  }

  function keepGoing() {
    player_pos = parseInt($('#player-ship').position().top);
    if (player_pos >= 150 && player_pos <= 700) {
      $("#player-ship").css(animation);
    } else if (player_pos <= 150) {
      $("#player-ship").css({top: "+=1"});
    } else if (player_pos >= 700) {
      $("#player-ship").css({top: "-=1"});
    }
  }
}

function keyup(e) {
  clearInterval(going);
  $(document).one("keydown", keyDown);
}

function checkAnswer() {
  if (parseInt($('#answer-input').text()) == answer_r) {
    shoot_right();
  }
  if (parseInt($('#answer-input').text()) == answer_l) {
    shoot_left();
  }
  if (parseInt($('#answer-input').text()) == answer_r || parseInt($('#answer-input').text()) == answer_l) {
    setEquations();
  }
}

function getPlayerPos() {
  var top;
  if ($('#player-ship').css('transform').split(',')[1] == 1) {
    top = parseInt($('#player-ship').css('top')) + 10;
  } else {
    top = parseInt($('#player-ship').css('top')) + 20;
  }
  return top;
}

function shoot_right() {
  $('#cannon-ball-r').css({'display': 'block', 'top': getPlayerPos(), 'left': '620px'});
  $('#cannon-ball-r').animate({'left':'1208px'}, {duration: 2000, queue: false, easing: 'linear'});
  $('#cannon-ball-r').animate({'height':'15px', 'width':'15px'}, {duration: 800});
  $('#cannon-ball-r').animate({'height':'8px', 'width':'8px'}, {duration: 800});

  // setInterval(() => {
  //   let $enemy = collision($('#cannon-ball-r'),$('.enemy'))
  //   if ($enemy != null){
  //       $enemy.remove();
  //       $('#cannon-ball-r').css({'display': 'none'});
  //   }
  // },50);

}

function shoot_left() {
  $('#cannon-ball-l').css({'display': 'block', 'top': getPlayerPos(), 'left': '580px'});
  $('#cannon-ball-l').animate({'left':'-8px'}, {duration: 2000, queue: false, easing: 'linear'});
  $('#cannon-ball-l').animate({'height':'15px', 'width':'15px'}, {duration: 800});
  $('#cannon-ball-l').animate({'height':'8px', 'width':'8px'}, {duration: 800});
}

function checkHit($enemy, ball, time) {
  if(collision($(ball),$enemy)) {
    $(ball).css({'display': 'none', 'top': '-8px', 'left': '-8px'});
    $enemy.stop();
    $enemy.remove();
    // num_score = num_score + 500;
    // setScore();
    clearInterval(time);
  }
}

function checkCollision($enemy, time) {
  if (collision($('#player-ship'), $enemy)) {
    $enemy.stop();
    $enemy.remove();
    num_lives--;
    setLives();
    clearInterval(time);
    return true;
  }
  else return false;
}

function attack() {
  let side = getRandomInt(0,2);
  let top_pos = getRandomInt(200,600);
  if (side == 0) {
    $('#map').prepend(ship_left);
    let $ship = $('#ship-left');
    $ship.removeAttr('id');
    $ship.css({'top': top_pos, 'left': '-110px'});

    var time_l = setInterval(function() {
      if (checkHit($ship, '#cannon-ball-l'))
        clearInterval(time_l);
    }, 50);
    var time_r = setInterval(function() {
      if (checkHit($ship, '#cannon-ball-r'))
        clearInterval(time_r);
    }, 50);

    var time_col = setInterval(checkCollision, 50, $ship, time_col);

    $ship.animate({'left': '1310px'}, 20000, "linear", function() {
      num_lives--;
      setLives();
      $(this).remove();
    });
  } else {
    $('#map').prepend(ship_right);
    let $ship = $('#ship-right');
    $ship.removeAttr('id');

    $ship.css({'top': top_pos, 'left': '1310px'});

    var time;

    var time_l = setInterval(function() {
      if (checkHit($ship, '#cannon-ball-l'))
        clearInterval(time_l);
    }, 50);
    var time_r = setInterval(function() {
      if (checkHit($ship, '#cannon-ball-r'))
        clearInterval(time_r);
    }, 50);

    setInterval(checkCollision, 50, $ship);

    $ship.animate({'left': '-110px'}, 20000, "linear", function() {
      num_lives--;
      setLives();
      $(this).remove();
    });
  }
  attack_delay -= 100;

}

function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        console.log("false");
        return false;
      }
      console.log("true");
      return true;
  }

function setEquations() {
  let x_l = getRandomInt(0,12);
  let y_l = getRandomInt(0,12);
  answer_l = x_l * y_l;
  $("#equation-left").text(x_l.toString() + "×" + y_l.toString());

  let x_r = getRandomInt(0,12);
  let y_r = getRandomInt(0,12);
  answer_r = x_r * y_r;
  $("#equation-right").text(x_r.toString() + "×" + y_r.toString());
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function setLives() {
  if (num_lives > 0) {
    $('#lives-container').empty();
    for (let i = 0; i < 5 - num_lives; i++) {
      $('#lives-container').append(skull);
    }
    for (let i = 0; i < num_lives; i++) {
      $('#lives-container').append(skull_sil);
    }
  } else {
    clearInterval(timer);
    gameOver();
  }
}

function setScore() {
  $('#score').html(num_score.toString());
}
