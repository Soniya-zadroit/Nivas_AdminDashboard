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
