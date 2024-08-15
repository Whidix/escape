import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
  loaders: [
    {
      locale: 'fr',
      key: 'common',
      loader: async () => (
        await import('./fr/common.json')
      ).default,
    },
    {
      locale: 'fr',
      key: 'home',
      route: ['/'],
      loader: async () => (
        await import('./fr/home.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'common',
      loader: async () => (
        await import('./en/common.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'home',
      route: ['/'],
      loader: async () => (
        await import('./en/home.json')
      ).default,
    }
  ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);