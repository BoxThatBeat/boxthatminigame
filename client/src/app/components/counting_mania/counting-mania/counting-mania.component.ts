import { Component, OnInit } from '@angular/core';
import { CountingManiaNum } from 'src/app/models/counting-mania-num';
import { CountingManiaState } from 'src/app/models/couting-mania-state';
import { GameCountingManiaService } from 'src/app/services/game-counting-mania.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'counting-mania',
  templateUrl: './counting-mania.component.html',
  styleUrls: ['./counting-mania.component.css']
})
export class CountingManiaComponent implements OnInit {

  private gameState: CountingManiaState = CountingManiaState.PreGame;

  public changeGameState(newGameState: CountingManiaState) {
    this.gameState = newGameState;

    if (newGameState == CountingManiaState.GameLost) {

    }
  }

  public getGameState() {
    return this.gameState;
  }

  gameInput: string = '';

  instructions: string = "";
  currentCount: CountingManiaNum[] = [];
  myTurnToInput: boolean = true;

  constructor(
    private countingManiaService: GameCountingManiaService,
    private timerService: TimerService) { 
  }


  ngOnInit(): void {
    this.instructions = "Game starts when either player enters a 0:";

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

  private handleNewInput(numInput: number, isOtherUserInput: boolean): void {
    
    switch(this.getGameState()) {
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
        if ((isOtherUserInput && this.myTurnToInput) 
            || (!isOtherUserInput && !this.myTurnToInput)
            || (numInput - this.currentCount[this.currentCount.length - 1].num != 1)) {

          this.gameState = CountingManiaState.GameLost;
  
        } else {
          this.currentCount.push(new CountingManiaNum(numInput, !isOtherUserInput)); // Correct number inputted
          this.myTurnToInput = isOtherUserInput;

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
}
