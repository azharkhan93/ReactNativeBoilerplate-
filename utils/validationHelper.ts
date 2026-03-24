
export const isValidIndianPhoneNumber = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return /^[6789]\d{9}$/.test(cleaned);
};
