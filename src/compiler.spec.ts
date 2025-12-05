jest.mock('@ngx-translate/core', () => ({
  TranslateCompiler: class {
    compile(value: string) {
      return value;
    }
    compileTranslations(value: any) {
      return value;
    }
  },
}));

import { PhraseAppCompiler } from './compiler';
import { escapeId, isPhraseEnabled } from './config';

jest.mock('./config', () => ({
  isPhraseEnabled: jest.fn(),
  escapeId: jest.fn(),
}));

const mockedIsPhraseEnabled = isPhraseEnabled as jest.MockedFunction<typeof isPhraseEnabled>;
const mockedEscapeId = escapeId as jest.MockedFunction<typeof escapeId>;

describe('PhraseAppCompiler', () => {
  beforeEach(() => {
    mockedIsPhraseEnabled.mockReset();
    mockedEscapeId.mockReset();
  });

  it('returns the original value when Phrase is disabled', () => {
    mockedIsPhraseEnabled.mockReturnValue(false);
    const compiler = new PhraseAppCompiler();

    const compiled = compiler.compile('welcome', 'en');

    expect(compiled).toBe('welcome');
    expect(mockedEscapeId).not.toHaveBeenCalled();
  });

  it('escapes ids when Phrase is enabled', () => {
    mockedIsPhraseEnabled.mockReturnValue(true);
    mockedEscapeId.mockImplementation((value: string) => `escaped-${value}`);
    const compiler = new PhraseAppCompiler();

    const compiled = compiler.compile('farewell', 'en');

    expect(compiled).toBe('escaped-farewell');
    expect(mockedEscapeId).toHaveBeenCalledWith('farewell');
  });

  it('returns original translations when Phrase is disabled', () => {
    mockedIsPhraseEnabled.mockReturnValue(false);
    const compiler = new PhraseAppCompiler();
    const translations = { greeting: 'Hello' };

    const compiled = compiler.compileTranslations(translations, 'en');

    expect(compiled).toBe(translations);
    expect(mockedEscapeId).not.toHaveBeenCalled();
  });

  it('flattens and escapes translation keys when Phrase is enabled', () => {
    mockedIsPhraseEnabled.mockReturnValue(true);
    mockedEscapeId.mockImplementation((value: string) => `escaped-${value}`);
    const compiler = new PhraseAppCompiler();

    const compiled = compiler.compileTranslations(
      {
        greeting: { short: 'Hi' },
        farewell: 'Bye',
      },
      'en'
    );

    expect(compiled).toEqual({
      'greeting.short': 'escaped-greeting.short',
      farewell: 'escaped-farewell',
    });
  });

  it('flatten reduces nested objects while retaining non-object values', () => {
    const compiler = new PhraseAppCompiler();
    const flattened = compiler.flatten({
      account: { settings: { theme: 'dark' } },
      list: ['one', 'two'],
    } as any);

    expect(flattened).toEqual({
      'account.settings.theme': 'dark',
      list: ['one', 'two'],
    });
  });
});
