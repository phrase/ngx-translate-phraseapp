# ngx-translate-phraseapp

## Prerequisites

To use ngx-translate-phraseapp with your application you have to:

* Sign up for a PhraseApp account: [https://phraseapp.com/en/signup](https://phraseapp.com/en/signup)
* Use [ngx-translate](https://github.com/ngx-translate/core) module for localization in your Angular 2+ app

## Demo

You can find a demo project on [GitHub](https://github.com/phrase/ngx-translate-phraseapp-demo).

## Installation

### NPM:

    npm install ngx-translate-phraseapp

### Build form source

You can also build it directly from source to get the latest and greatest:

    npm run dist

### Development

	npm install


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

You can find the Project-ID in the Project overview in the PhraseApp Translation Center.

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

If this does not work for you, you can also integrate the [JavaScript snippet manually](http://docs.phraseapp.com/guides/in-context-editor/custom-integration/).

## Support

**Question?** Contact us at: [phraseapp.com/contact](https://phraseapp.com/contact)

**Issue?** Create a GitHub issues and share the problem
