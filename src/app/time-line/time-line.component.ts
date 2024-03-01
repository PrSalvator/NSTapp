import { Component, Input, OnInit } from '@angular/core';

class Item{
  date: Date;
  isInInterval: boolean;
  isStart: boolean;
  isFinish: boolean;
  constructor(date:Date, isInInterval:boolean, isStart:boolean, isFinish:boolean){
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.isStart = isStart;
    this.isFinish = isFinish;
    this.isInInterval = isInInterval;
  }
}

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})

export class TimeLineComponent implements OnInit{
  @Input() StartDate:Date;
  @Input() FinishDate:Date;

  @Input() MinDate:Date;
  @Input() MaxDate:Date;

  mode:boolean = false;

  collection:Item[] = [];

  stateOptions: any[] = [{label: 'Все года', mode: false}, {label: 'Месяца', mode: true}];
  value: string = 'off';

  constructor() {
    this.StartDate = new Date();
    this.FinishDate = new Date();
    this.MinDate = new Date();
    this.MaxDate = new Date();
  }

  changeMode(){
    this.mode = !this.mode;
  }

  getCollection(startDate: Date, finishDate: Date, minDate:Date, maxDate:Date): Item[]{
    const collection:Item[] = [];
    let flag: boolean = true;
    while(this.compareDates(minDate, maxDate) || ((minDate.getFullYear() === maxDate.getFullYear()) && (minDate.getMonth() === maxDate.getMonth()))){
      if(!this.compareDates(minDate, startDate) && this.compareDates(minDate, finishDate)){
        collection.push( flag ? new Item(minDate, true, true, false) : new Item(minDate, true, false, false));
        flag = false;
      }
      else if(!flag){
        flag = true;
        collection.push( new Item(minDate, false, false, true));
      }
      else{
        collection.push(new Item(minDate, false, false, false));
      }
      minDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 10)
    };
    return collection;
  }


  compareDates(minDate:Date, maxDate:Date): boolean{
    const subMonths = maxDate.getMonth() - minDate.getMonth();
    const subYears = maxDate.getFullYear() - minDate.getFullYear();
    
    if(subYears < 0) return false;
    if(( subMonths <= 0) && ( subYears === 0)) return false;
    return true;
  }

  ngOnInit(): void {
    this.collection = this.getCollection(this.StartDate, this.FinishDate, this.MinDate, this.MaxDate);
  }
}
