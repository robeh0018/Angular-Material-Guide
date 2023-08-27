

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";

const lessons = [
  {
    id: 1,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 1,
    courseId: 5,
  },
  {
    id: 2,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 2,
    courseId: 5,
  },
  {
    id: 3,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 3,
    courseId: 5,
  },
  {
    id: 4,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 4,
    courseId: 5,
  },
  {
    id: 5,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 5,
    courseId: 5,
  }, {
    id: 6,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 6,
    courseId: 5,
  }, {
    id: 7,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 7,
    courseId: 5,
  }, {
    id: 8,
    longDescription: 'Building Your First  Component - Component Composition',
    description: 'Building Your First  Component - Component Composition',
    duration: '2:07',
    seqNo: 8,
    courseId: 5,
  }
]

@Injectable()
export class CoursesService {

    constructor(private http:HttpClient) {

    }

    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findLessons(
        courseId:number, sortOrder = 'asc',
        pageNumber =0 , pageSize = 3, sortColumn = 'seqNo'):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('sortColumn', sortColumn)
        }).pipe(
            map(res =>  res["payload"])
        );
    }


    loadMyLessons( pageNumber: number, pageSize: number, sortOrder: string ) {
      let lessonsRes = lessons;

      const initialPos = pageNumber * pageSize;

      if ( sortOrder === 'desc' ) {
        lessonsRes = lessonsRes.reverse();
      }

      return  lessonsRes.slice(initialPos, initialPos + pageSize);
    };


}
