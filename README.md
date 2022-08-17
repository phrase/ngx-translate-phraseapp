# ngx-translate-phraseapp

ngx-translate-phraseapp is an addon for ngx-translate that lets you connect localized Angular applications to the Phrase In-Context Editor.

## Prerequisites

To use ngx-translate-phraseapp with your application you have to:

* Sign up for a Phrase account: [https://phrase.com/signup](https://phrase.com/signup)
* Use [ngx-translate](https://github.com/ngx-translate/core) module for localization in your Angular 2+ app

## Demo

You can find a demo project on [GitHub](https://github.com/phrase/ngx-translate-phraseapp-demo).

## Installation

### NPM

```bash
npm install ngx-translate-phraseapp
```

### Configure

```js
let config = {
  projectId: '<YOUR_PROJECT_ID>',
  phraseEnabled: true,
  prefix: "{{__",
  suffix: "__}}",
  fullReparse: true
};
```

You can find the Project-ID in the Project overview in the Phrase Translation Center.

By default, the In-Context Editor’s document parser converts all keys to lowercase. If you’re experiencing issues with this behavior and want to use case-sensitive keys within the In-Context Editor, consider disabling the automatic lowercase feature:

```js
let config = {
  // ...
  autoLowercase: false
}
```

### Code snippets

Add the following snippets to your Angular app:

`app.component.ts`

```js
import { initializePhraseAppEditor, PhraseAppCompiler} from 'ngx-translate-phraseapp'

let config = {
  projectId: '<YOUR_PROJECT_ID>',
  phraseEnabled: true,
  prefix: "{{__",
  suffix: "__}}",
  fullReparse: true
};

initializePhraseAppEditor(config);
```

`app.module.ts`

```js
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PhraseAppCompiler } from 'ngx-translate-phraseapp'

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

If this does not work for you, you can also integrate the [JavaScript snippet manually](https://help.phrase.com/en/articles/2183908-integrate-in-context-editor-into-any-web-framework).


### Using the US Datacenter with ICE

In addition to `phraseEnabled` and `projectId` in the config, also add the US specific URLs to enable working through the US endpoint.
```
  baseUrl: "https://us.app.phrase.com",
  apiBaseUrl: 'https://api.us.app.phrase.com/api/v2',
  oauthEndpointUrl: "https://api.us.app.phrase.com/api/v2/authorizations",
  profileUrl: "https://us.app.phrase.com/settings/profile",
```


## Development

### Build from source

You can also build it directly from source to get the latest and greatest:

```bash
npm install
npm run dist
```

## Get help / support

Please contact [support@phrase.com](mailto:support@phrase.com?subject=[GitHub]%20) and we can take more direct action toward finding a solution.
