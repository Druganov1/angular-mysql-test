import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiTestService } from './api-test.service';
import { get } from 'http';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'db_test';


  constructor(private apiTestService: ApiTestService) {}

  // docs : https://rxjs.dev/guide/observable   https://angular.dev/guide/http/making-requests#
  helbme() {
    this.apiTestService.getAllUsers().subscribe({
      next: (response) => {
        console.log('All Users:', response);
      },
    });
  }

}


