import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  minDate:Date = new Date(2021, 10);
  maxDate:Date = new Date(2023, 1);

  startDate:Date = new Date(2022, 5);
  finishDate:Date = new Date(2022, 11);

}
