import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { AutoFocusModule } from 'primeng/autofocus';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { TimeLineComponent } from './time-line/time-line.component';
import { SliderModule } from 'primeng/slider';
@NgModule({
  declarations: [
    AppComponent,
    TimeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimelineModule,
    TooltipModule,
    AutoFocusModule,
    SelectButtonModule ,
    FormsModule,
    SliderModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
