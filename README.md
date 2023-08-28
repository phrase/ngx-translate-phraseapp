# ngx-translate-phraseapp

**ngx-translate-phraseapp** is the official library for integrating [Phrase Strings In-Context Editor](https://support.phrase.com/hc/en-us/articles/5784095916188-In-Context-Editor-Strings) with [ngx-translate](https://github.com/ngx-translate/core) in your Angular application.


## Ivy
Since Angular 13 the View Engine has been removed, and since 1.0.0 the `ngx-translate-phraseapp` package uses new version of Angular which might cause old projects to break. In this case try major version 0 package of this repository.

## :scroll: Documentation

### Prerequisites

To use ngx-translate-phraseapp with your application you have to:

* Sign up for a Phrase Strings account: [https://phrase.com/signup](https://phrase.com/signup)
* Use [ngx-translate](https://github.com/ngx-translate/core) module for localization in your Angular 2+ app

### Demo

You can find a demo project on [GitHub](https://github.com/phrase/ngx-translate-phraseapp-demo).

### Installation

#### NPM

```bash
npm install ngx-translate-phraseapp
```

#### Build from source

You can also build it directly from source to get the latest and greatest:

```bash
npm run dist
```

### Usage

#### Configure

```ts
import { initializePhraseAppEditor, PhraseConfig } from 'ngx-translate-phraseapp';

let config: PhraseConfig = {
  projectId: '<YOUR_PROJECT_ID>',
  accountID: '<YOUR_ACCOUNT_ID>'
  phraseEnabled: true,
};
```

You can find the Project-ID in the Project overview in the Phrase Strings Translation Center. The Account-ID can be found in the Organization settings.

By default, the In-Context Editor’s document parser converts all keys to lowercase. If you’re experiencing issues with this behavior and want to use case-sensitive keys within the In-Context Editor, consider disabling the automatic lowercase feature:

```ts
let config: PhraseConfig = {
  // ...
  autoLowercase: false
}
```

#### Using the old version of the ICE
To use the old version of ICE, use option `useOldICE: true` in your PHRASEAPP_CONFIG or integration options
```js
let config = {
  projectId: '<YOUR_PROJECT_ID>',
  accountID: '<YOUR_ACCOUNT_ID>',
  phraseEnabled: true,
  useOldICE: true,
};

initializePhraseAppEditor(config);
```


#### Using the US Datacenter with ICE

In addition to the settings in your config, set the US datacenter to enable it working with the US endpoints.
```js
  datacenter: 'us'
```

### Code examples

Add the following snippets to your Angular app:

<br>

`app.component.ts`

```ts
import { initializePhraseAppEditor, PhraseAppCompiler, PhraseConfig} from 'ngx-translate-phraseapp'

let config: PhraseConfig = {
  projectId: '<YOUR_PROJECT_ID>',
  accountID: '<YOUR_ACCOUNT_ID>'
  phraseEnabled: true,
};

initializePhraseAppEditor(config);
```
<br>
<br>

`app.module.ts`

```js
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PhraseAppCompiler } from 'ngx-translate-phraseapp'
import { AppComponent } from './app.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: PhraseAppCompiler
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

If this does not work for you, you can also integrate the [JavaScript snippet manually](https://help.phrase.com/help/integrate-in-context-editor-into-any-web-framework).

## :white_check_mark: Commits & Pull Requests

We welcome anyone who wants to contribute to our codebase, so if you notice something, feel free to open a Pull Request! However, we ask that you please use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages and titles when opening a Pull Request.

Example: `chore: Update README`

## :question: Issues, Questions, Support

Please use [GitHub issues](https://github.com/phrase/ngx-translate-phraseapp/issues) to share your problem, and we will do our best to answer any questions or to support you in finding a solution.

## :memo: Changelog

Detailed changes for each release are documented in the [changelog](https://github.com/phrase/ngx-translate-phraseapp/releases).
