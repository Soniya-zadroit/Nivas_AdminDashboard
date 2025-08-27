export const str = (v: any) => String(v ?? "").trim();
export const digits = (v: any) => str(v).replace(/\D/g, "");
export const isValidEmail = (v: any) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(v));
export const isValidPhoneIN = (v: any) => /^[6-9]\d{9}$/.test(digits(v)); // 10-digit Indian mobile
export const isValidPincodeIN = (v: any) => /^\d{6}$/.test(str(v));
export const isValidUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return pattern.test(url);
};
export const isValidGSTIN = (v: any) => /^[0-9A-Z]{15}$/.test(str(v)); // basic GSTIN shape
export const isValidCIN = (v: any) =>
  /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/.test(
    String(v).toUpperCase()
  );

// utils/numberToWords.ts
export const numberToWords = (num: number): string => {
  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (num === 0) return "zero";
  if (num < 20) return a[num];
  if (num < 100)
    return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
  if (num < 1000) {
    return (
      a[Math.floor(num / 100)] +
      " hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  }
  if (num < 1000000) {
    return (
      numberToWords(Math.floor(num / 1000)) +
      " thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );
  }
  return num.toString(); // fallback for very large numbers
};
