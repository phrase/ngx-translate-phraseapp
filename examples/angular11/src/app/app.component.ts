import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { initializePhraseAppEditor } from "ngx-translate-phraseapp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');

    let config = {
      projectId: '00000000000000004158e0858d2fa45c',
      accountId: '0bed59e5',
      phraseEnabled: true,
      prefix: "{{__",
      suffix: "__}}",
      fullReparse: true,
      useOldICE: false,
    };

    initializePhraseAppEditor(config);
  }
}
