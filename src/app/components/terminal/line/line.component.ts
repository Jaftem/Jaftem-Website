import {Component, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { LineService } from "../../../services/line.service";

@Component({
    selector: 'line',
    inputs: ['str', 'ln'],
    templateUrl: '../../../components/terminal/line/line.component.html',
    styleUrls: ['../../../components/terminal/line/line.component.css']
})

export class LineComponent implements OnInit {
    ln: number;
    str: string;
    user: string = "user@jaftem.com:~$";
    // Need user credentials in future
    constructor(public lineService: LineService,
                public el:ElementRef) {
    }
    ngOnInit() {
    }

    // Mouse Events (message container)
    onMouseEnter() {
        let container: any = this.el
        .nativeElement.querySelector('.message-container');
        container.style.backgroundColor = "#FAFAFA";
    }
    onMouseLeave() {
        let container: any = this.el
        .nativeElement.querySelector('.message-container');
        container.style.backgroundColor = "#FFFFFF";
    }
}