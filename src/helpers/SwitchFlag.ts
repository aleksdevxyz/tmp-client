export const switchFlag = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'English.svg'
      case 'de':
        return "German.svg"
      case 'ru':
        return "Russian.svg"
        case 'es':
        return 'Spanish.svg'
      case 'fr':
        return "French.svg"
      case 'it':
        return "Italian.svg"
        case 'pt':
          return "Portuguese.svg"
    }
  }