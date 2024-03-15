import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[tooltip]'
})

export class TooltipDirective{
    @Input() label: string;
    constructor(private elementRef: ElementRef){

        
    }
}