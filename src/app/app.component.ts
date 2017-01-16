// import { Component } from '@angular/core';
import { Component } from './plugin/decorators/magic.component';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  statement: string = 'Creating magic with NativeScript + Angular';
  url: string = 'https://github.com/NathanWalker/nativescript-ngx-magic';
}
