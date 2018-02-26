import { TranslateCompiler } from '@ngx-translate/core';
import { escapeId, isPhraseEnabled } from './config';


export class PhraseAppCompiler extends TranslateCompiler {
    constructor() {
        super();
    }

    compile(value: string, lang: string): string | Function {
        if (!isPhraseEnabled()) {
            return value;
        }

        return escapeId(value);
    }

    compileTranslations(translations: any, lang: string): any {
        if (!isPhraseEnabled()) {
            return translations;
        }

        let escapedTranslations: any = {};
        Object.keys(translations).forEach((key, value) => {
            escapedTranslations[key] = escapeId(key);
        });

        return escapedTranslations;
    }
}