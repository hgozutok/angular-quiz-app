
import { Quiz } from './interfaces/quiz';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { map, Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {


  constructor() { }

  getQuiz(difficulty: string) {
    // console.log(difficulty);
    let url = environment.QUIZ_API_URL;
    if (difficulty != null || difficulty != "") {
      url = url + "&difficulty=" + difficulty;
    } else {
      url = environment.QUIZ_API_URL;
    }
    // console.log(url);
    return axios.get<Quiz>(url).then(
      (response) => {
        return response.data;
      }
    );


  }


}
