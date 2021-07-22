import { Component } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText = loremIpsum({ sentenceLowerBound: 5, sentenceUpperBound: 9 });
  enteredText = '';
  userTime = '';
  displayTime = '';
  displayWord = '';
  isSuccess = false;

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // console.log(this.randomText);

    if (this.enteredText === '' && this.displayWord !== 'You are a Cheater!') {
      this.userTime = Date.now().toString();
    }

    if (value === this.randomText) {
      this.isSuccess = true;
      if (this.displayWord === 'You are a Cheater!' || this.displayWord === 'Once a Cheater, Always a cheater!') {
        this.displayWord = 'Once a Cheater, Always a cheater!';
      }
      else {
        this.displayTime = this.convertMillisToMinutesAndSeconds(Date.now() - parseInt(this.userTime));
        this.displayWord = (this.displayTime === '0:00')? 'You are a Cheater!' : 'Well Done!';
      }
    }
    else {
      this.isSuccess = false;
    }
    
    this.enteredText = value;    
  }

  compareLetters(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) return 'pending';
    return (randomLetter === enteredLetter)? 'correct': 'incorrect';
  }

  convertMillisToMinutesAndSeconds(millis: number) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }
}
