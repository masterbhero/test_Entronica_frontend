import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test_frontend';
  constructor(public router: Router, public route: ActivatedRoute, private http: HttpClient, private location: Location) { }
  nameList: string[] = []

  isRootPath() {
    return this.router.url === '/';
  }

  ngOnInit() {
    if (this.location.path() === '') {
      this.http.get('http://localhost:3000/view-all').subscribe(
        (res) => {
          if (!isViewAllType(res)) {
            alert("response not correct type")
            return
          }
          this.nameList = res.data
        },
        (err) => {
          console.log(err)
          alert("something went wrong at view-all data")
        }
      )
    }
  }
}

interface viewAllType {
  "data": string[],
  "message": string
}

function isViewAllType(obj: unknown): obj is viewAllType {

  if (typeof obj === 'object' && obj !== null && 'data' in obj && 'message' in obj) {

    if (Array.isArray((obj as viewAllType).data) && (obj as viewAllType).data.every(item => typeof item === 'string')) {

      if (typeof (obj as viewAllType).message === 'string') {
        return true;
      }

    }

  }
  
  return false;
}