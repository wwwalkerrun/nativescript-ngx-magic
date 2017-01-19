[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

![nativescript-ngx-magic](https://cdn.filestackcontent.com/XXMT4f8S8OGngNsJj0pr?v=0)

Magically drop a [NativeScript](https://www.nativescript.org/) app into your existing [Angular](https://angular.io/) web application and reuse all your code.*

*You will be adding NativeScript views, but you already knew that.*

* [Supported projects that can use magic](#supported-projects)
* [Watch video on how to integrate with Angular CLI](http://www.nativescriptsnacks.com/videos/2016/05/12/magic-scaffolding.html)
  * The video is slightly outdated with latest published version but still very applicable.

## Install

```
npm i @wwwalkerrun/nativescript-ngx-magic --save
```

## Usage

1. Use `Component` from `@wwwalkerrun/nativescript-ngx-magic` instead of `@angular/core`. [Why?](#why-different-component)
2. Create NativeScript views ending with `.tns.html` (and/or styles ending with `.tns.css`) for each of your component's. [How?](#how-to-create-nativescript-views)
3. Ensure your components are declared and routes (if any) are defined in `nativescript/app/app.module.ts`. NativeScript's root `AppModule` is defined seperately to allow you to hook into and/or load distinct native modules if needed.
4. [Run your truly *native* mobile app with NativeScript!](#run-for-first-time)

## Example

A sample root component, **app.component.ts**:

**BEFORE**:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

**AFTER**:
```
import { Component } from '@wwwalkerrun/nativescript-ngx-magic'; // notice!

@Component({
  // notice! - Important to resolve path to templateUrl and/or styleUrls correctly
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html', // notice! - removed leading './'
  styleUrls: ['app.component.css'] // notice! - removed leading './'
})
export class AppComponent {}
```

Then create a `.tns.html` NativeScript view template for this component, for example:

* `app.component.tns.html`:

```
<ActionBar title="Magic!" icon="" class="action-bar">
</ActionBar>
<StackLayout class="p-20">
    <Label text="NativeScript is Neat." class="h1 text-center"></Label>
</StackLayout>
```

Then if your component has `styleUrls` defined, create a `.tns.css` file, for example:

* `app.component.tns.css`:

```
// any custom css you want to use with your {N} view
```

### Run for first time!

You will need to have fully completed steps 1 and 2 above.

Run your app in the iOS Simulator with:

```
npm run start.ios
```

Run your app in an Android emulator with:

```
npm run start.android
```

Welcome to the wonderfully magical world of NativeScript!

## How to create NativeScript views

Based on our example above, assume `app.component.html` looks like this:

```
<main>
  <div>This is my root component</div>
</main>
```

You would then create a new file in `app.component.tns.html` like this:

```
<StackLayout>
  <Label text="This is my root component"></Label>
</StackLayout>
```

You can **also** use platform specific views if desired with the `platformSpecific` Component metadata:

```
import { Component } from '@wwwalkerrun/nativescript-ngx-magic';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  platformSpecific: true
})
export class AppComponent {}
```

Then you could create separate views for iOS and Android:

* `app.component.ios.html`
* `app.component.android.html`

You can [learn more about NativeScript view options here](https://docs.nativescript.org/ui/ui-views).

You can also install helpful view snippets for [VS Code here](https://marketplace.visualstudio.com/items?itemName=wwwalkerrun.nativescript-ngx-snippets) or [Atom Editor here](https://atom.io/packages/nativescript-ngx-atom-snippets).

You can [learn more here](http://angularjs.blogspot.com/2016/03/code-reuse-in-angular-2-native-mobile.html?m=1) about how this setup works and why.

## Supported Projects

* [angular-cli](https://cli.angular.io/)
* [angular-seed](https://github.com/angular/angular-seed)
* [angular2-webpack-seed](https://github.com/NathanWalker/angular2-webpack-seed)

### Why different Component?

`Component` from `nativescript-ngx-magic` is identical to `Component` from `@angular/core`, except it automatically uses NativeScript views when your app runs in a NativeScript mobile app.

The library provides a custom `Decorator` under the hood.
Feel free to [check it out here](https://github.com/wwwalkerrun/nativescript-ngx-magic/blob/master/src/app/plugin/decorators/magic.component.ts) and it uses a [utility here](https://github.com/wwwalkerrun/nativescript-ngx-magic/blob/master/src/app/plugin/decorators/utils.ts).

You can see more elaborate use cases of this magic with [angular-seed-advanced](https://github.com/NathanWalker/angular-seed-advanced).

### Special Note About AoT

Currently you cannot use custom component decorators with AoT compilation. This may change in the future but for now you can use this pattern for when you need to create AoT builds for the web:

```
import { Component } from '@angular/core';

// just comment this out and use Component from '@angular/core'
// import { Component } from '@wwwalkerrun/nativescript-ngx-magic';

@Component({
  // etc.
```

After doing the above, running AoT build will succeed. :)

The Component from `nativescript-ngx-magic` does the auto `templateUrl` switching to use {N} views when running in the {N} app therefore you don't need it when creating AoT builds for the web. However just note that when going back to run your {N} app, you should comment back in the `Component` from `nativescript-ngx-magic`. Again this temporary inconvenience may be unnecessary in the future.

## Requirements

* [Install NativeScript](http://docs.nativescript.org/start/getting-started#install-nativescript-and-configure-your-environment)

# License

[MIT](/LICENSE)
