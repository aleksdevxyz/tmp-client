import { localePrefix } from '@/navigation';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import { getToken } from './app/[locale]/api/getToken';
 
export default async function middleware(request: NextRequest) {

 
  const handleI18nRouting = createIntlMiddleware({
    locales: ['ru', 'en', 'es', 'fr','de', 'it', 'pt'],
    localePrefix,
    defaultLocale: 'ru'
  });
  const response = handleI18nRouting(request);
  const token = request.cookies.get('token')
  
  
  if (!token?.value) {
    const token = await getToken();
    response.cookies.set('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 10)
      ,
    });
    
  }
 
  return response;
}
 

export const config = {
  matcher: ['/','/(ru|en|es|fr|de|it|pt)/:path*'],
};

