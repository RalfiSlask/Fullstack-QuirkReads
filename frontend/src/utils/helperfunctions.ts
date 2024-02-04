export const getStringWithcapitalizedFirstLetter = (text: string) => {
  const textWithUppercase = text.charAt(0).toUpperCase() + text.slice(1);
  return textWithUppercase;
};
