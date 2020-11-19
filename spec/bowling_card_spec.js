describe('BowlingCard', function(){

  var bowling_card;

  beforeEach(function(){
    bowling_card = new BowlingCard();
  });

  describe('turn', function(){
    it('Can call you out on bs scores', function(){
      expect(function(){ bowling_card.turn(8, 8); }).toThrowError("INVALID TURN! YOU CHEAT!")
    });
  });

  describe('turn_total', function(){
    it('can total a single turn', function(){
      bowling_card.turn(3, 4);
      bowling_card.turn(2, 1);
      bowling_card.turn(5, 1);
      expect(bowling_card.turn_total(1)).toEqual(3);
    });
  });

  describe('totalScores', function(){
    it('Can total the scores', function(){
      bowling_card.turn(3, 4);
      bowling_card.turn(2, 1);
      bowling_card.turn(5, 1);
      expect(bowling_card.get_total_score()).toEqual(16);
    });

    it('Can sum previous scores with a spare', function(){
      bowling_card.turn(3, 7);
      bowling_card.turn(2, 1);
      bowling_card.turn(7, 2);
      expect(bowling_card.get_total_score()).toEqual(24);
    });

    it('Can sum previous scores with a strike', function(){
      bowling_card.turn(10, 0);
      bowling_card.turn(2, 1);
      bowling_card.turn(7, 2);
      expect(bowling_card.get_total_score()).toEqual(25);
    });

    it('Can sum previous scores with a double strike', function(){
      bowling_card.turn(10, 0);
      bowling_card.turn(10, 0);
      bowling_card.turn(7, 2);
      expect(bowling_card.get_total_score()).toEqual(55);
    });

    it('Can sum previous scores with a strike and a spare', function(){
      bowling_card.turn(5, 5);
      bowling_card.turn(10, 0);
      bowling_card.turn(7, 2);
      expect(bowling_card.get_total_score()).toEqual(48);
    });

  });
});