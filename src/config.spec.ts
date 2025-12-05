import type { PhraseConfig } from './config';

describe('initializePhraseAppEditor', () => {
  const requiredConfig: PhraseConfig & { projectId: string; accountId: string } = {
    projectId: 'proj-id',
    accountId: 'acc-id',
  };

  const loadModule = () => import('./config');

  beforeEach(() => {
    jest.resetModules();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    delete (window as any).PHRASEAPP_ENABLED;
    delete (window as any).PHRASEAPP_CONFIG;
  });

  it('merges default values and loads phrase script when enabled', async () => {
    const { initializePhraseAppEditor } = await loadModule();

    initializePhraseAppEditor({
      ...requiredConfig,
      phraseEnabled: true,
      prefix: '<<',
      suffix: '>>',
    });

    const appendedScripts = Array.from(document.querySelectorAll('script'));
    const phraseScript = appendedScripts.find((script) =>
      script.src.includes('cdn.phrase.com')
    );

    expect(phraseScript).toBeDefined();
    expect(phraseScript?.type).toBe('module');
    expect(window.PHRASEAPP_ENABLED).toBe(true);
    expect(window.PHRASEAPP_CONFIG.origin).toBe('ngx-translate-phraseapp');
    expect(window.PHRASEAPP_CONFIG.prefix).toBe('<<');
    expect(window.PHRASEAPP_CONFIG.suffix).toBe('>>');
    expect(window.PHRASEAPP_CONFIG.fullReparse).toBe(true);
  });

  it('runs only once even when called multiple times', async () => {
    const { initializePhraseAppEditor } = await loadModule();

    initializePhraseAppEditor({ ...requiredConfig, phraseEnabled: true });
    initializePhraseAppEditor({ ...requiredConfig, phraseEnabled: true });

    const phraseScripts = Array.from(document.querySelectorAll('script')).filter((script) =>
      script.src.includes('phrase.com')
    );

    expect(phraseScripts).toHaveLength(1);
  });
});

describe('helpers', () => {
  beforeEach(() => {
    (window as any).PHRASEAPP_ENABLED = false;
    (window as any).PHRASEAPP_CONFIG = {
      prefix: '{{__',
      suffix: '__}}',
    };
  });

  it('isPhraseEnabled reflects the window flag', async () => {
    const { isPhraseEnabled } = await import('./config');

    window.PHRASEAPP_ENABLED = true;
    expect(isPhraseEnabled()).toBe(true);

    window.PHRASEAPP_ENABLED = false;
    expect(isPhraseEnabled()).toBe(false);
  });

  it('escapeId wraps ids using configured prefix/suffix', async () => {
    const { escapeId } = await import('./config');

    window.PHRASEAPP_CONFIG = {
      prefix: '[[',
      suffix: ']]',
    } as PhraseConfig;

    expect(escapeId('greeting')).toBe('[[phrase_greeting]]');
  });
});
