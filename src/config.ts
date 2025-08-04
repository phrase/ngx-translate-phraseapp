type RequiredConfigOptions = "projectId" | "accountId";

export type PhraseConfig = Partial<{
  phraseEnabled: boolean;
  baseUrl: string;
  profileUrl: string;
  apiBaseUrl: string;
  oauthEndpointUrl: string;
  helpUrl: string;
  logoUrl: string;
  stylesheetUrl: string;
  version: string;
  priorityLocales: string[];
  projectId: string;
  accountId: string;
  branch: string;
  ajaxObserver: boolean;
  debugMode: boolean;
  prefix: string;
  suffix: string;
  autoLowercase: boolean;
  useOldICE: boolean;
  forceLocale: boolean;
  loginDialogMessage: string;
  datacenter: "eu" | "us";
  autoLogin: {
    perform: boolean;
    email: string;
    password: string;
  };
  sso: {
    enabled: boolean;
    enforced: boolean;
    provider: string;
    identifier: string;
  };
  fullReparse: boolean;
  sanitize?: (content: string) => string;
  origin?: string;
  hidingClasses: string[];
}>;

declare global {
  interface Window {
    PHRASEAPP_ENABLED: PhraseConfig["phraseEnabled"];
    PHRASEAPP_CONFIG: PhraseConfig;
  }
}

let phraseAppEditor = false;

export function initializePhraseAppEditor(
  config: PhraseConfig & Required<Pick<PhraseConfig, RequiredConfigOptions>>
): void {
  if (phraseAppEditor) return;
  phraseAppEditor = true;

  const defaultConfig: PhraseConfig = {
    phraseEnabled: false,
    prefix: "{{__",
    suffix: "__}}",
    useOldICE: false,
    fullReparse: true,
  };

  window.PHRASEAPP_ENABLED = config.phraseEnabled || false;
  window.PHRASEAPP_CONFIG = {
    ...defaultConfig,
    ...config,
    origin: "ngx-translate-phraseapp",
  };

  if (config.phraseEnabled) {
    const phraseapp = document.createElement("script");
    phraseapp.async = true;

    if (!config.useOldICE) {
      phraseapp.type = "module";
      phraseapp.src = `https://cdn.phrase.com/strings/plugins/editor/latest/ice/index.js`;
    } else {
      phraseapp.type = "text/javascript";
      phraseapp.src = `https://phrase.com/assets/in-context-editor/2.0/app.js?${new Date().getTime()}`;
    }
    var scriptEl = document.getElementsByTagName("script")[0];
    if (scriptEl?.parentNode) {
      scriptEl.parentNode.insertBefore(phraseapp, scriptEl);
    } else {
      document.body.appendChild(phraseapp);
    }
  }
}

export function isPhraseEnabled(): boolean {
  return !!window.PHRASEAPP_ENABLED;
}

export function escapeId(id: string): string {
  let config = window.PHRASEAPP_CONFIG;
  return config.prefix + "phrase_" + id + config.suffix;
}
