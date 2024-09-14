'use server'

import {headers} from "next/headers";

const CanonicalURL  = () => {

    const headersList = headers();
    const currentUrl = headersList.get('x-current-url');

    return <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${currentUrl}` || ''}/>
}

export default CanonicalURL;