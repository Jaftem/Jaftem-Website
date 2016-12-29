import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent }        from './app.component';
import { TerminalComponent }   from './components/terminal/terminal.component';
import { PromptComponent }     from './components/terminal/prompt/prompt.component';
import { LineComponent }       from './components/terminal/line/line.component';

// Services
import { LineService }         from './services/line.service';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    LineComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
