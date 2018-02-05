import { TranslateCompiler } from '@ngx-translate/core';
import { escapeId } from './config';


export class PhraseAppCompiler extends TranslateCompiler {
    constructor() {
        super();
    }

    compile(value: string, lang: string): string | Function {
        return escapeId(value);
    }

    compileTranslations(translations: any, lang: string): any {
        let escapedTranslations: any = {};
        Object.keys(translations).forEach((key, value) => {
            escapedTranslations[key] = escapeId(key);
        });

        return escapedTranslations;
    }
}