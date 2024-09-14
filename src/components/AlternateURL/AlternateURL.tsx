'use server'

import {headers} from "next/headers";

const AlternateURL  = () => {

    const headersList = headers();
    const currentUrl = headersList.get('x-current-url') || '';

    const parts = currentUrl.split('/');
    const linkWithoutLang = parts.slice(2).join('/')
    const languages = ['ru', 'de', 'en', 'es', 'fr', 'it', 'pt'];

    return (
        <>
            {languages.map(lang => (
                <link
                    key={lang}
                    rel="alternate"
                    hrefLang={lang}
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${linkWithoutLang}`}
                />
            ))}
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_SITE_URL}/ru/${linkWithoutLang}`}/>
        </>
    )
}

export default AlternateURL;