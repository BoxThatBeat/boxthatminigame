import { Component, Input, OnInit } from '@angular/core';
import { CountingManiaNum } from 'src/app/models/counting-mania-num';
import { CountingManiaState } from 'src/app/models/couting-mania-state';
import { AccountService } from 'src/app/services/account.service';
import { GameCountingManiaService } from 'src/app/services/game-counting-mania.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'counting-mania',
  templateUrl: './counting-mania.component.html',
  styleUrls: ['./counting-mania.component.css']
})
export class CountingManiaComponent implements OnInit {

  gameState: CountingManiaState = CountingManiaState.PreGame;

  states = CountingManiaState;
  gameInput: string = '';
  currentCount: CountingManiaNum[] = [];
  myTurnToInput: boolean = true;
  targetWinNumber: number = 10;

  lossMessage: string = '';
  winMessage: string = '';
  instructions: string = '';
  
  @Input() otherUsername: string = '';

  constructor(
    private countingManiaService: GameCountingManiaService,
    private timerService: TimerService,
    private accountService: AccountService) { 
  }


  ngOnInit(): void {
    this.setupGame();

    this.countingManiaService.recievedInputEvent.subscribe( (inputNum: number) => {
      this.handleNewInput(inputNum, true);
    });
  }

  onSubmit() {

    //ensure input is a number
    var numInput: number = Number(this.gameInput)

    if (numInput != NaN) {
      this.handleNewInput(numInput, false);
      this.countingManiaService.sendInput(numInput); // Update other user
    }

    this.gameInput = ''; // Clear input
  }

  onReplayButtonPress() {
    this.setupGame();
  }

  private setupGame() {
    this.instructions = "Game starts when either player enters a 0:";
    this.timerService.resetAll();
    this.currentCount = [];
    this.gameState = CountingManiaState.PreGame;
  }

  private handleNewInput(numInput: number, isOtherUserInput: boolean): void {
    
    switch(this.gameState) {
      case (CountingManiaState.PreGame):

        if (numInput === 0) {
          this.currentCount.push(new CountingManiaNum(numInput, !isOtherUserInput)); 
          this.gameState = CountingManiaState.InGame;
          this.myTurnToInput = isOtherUserInput; // it is my turn if this move was made by other player
          this.instructions = "Input Next Red Number:";

          if (isOtherUserInput) {
            this.timerService.startTimer();
          }
        }
        break;
      
      case (CountingManiaState.InGame):

        // Lose condition
        if ((isOtherUserInput && this.myTurnToInput) || (!isOtherUserInput && !this.myTurnToInput)) {

          this.currentCount.push(new CountingManiaNum(numInput, !isOtherUserInput)); // Played out of turn
          this.onLoss(isOtherUserInput, true);
              
        } else if (numInput - this.currentCount[this.currentCount.length - 1].num != 1) { 
          
          this.currentCount.push(new CountingManiaNum(numInput, !isOtherUserInput)); // Incorrect number inputted
          this.onLoss(isOtherUserInput, false);

        } else {
          this.currentCount.push(new CountingManiaNum(numInput, !isOtherUserInput)); // Correct number inputted
          this.myTurnToInput = isOtherUserInput;

          if (numInput === this.targetWinNumber) {
            this.onWin();
          }

          if (isOtherUserInput) {
            this.timerService.startTimer();
          } else {
            this.timerService.pauseTimer();
            this.timerService.addElapsedToTotal();
          }
        }
        break;
    }
  }

  private onLoss(isOtherUserInput: boolean, outofTurnLoss: boolean) {
    var culpritUsername = isOtherUserInput? this.otherUsername : this.accountService.userValue.username; 

    if (outofTurnLoss) {
      this.lossMessage = `${culpritUsername} played out of turn. Must input number after other user has input theirs.`
    
    } else {
      var requiredValue = this.currentCount[this.currentCount.length - 2].num + 1;
      var actualValue = this.currentCount[this.currentCount.length - 1].num;

      this.lossMessage = `${culpritUsername} input ${actualValue} when the required value was ${requiredValue}`;
    }
    
    this.timerService.pauseTimer();
    this.gameState = CountingManiaState.GameLost;
  }

  private onWin() {
    this.winMessage = `Made it to ${this.targetWinNumber} without mistake!`;
    
    this.timerService.pauseTimer();
    this.gameState = CountingManiaState.GameWon;

    //get the combined score from server
    //save score to server maybe make these steps combined on the server
    //this.gameservice.savescore(roomId) -> server asks for both users scores -> saves them and then returns to both the total score and individual scores
  }
}
