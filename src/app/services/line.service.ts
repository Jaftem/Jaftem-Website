// Line service for terminal
// Each line in the terminal comes through here!

import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

let initialLines: string[] = [];

interface LineOperation extends Function {
    (lines: string[]): string[];
}
@Injectable()
export class LineService  {
  // a stream that publishes new messages only once
  newLines: Subject<string> = new Subject<string>();
  clearLines: Subject<string> = new Subject<string>();

  // `lines` is a stream that emits an array of the most up to date messages
  lines: Observable<string[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently 
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  // "action"" streams
  create: Subject<string> = new Subject<string>();
  clear: Subject<string> = new Subject<string>();

  // For cmds
  spc:string = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; ";

  constructor(private http: Http) {
    this.lines = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((lines: string[],
             operation: LineOperation) => {
               return operation(lines);
             },
            initialLines)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .publishReplay(1)
      .refCount();

      this.create
        .map( function(line: string): LineOperation {
        return (lines: string[]) => {
          return lines.concat(line);
        };
      })
      .subscribe(this.updates);

      this.newLines
        .subscribe(this.create);

      // =================================================================

      // Clear action stream. Whenever a message is added to clearMessages,
      // the clear stream will emit an operation for the updates stream.
      // The operation is to create a new and empty array of messages.
      // This operation is then executed by the messages observable.
      this.clear
        .map(function(line:string): LineOperation {
          return (strings: string[]) => {
            return new Array<string>();
          };
        })
        .subscribe(this.updates);

        this.clearLines
          .subscribe(this.clear);
  }

  // Add Command
  addCmd(line: string) {
      switch (line) {
          case 'clear':
            this.destroy();
            break;
          case 'resume':
            this.resume();
            break;
          case 'help':
            this.help();
            break;
          case 'hello':
            this.hello();
            break;
          case 'contact':
            this.contact();
            break;
          case 'ls':
            this.ls();
            break;
          default:
            this.cmdNotFound(line);
            break;
      }
  }

  cmdNotFound(line:string) {
      var nf:string = `-- Command not found. For a list of commands, type \`help\`.`;
      line = line + `<br />` + nf;
      this.newLines.next(line);
  }
  // Commands
  destroy() {
    var destroyStr: string = "";
    this.clearLines.next(destroyStr);
  }

  resume() {
      var url:string =`resume<br />` +
      this.spc + `Click here =======> [ <a href="https://drive.google.com/file/d/0BywUZPjWJGBbaEhEYl84T2ttaE0/view?usp=sharing">RESUME</a> ]` +
      `<br />`;
      this.newLines.next(url);
  }

  about() {
      var abt: string = "";
  }

  hello() {
      var wlc: string = "hello<br />" +
      `Hi, my name is <span class="highlight">Jeremy Aftem</span>` +
      ` and I am a CS student living in sunny Los Angeles, California.<br/>` +
      `I love to build things that people will use and video/photograph my life.<br />` + ` <br />` +
      `Type \`help\` for a list of available commands.<br />`;
      this.newLines.next(wlc);
  }
  
  contact() {
      let spc:string = this.spc;
      var c:string = "contact<br />" +
               spc + "=============================<br />" +
               spc + "     CONTACT INFORMATION<br />" +
               spc + "=============================<br />" +
               spc + "[EMAIL :      aftem@usc.edu ]<br/>" +
               spc + "[PHONE :     (323) 765-5422 ]";
      this.newLines.next(c);
  }

  help() {
      var spc:string = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ";
      var hlp: string = "help<br />" + spc + "AVAILABLE COMMANDS: <br />";
      var w:string    = spc + "$hello   - welcome message<br />";
      var r:string    = spc + "$resume  - link to resume<br />";
      var ct:string   = spc + "$contact - contact information<br />";
      var c:string    = spc + "$clear   - clear terminal<br />";
      hlp = hlp + w + r + ct + c;
      this.newLines.next(hlp);
  }

  ls() {
    var ls:string = "ls" +
    `<br/>Watareudoing.jar                         thisIsntAnActualCmdline/<br/>` +
    `README.md                                badCode.js<br />` +
    `TODO-ImplementFolders/<br /> <br/>`;
    this.newLines.next(ls);
  }

}