var bowling_card = new BowlingCard();
var bonus = false;
set_events();
update_turn();

function set_events(){
  document.getElementById('submit_turn').addEventListener('click', this.submit_turn.bind(this));
}

function update_turn(){
  if (bowling_card.get_turn() == 11 || (bowling_card.get_turn() == 10 && !bonus)){
    document.getElementById('turn').innerHTML = "Finished game";
  }else{
    document.getElementById('turn').innerHTML = "Turn: " + (bowling_card.get_turn() + 1);
  }
}

function submit_turn(){
  var turn = bowling_card.get_turn() + 1;
  var roll1 = document.getElementById("turn" + turn + "-1");
  var roll2 = document.getElementById("turn" + turn + "-2");
  if (!(roll1.value == "" || roll2.value == "") && Number.isInteger(parseInt(roll1.value)) && Number.isInteger(parseInt(roll1.value))){
    validate(roll1, roll2, turn);
    update_turn();
    enable_next_turn(turn);
    roll1.readOnly = true;
    roll2.readOnly = true;
    check_bonus(roll1, roll2, turn);
    display_turn_scores(turn);
    check_strike_or_spare(roll1, roll2);
    if (turn == 11 || (turn == 10 && !bonus)){
      document.getElementById('submit_turn').style.visibility = 'hidden';
    }
  }else{
    roll1.value = "";
    roll2.value = "";
    alert("INVALID TURN!");
  }
}

function check_bonus(roll1, roll2, turn){
  if (turn == 10 && (parseInt(roll1.value) + parseInt(roll2.value) == 10)){
    bonus = true;
    document.getElementById('turn11-1').value = '';
    document.getElementById(turn + 1).style.visibility='visible';
    if (roll1.value == "10"){
      document.getElementById('turn11-2').value = '';
      document.getElementById('turn11-2').style.visibility='visible';
    }
  }
}

function validate(roll1, roll2, turn){
  if (turn == 11){
    if (parseInt(roll1.value) > 10 || parseInt(roll2.value) > 10){
      roll1.value = ""
      roll2.value = ""
      alert('INVALID TURN!');
      throw new Error('INVALID TURN! YOU CHEAT!')
    }else{
      bowling_card.bonus_turn(parseInt(roll1.value), parseInt(roll2.value))
    }
  }else{
    if (parseInt(roll1.value) + parseInt(roll2.value) > 10){
      roll1.value = ""
      roll2.value = ""
      alert('INVALID TURN!');
      throw new Error('INVALID TURN! YOU CHEAT!')
    }else{
      bowling_card.turn(parseInt(roll1.value), parseInt(roll2.value))
    }
  }
}

function check_strike_or_spare(roll1, roll2){
  if (bowling_card.get_turn() + 1 == 12){
    if (roll1.value == 10){
      roll1.value = "X"
    }
    if (roll2.value == 10){
      roll2.value = "X"
    }
  }else if (roll1.value == 10){
    roll2.value = "X"
    roll1.value = "";
    strike_animation();
  }
  if ((parseInt(roll1.value) + parseInt(roll2.value) == 10) && roll2.value != 0){
    roll2.value = "/"
  }
}

function enable_next_turn(turn){
  if (turn != 11){
    var next_turn1 = "turn" + (turn + 1) + "-1";
    var next_turn2 = "turn" + (turn + 1) + "-2";
    document.getElementById(next_turn1).readOnly = false;
    document.getElementById(next_turn2).readOnly = false;
  }
}

function display_turn_scores(turn){
  for (var i = 0; i < turn; i++){
    var id = 'score' + (i + 1);
    document.getElementById(id).innerHTML = bowling_card.turn_total(i);
  }
}

function strike_animation(){
  document.getElementById('strike_animation').style.visibility = 'visible';
  var roll_sound = new Audio('../audio/bowling1.mp3');
  var hit_sound = new Audio('../audio/bowling2.mp3');
  var ball = document.getElementById("ball");
  var ball_pos = 0;

  roll_sound.play();
  var id = setInterval(frame, 10);
  function frame() {
    if (ball_pos == 320){
      document.getElementById('knocked1').style.visibility = 'visible'
      hit_sound.play();
    }
    if (ball_pos == 325){
      document.getElementById('knocked2').style.visibility = 'visible'
    }
    if (ball_pos == 330){
      document.getElementById('knocked3').style.visibility = 'visible'
    }
    if (ball_pos == 335){
      document.getElementById('knocked4').style.visibility = 'visible'
    }
    if (ball_pos == 385){
      ball.style.visibility = 'hidden';
    }
    if (ball_pos == 700) {
      clearInterval(id);
      document.getElementById('strike_animation').style.visibility = 'hidden';
      document.getElementById('knocked1').style.visibility = 'hidden';
      document.getElementById('knocked2').style.visibility = 'hidden';
      document.getElementById('knocked3').style.visibility = 'hidden';
      document.getElementById('knocked4').style.visibility = 'hidden';
    } else {
      ball_pos += 2.5;
      ball.style.left = ball_pos + 'px';
    }
  }
}