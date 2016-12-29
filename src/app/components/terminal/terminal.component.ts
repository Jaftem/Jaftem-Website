import { Component,
         OnInit,
         ElementRef }       from '@angular/core';
import { LineService }      from "../../services/line.service";
import { Observable }       from 'rxjs/Observable';
import { PromptComponent }  from "../../components/terminal/prompt/prompt.component";
import { LineComponent }    from "../../components/terminal/line/line.component";


@Component({
  selector: 'terminal',
  templateUrl: '../../components/terminal/terminal.component.html',
  styleUrls: ['../../components/terminal/terminal.component.css']
})
export class TerminalComponent implements OnInit {
    lines:Observable<any>;

    constructor(public lineService:LineService,
                public el:ElementRef) {    }

    ngOnInit() {
        this.lines = this.lineService.lines;
        this.lines.subscribe((messages: Array<string>) => {
            setTimeout(() => {
                this.scrollToBottom();
            });
        });
    }

    scrollToBottom() {
        let scrollPane: any = this.el
        .nativeElement.querySelector('.content');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}
