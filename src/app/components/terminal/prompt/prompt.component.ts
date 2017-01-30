import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LineService } from "../../../services/line.service";


@Component({
    selector: 'prompt',
    inputs: [], // None yet
    templateUrl: '../../../components/terminal/prompt/prompt.component.html',
    styleUrls: ['../../../components/terminal/prompt/prompt.component.css']
})

export class PromptComponent implements OnInit {
    ln: number;
    cmd: string;
    user: string = "user@jaftem.com:~$";

    placeholder: string = "";
    constructor(public lineService: LineService,
                public el:ElementRef) {
    }
    ngOnInit() {
        this.ln = 1;
        this.cmd = "";
        this.type("hello", 0);
    }

    onEnter(event: any): void {
        this.sendCmd();
        event.preventDefault();
    }
    sendCmd() {
        if (this.cmd == 'clear') {
            this.ln = 1;
        } else {
            this.ln += 1;
        }
        this.lineService.addCmd(this.cmd);
        this.cmd = "";
    }


    type(string, i) {
        var scope = this;
        if (i == string.length) {
            setTimeout(function() {
                scope.sendCmd();
            }, 2000);
            return;
        }
        i++;
        setTimeout(function() {
            scope.cmd = string.substring(0,i);
            scope.type(string, i);
        }, 600);
    }
}