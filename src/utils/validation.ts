export const validateBarcode = (barcode: string): boolean => {
  return /^[0-9]{13}$/.test(barcode);
};

export const validateGoogleDriveUrl = (url: string): boolean => {
  if (!url) return true; // Allow empty URL
  return url.includes('drive.google.com/file/d/') || url.includes('drive.google.com/open?id=');
};

export const validatePrice = (price: string): boolean => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

export const validateQuantity = (quantity: string): boolean => {
  const numQuantity = parseInt(quantity);
  return !isNaN(numQuantity) && numQuantity > 0;
};