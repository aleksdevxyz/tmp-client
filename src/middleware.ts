import { localePrefix } from '@/navigation';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import { getToken, req } from './app/[locale]/api/getToken';
 
export default async function middleware(request: NextRequest) {

 
  const handleI18nRouting = createIntlMiddleware({
    locales: ['ru', 'en', 'es', 'fr','de', 'it', 'pt'],
    localePrefix,
    defaultLocale: 'ru'
  });
  const response = handleI18nRouting(request);


  
  return response;
}
 

export const config = {
  matcher: ['/','/(ru|en|es|fr|de|it|pt)/:path*'],
};

