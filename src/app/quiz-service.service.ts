
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

  getQuiz() {
    return axios.get<Quiz>(environment.QUIZ_API_URL).then(
      (response) => {
        return response.data;
      }
    );


  }


}
