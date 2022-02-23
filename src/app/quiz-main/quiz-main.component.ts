import { Quiz } from './../interfaces/quiz';

import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';

import { never } from 'rxjs';


@Component({
  selector: 'app-quiz-main',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.css']
})
export class QuizMainComponent implements OnInit {


  questions: any;
  started: boolean = false;
  questionNumber: number = 0;
  answers: string[] = [""];
  givenAnswers: string[] = [];
  ended: boolean = false;
  score: number = 0;




  constructor(private service: QuizServiceService) {

  }

  ngOnInit(): void {

  }
  startQuiz() {


    this.resetQuiz();
    this.getQuiz();


  }
  resetQuiz() {
    this.questionNumber = 0;
    this.answers = [""];
    this.givenAnswers = [];
    this.ended = false;
    this.score = 0;
    this.started = false;
    this.questions = [];


  }

  selectAnswer(answer: string) {
    if (this.questions[this.questionNumber].correct_answer == answer) {
      this.givenAnswers[this.questionNumber] = "correct";
      this.score++;
    }
    else {
      this.givenAnswers[this.questionNumber] = "incorrect";
    }
    if (this.questionNumber < this.questions.length - 1) { //quiz is going on

      this.questionNumber++;
      this.answers = [];
      var tempAnswers = this.questions[this.questionNumber].incorrect_answers;
      tempAnswers.push(this.questions[this.questionNumber].correct_answer);
      this.answers = this.randomArrayShuffle(tempAnswers);
    }
    else { //quiz is ended
      this.ended = true;
      this.started = false;
    }
    //end quiz



  }
  getQuiz() {

    this.service.getQuiz().then(
      (data: Quiz) => {
        this.questions = data.results;
        this.started = true;


        this.answers = [];
        var tempAnswers = this.questions[this.questionNumber].incorrect_answers;
        tempAnswers.push(this.questions[this.questionNumber].correct_answer);
        this.answers = this.randomArrayShuffle(tempAnswers);
        this.started = true;
        this.ended = false;

        console.log(this.questions);
        console.log(this.answers);
      }

    )
  }

  randomArrayShuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



}
