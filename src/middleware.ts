import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './navigation'


export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'ru'
});

export const config = {
  matcher: ['/', '/(ru|en|es|fr|de|it|pt)/:path*']
};






