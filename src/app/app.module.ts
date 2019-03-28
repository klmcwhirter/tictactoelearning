import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameResultPipe } from './game-result.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameResultPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
