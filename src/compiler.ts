import { TranslateCompiler } from '@ngx-translate/core';


export class PhraseAppCompiler extends TranslateCompiler {
    constructor() {
        super();
    }

    compile(value: string, lang: string): string | Function {
        return value;
    }

    compileTranslations(translations: any, lang: string): any {
        let config = (<any>window).PHRASEAPP_CONFIG;
        let phraseTranslations: any = {};

        Object.keys(translations).forEach((key, value) => {
            phraseTranslations[key] = config.prefix + 'phrase_' + key + config.suffix;
        });

        return phraseTranslations;
    }
}