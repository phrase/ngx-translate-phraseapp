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

        translations = this.flatten(translations);
        const escapedTranslations: any = {};
        Object.keys(translations).forEach((key, _) => {
            escapedTranslations[key] = escapeId(key);
        });

        return escapedTranslations;
    }
    flatten(object: Object): Object {
        const separator = '.'
        const isValidObject = (value: any = {}): boolean => {
            if (!value) {
                return false;
            }

            const isArray = Array.isArray(value);
            const isΟbject = Object.prototype.toString.call(value) === '[object Object]';
            const hasKeys = !!Object.keys(value).length;

            return !isArray && isΟbject && hasKeys;
        };

        const walker = (child: any = {}, path: Array<string> = []): Object => {
            return Object.assign({}, ...Object.keys(child).map(key => isValidObject(child[key])
                ? walker(child[key], path.concat([key]))
                : { [path.concat([key]).join(separator)]: child[key] })
            );
        };

        return Object.assign({}, walker(object));
    }
}
