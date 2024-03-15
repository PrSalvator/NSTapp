import { Component} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  minDate = new Date(2016, 4, 1);
  maxDate = new Date(2020, 1, 4);
  startDate = new Date(2017, 4, 1);
  finishDate = new Date(2019, 10, 4);
}
