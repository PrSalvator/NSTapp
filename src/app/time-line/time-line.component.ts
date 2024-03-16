import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input} from '@angular/core';
import { abs} from 'mathjs'

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})

export class TimeLineComponent implements OnInit, AfterViewInit{
    @Input() minDate: Date; //Дата начала слайдера
    @Input() maxDate: Date; // Дата конца слайдера
    @Input() startDate: Date; // Дата регулятора начала интервала
    @Input() finishDate: Date; // Дата регулятора конца интервала

    values: Date[] = [];
    rangeValues: number[] = [4, 22];
    minValue: number = 0;
    maxValue: number; // Переименовать на maxValue
    toggle:boolean = true;
    @ViewChild("slider", {static:false}) slider: ElementRef|undefined;

    months = {
        0 : "Январь",
        1 : "Февраль",
        2 : "Март",
        3 : "Апрель",
        4 : "Май",
        5 : "Июнь",
        6 : "Июль",
        7 : "Август",
        8 : "Сентябрь",
        9 : "Октябрь",
        10 : "Ноябрь",
        11 : "Декабрь"
    }

    ngOnInit(): void {
        this.values = this.getYearsValues(this.minDate, this.maxDate);
        this.rangeValues = this.getRangeValues(this.values[0], this.values[this.values.length - 1], this.startDate, this.finishDate);
        this.maxValue = this.values.length-1;
    }

    ngAfterViewInit(): void {
        this.drawToolTips();
    }

    toggleYears(){
        let startDate = new Date(this.values[this.rangeValues[0]].getFullYear(), this.values[this.rangeValues[0]].getMonth());
        let finishDate = new Date(this.values[this.rangeValues[1]].getFullYear(), this.values[this.rangeValues[1]].getMonth());
        this.toggle = true;
        this.values = this.getYearsValues(this.minDate, this.maxDate);
        this.rangeValues = this.getRangeValues(this.values[0], this.values[this.values.length - 1], startDate, finishDate)
        this.maxValue = this.values.length-1;   
        this.drawToolTips();
    }

    toggleMonths(){
        let startDate = new Date(this.values[this.rangeValues[0]].getFullYear(), this.values[this.rangeValues[0]].getMonth());
        let finishDate = new Date(this.values[this.rangeValues[1]].getFullYear(), this.values[this.rangeValues[1]].getMonth());
        console.log(`даты до перезаписи значений ${startDate} - ${finishDate}`)
        this.toggle = false;
        this.values = this.getMonthValues(startDate);  
        console.log(`даты после перезаписи значений ${startDate} - ${finishDate}`)
        this.maxValue = this.values.length-1;   
        this.rangeValues = this.getRangeValues(this.values[0], this.values[this.values.length - 1], startDate, finishDate);
        this.drawToolTips();
    }

    getYearsValues(minDate: Date, maxDate: Date): Date[]{
        let dif = abs(maxDate.getFullYear() - minDate.getFullYear());
        if (dif > 10) {
            maxDate.setFullYear(minDate.getFullYear() + 10);
            dif = 10;
        }
        console.log(`Получение значений по годам ${minDate} - ${maxDate} `);
        return this.getValues(minDate, dif*12 + 12);
    }

    getRangeValues(minDate: Date, maxDate: Date, startDate: Date, finishDate: Date): number[]{
        if(this.getMonthDifference(minDate, startDate) < 0) startDate = minDate;
        if(this.getMonthDifference(finishDate, maxDate) < 0) finishDate = maxDate;
        let start = this.getMonthDifference(minDate, startDate);
        let finish = this.getMonthDifference(minDate, finishDate);
        console.log(`Получение новых значений интервала ${start} (${startDate}) - ${finish} (${finishDate})`);
        return [start, finish];
    }

    getMonthDifference(minDate: Date, maxDate: Date):number {
        let yearDif = maxDate.getFullYear() - minDate.getFullYear();
        if(yearDif === 0) return maxDate.getMonth() - minDate.getMonth();
        if(yearDif < 0) return yearDif*12 - minDate.getMonth();
        return yearDif*12 + maxDate.getMonth();
    }

    getMonthValues(minDate: Date){
        console.log(`Получение значений по месяцам ${minDate}`);
        return this.getValues(minDate, 24);
    }
    drawToolTips(){
        let handle = this.slider.nativeElement.querySelector("span[data-pc-section='startHandler']");
        handle.innerHTML = `<span class="startHandle">
            <h5 class="mb-1 text-primary font-weight-normal">${this.months[this.values[this.rangeValues[0]].getMonth()]}</h5>
            <h5 class="mb-0 text-primary font-weight-normal">${this.values[this.rangeValues[0]].getFullYear()}<h5>
        </span>`;
        handle = this.slider.nativeElement.querySelector("span[data-pc-section='endHandler']");
        handle.innerHTML = `<span class="endHandle">
            <h5 class="mb-1 text-primary font-weight-normal">${this.months[this.values[this.rangeValues[1]].getMonth()]}</h5>
            <h5 class="mb-0 text-primary font-weight-normal">${this.values[this.rangeValues[1]].getFullYear()}<h5>
        </span>`;
    }
    getValues(minDate: Date, numberOfMonths: number): Date[]{
        let count = 0;
        let date: Date;
        let values = [];
        while(numberOfMonths >= count){
            date = new Date(minDate.getFullYear(), count, 1);
            values.push(date)
            count += 1;
        }
        console.log(`Получение значений ${values} количество элементов ${values.length}`)
        return values;
    }

}