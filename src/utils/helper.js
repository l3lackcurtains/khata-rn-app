import languages from './languages';

const transformNumberToNepali = value => {
  const valString = value.toString();
  const valArray = valString.split('');
  valString.split('').forEach((letter, index) => {
    switch (letter) {
      case '1':
        valArray[index] = '१';
        break;
      case '2':
        valArray[index] = '२';
        break;
      case '3':
        valArray[index] = '३';
        break;
      case '4':
        valArray[index] = '४';
        break;
      case '5':
        valArray[index] = '५';
        break;
      case '6':
        valArray[index] = '६';
        break;
      case '7':
        valArray[index] = '७';
        break;
      case '8':
        valArray[index] = '८';
        break;
      case '9':
        valArray[index] = '९';
        break;
      case '0':
        valArray[index] = '०';
        break;
      default:
        break;
    }
  });
  const replacedString = valArray.join('');
  return replacedString;
};

const translateText = (language, id, text) => {
  const { np, hi } = languages;
  // Nepali Language
  if (language === 'Nepali') {
    if (id === 'number') {
      const nepaliNumber = transformNumberToNepali(text);
      return nepaliNumber;
    }
    return np[id];
    // Hindi Language
  } else if (language === 'Hindi') {
    if (id === 'number') {
      const hindiNumber = transformNumberToNepali(text);
      return hindiNumber;
    }
    return hi[id];
  }
  return text;
};

export { transformNumberToNepali, translateText };
