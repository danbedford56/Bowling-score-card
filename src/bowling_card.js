class BowlingCard{

  constructor(){
    this._turn = 0;
    this._total_score = 0;
    this._scores = [];
  }

  spare(){
    return this._scores[this._turn - 1][0] + this._scores[this._turn - 1][1] === 10;
  }

  strike(){
    return this._scores[this._turn - 1][0] === 10;
  }

  double_strike(){
    return this._scores[this._turn - 2][0] === 10;
  }

  get_turn(){
    return this._turn;
  }

  turn(roll1, roll2){
    this._scores[this._turn] = [roll1, roll2, 0]
    // Only check for strike/spare if not first turn
    if(this._turn >= 1){
      // Check for strike
      if(this.strike()){
        this._scores[this._turn - 1][2] += (roll1 + roll2)
        // Only check for double strike if at least 3rd turn
        if(this._turn >= 2){
          // Check for double strike
          if(this.double_strike()){
            this._scores[this._turn - 2][2] += roll1
          }
        }
      }else if(this.spare()){
        this._scores[this._turn - 1][2] += roll1
      }
    }
    console.log(this._scores);
    this._turn += 1;
    this.totalScores();
  }

  bonus_turn(roll1, roll2){
    if (this._scores[8][0] == 10){
      this._scores[8][2] += roll1;
    }
    this._scores[this._turn] = [roll1, roll2, 0]
    this._turn += 1;
    this.totalScores();
  }

  turn_total(turn){
    var sum = 0;
    for(var j = 0; j < turn + 1; j++){
      for(var i=0; i<3; i++){
        sum += this._scores[j][i]
      }
    }
    return sum;
  }

  totalScores(){
    this._total_score = 0;
    for (var i = 0; i < this._turn; i++){
      this._total_score += (this._scores[i][0] + this._scores[i][1] + this._scores[i][2]);
    }
  }
}