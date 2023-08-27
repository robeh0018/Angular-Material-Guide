import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {Lesson} from "../model/lesson";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];
  isLoading: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<Lesson>(
    true,
    []
  );

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {
  }

  displayedColumn = ['select', 'seqNo', 'description', 'duration'];

  expandedLesson: Lesson = null;

  ngOnInit() {

    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }

  // select column ****
  onLessonToggled(lesson: Lesson) {
    this.selection.toggle(lesson);
    console.log(this.selection.selected);
  }

  toggleAll() {
    if ( this.isAllSelected() ) {
      this.selection.clear();
    } else {
      this.selection.select(...this.lessons);
    }
  }

  isAllSelected() {
    return this.selection.selected?.length === this.lessons?.length
  }

  // The Mat sort is not working nice because the backend
  // doesn't work correctly but its syntax is correct.

  private loadLessonsPage() {
    setTimeout(() => {
      this.isLoading = false;

      this.lessons =
        this.coursesService.loadMyLessons(
          this.paginator?.pageIndex ?? 0,
          this.paginator?.pageSize ?? 3,
          this.sort?.direction ?? 'asc');

    }, 1000);
  };

  onToggleLesson(lesson: Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson = null;
    } else {
      this.expandedLesson = lesson;
    }
  }

  // private loadLessonsPage() {
  //   this.coursesService.findLessons(this.course.id, 'asc', 0, 3)
  //     .pipe(
  //       tap(lessons => this.lessons = lessons),
  //       catchError(err => {
  //
  //         console.log('Error loading lessons', err);
  //         alert('Error loading lessons.')
  //
  //         return throwError(err);
  //       })
  //     )
  //     .subscribe();
  //
  // };

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    })

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => {
        this.isLoading = true;
        this.loadLessonsPage()
      })
    )
      .subscribe();

  }

}
