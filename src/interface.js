var bowling_card = new BowlingCard();
set_events();
update_turn();

function set_events(){
  document.getElementById('submit_turn').addEventListener('click', this.submit_turn.bind(this));
}

function update_turn(){
  document.getElementById('turn').innerHTML = "Turn: " + (bowling_card.get_turn() + 1);
}

function submit_turn(){
  var bonus = false;
  var turn = bowling_card.get_turn() + 1;
  var roll1 = document.getElementById("turn" + turn + "-1");
  var roll2 = document.getElementById("turn" + turn + "-2");
  bowling_card.turn(parseInt(roll1.value), parseInt(roll2.value))
  update_turn();
  enable_next_turn(turn);
  roll1.readOnly = true;
  roll2.readOnly = true;
  document.getElementById('score').innerHTML = "Score: " + bowling_card.get_total_score();
  console.log(roll1.value, roll2.value)
  if (turn == 10 && (parseInt(roll1.value) + parseInt(roll2.value) == 10)){
    bonus = true;
    document.getElementById(turn + 1).style.visibility='visible';
    if (roll1.value == "10"){
      document.getElementById('turn11-2').style.visibility='visible';
    }
  }
  display_turn_scores(turn);
  check_strike_or_spare(roll1, roll2);
  if (turn == 11 || (turn == 10 && !bonus)){
    document.getElementById('submit_turn').style.visibility = 'hidden';
  }
}

function check_strike_or_spare(roll1, roll2){
  if (roll1.value == 10){
    roll1.value = "X"
  }else if (parseInt(roll1.value) + parseInt(roll2.value) == 10){
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