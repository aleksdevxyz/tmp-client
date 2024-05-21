import { localePrefix } from '@/navigation';
import createIntlMiddleware from 'next-intl/middleware';
 
export default createIntlMiddleware({
  locales: ['ru', 'en', 'es', 'fr','de', 'it', 'pt'],
  localePrefix,
  defaultLocale: 'ru'
});
 
export const config = {
  matcher: ['/','/(ru|en|es|fr|de|it|pt)/:path*'],
};

