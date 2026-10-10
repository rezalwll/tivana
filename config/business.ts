const optional = (value: string | undefined) => value?.trim() || null;

const phone = optional(process.env.NEXT_PUBLIC_CONTACT_PHONE);
const email = optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const city = optional(process.env.NEXT_PUBLIC_BUSINESS_CITY);
const instagramHandle = optional(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE)?.replace(/^@/, "") ?? null;
const whatsappNumber = optional(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "") ?? null;

export const businessContact = {
  phone,
  email,
  city,
  instagramHandle,
  instagramUrl: instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : null,
  whatsappNumber,
  hasDirectChannel: Boolean(phone || email || instagramHandle || whatsappNumber),
};

export const createWhatsAppUrl = (message: string) =>
  businessContact.whatsappNumber
    ? `https://wa.me/${businessContact.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
