import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  noOfPlayers = 2; //N
  maxScore = 50; //M
  startGame = false;
  errorMesg = '';
  currentPlayer = 0;
  currentRank = 0;
  currentScore = 0;
  someMsg = '';
  gameOver = false;
  sussMsg='';
  playersArr = [
    {
      name: 'player 1',
      score: 0,
      rank: 0,
      isEligibleNextRound: true,
      listDice: 0
    },
    {
      name: 'player 2',
      score: 0,
      rank: 0,
      isEligibleNextRound: true,
      listDice: 0
    }
  ];

  onRollClick() {
    this.someMsg = '';
    this.sussMsg='';
    this.currentScore = Math.floor(Math.random() * 6) + 1;
    if (this.currentScore == 6) {
      this.playersArr[this.currentPlayer].listDice = this.currentScore;
      this.playersArr[this.currentPlayer].score += this.currentScore;
      if (this.playersArr[this.currentPlayer].score >= this.maxScore) {
        this.giveARankToPlayer(this.currentPlayer);
        this.goToNextPlayer();
        return;
      }
      this.someMsg = 'congratulations roll again ';
      return;
    }
    if (
      this.currentScore == 1 &&
      this.currentScore == this.playersArr[this.currentPlayer].listDice
    ) {
      this.someMsg = 'Sorry you are skiped for next turn';
    }
    this.playersArr[this.currentPlayer].listDice = this.currentScore;
    this.playersArr[this.currentPlayer].score += this.currentScore;
    if (this.playersArr[this.currentPlayer].score >= this.maxScore) {
      this.giveARankToPlayer(this.currentPlayer);
    }
    this.goToNextPlayer();
  }

  giveARankToPlayer(player) {
    this.playersArr[player].rank = ++this.currentRank;
    var element = this.playersArr[player];
    this.sussMsg=this.playersArr[player].name +' your rank is ' +this.currentRank;
   this.playersArr.splice(player, 1);
   this.playersArr.splice(this.currentRank - 1, 0, element);
  }

  goToNextPlayer() {
    if (this.checkIstherAnyplayerLeft()) {
      this.currentPlayer = this.getNextPlayer(this.currentPlayer + 1);
    } else {
      this.gameOver = true;
    }
  }
  getNextPlayer(player) {
    if (player > this.playersArr.length - 1) {
      player = 0;
    }
    if (this.playersArr[player].isEligibleNextRound == false) {
      this.playersArr[player].isEligibleNextRound = true;
      return this.getNextPlayer(++player);
    }
    if (this.playersArr[player].rank != 0) {
      return this.getNextPlayer(++player);
    }
    return player;
  }
  checkIstherAnyplayerLeft() {
    for (let i = 0; i < this.playersArr.length; i++) {
      if (this.playersArr[i].rank == 0) {
        return true;
      }
    }
    return false;
  }
  resetGame() {
    for (let i = 0; i < this.playersArr.length; i++) {
      this.playersArr[i].score = 0;
      this.playersArr[i].rank = 0;
      this.playersArr[i].isEligibleNextRound = true;
    }
    this.gameOver = false;
    this.startGame = false;
    this.currentRank=0;
    this.sussMsg='';
  }

  onClickStartGame() {
    if (this.noOfPlayers <= 0) {
      this.errorMesg = 'Number Of Players is Invalid';
      return;
    }
    if (this.noOfPlayers <= 0) {
      this.errorMesg = 'Target Score is Invalid';
      return;
    }
    this.startGame = true;
    this.currentPlayer = Math.floor(Math.random() * this.noOfPlayers);
  }

  onBlurNumPlayers() {
    if (this.noOfPlayers <= 0) {
      this.errorMesg = 'Number Of Players is Invalid';
      return;
    }
    this.playersArr = [];
    for (let i = 0; i < this.noOfPlayers; i++) {
      this.playersArr.push({
        name: 'player ' + (i + 1),
        score: 0,
        rank: 0,
        isEligibleNextRound: true,
        listDice: 0
      });
    }
  }
}
