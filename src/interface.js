var bowling_card = new BowlingCard();
set_events();

function set_events(){
  document.getElementById('submit_turn').addEventListener('click', this.submit_turn.bind(this));
}

function submit_turn(){
  var turn = bowling_card.get_turn() + 1;
  if (turn < 11){
    var roll1 = "turn" + turn + "-1";
    var roll2 = "turn" + turn + "-2";
    bowling_card.turn(parseInt(document.getElementById(roll1).value), parseInt(document.getElementById(roll2).value))
    if (document.getElementById(roll1).value == "10"){
      document.getElementById("strike").style.visibility='visible'
    }else{
      document.getElementById("strike").style.visibility='hidden'
    }
    document.getElementById(roll1).readOnly = true;
    document.getElementById(roll2).readOnly = true;
    document.getElementById(turn + 1).style.visibility='visible';
    document.getElementById('score').innerHTML = "Score: " + bowling_card.get_total_score();
  }
}