# ngx-translate-phraseapp

ngx-translate-phraseapp is an addon for ngx-translate that lets you connect localized Angular applications to the Phrase In-Context Editor.

## Prerequisites

To use ngx-translate-phraseapp with your application you have to:

* Sign up for a Phrase account: [https://phrase.com/signup](https://phrase.com/signup)
* Use [ngx-translate](https://github.com/ngx-translate/core) module for localization in your Angular 2+ app

## Demo

You can find a demo project on [GitHub](https://github.com/phrase/ngx-translate-phraseapp-demo).

## Installation

### NPM:

    npm install ngx-translate-phraseapp

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

## Development

### Build from source
You can also build it directly from source to get the latest and greatest:
```
npm install
npm run dist
```

## Support

**Question?** Contact us at: [phrase.com/contact](https://phrase.com/contact)

**Issue?** Create a GitHub issues and share the problem
