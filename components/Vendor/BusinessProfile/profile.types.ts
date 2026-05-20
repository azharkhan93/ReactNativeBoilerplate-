/**
 * Mirrors NestGqlBoilerplate VendorProfileType / VendorProfileEntity.
 * One profile per user (userId is unique in DB).
 */
export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  imageUri?: string | null;
  gstNumber?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  serviceRadius?: string | null;
  operatingHours?: string | null;
}

export type CreateVendorProfileInput = {
  userId?: string;
  businessName: string;
  imageUri?: string;
  gstNumber?: string;
  contactNumber?: string;
  address?: string;
  serviceRadius?: string;
  operatingHours?: string;
};

export type UpdateVendorProfileInput = {
  businessName?: string;
  imageUri?: string;
  gstNumber?: string;
  contactNumber?: string;
  address?: string;
  serviceRadius?: string;
  operatingHours?: string;
};

export const toFormProfile = (p: VendorProfile) => ({
  id: p.id,
  businessName: p.businessName || '',
  gstNumber: p.gstNumber || '',
  address: p.address || '',
  contactNumber: p.contactNumber || '',
  imageUri: p.imageUri || null,
  serviceRadius: p.serviceRadius || '5km',
  operatingHours: p.operatingHours || 'Mon - Sat, 09:00 AM - 08:00 PM',
});

export const toCreateInput = (
  form: ReturnType<typeof toFormProfile>,
  userId: string,
): CreateVendorProfileInput => ({
  userId,
  businessName: form.businessName,
  imageUri: form.imageUri || undefined,
  gstNumber: form.gstNumber || undefined,
  contactNumber: form.contactNumber || undefined,
  address: form.address || undefined,
  serviceRadius: form.serviceRadius,
  operatingHours: form.operatingHours,
});

export const toUpdateInput = (form: ReturnType<typeof toFormProfile>): UpdateVendorProfileInput => ({
  businessName: form.businessName,
  imageUri: form.imageUri || undefined,
  gstNumber: form.gstNumber || undefined,
  contactNumber: form.contactNumber || undefined,
  address: form.address || undefined,
  serviceRadius: form.serviceRadius,
  operatingHours: form.operatingHours,
});
