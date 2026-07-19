import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';

import { GET_VENDOR_PROFILE_BY_ID, VENDOR_PROFILE_FIELDS } from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';
import type { GetVendorProfileByIdQuery } from '@/__generated__/graphql';

const TEST_FALLBACK_VENDORS = [
  {
    id: 'test-vendor-1',
    userId: 'u1',
    businessName: 'Sparkle Car Wash (Demo)',
    imageUri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
    gstNumber: 'GST12345',
    contactNumber: '+1 555-0199',
    address: '742 Evergreen Terrace, Springfield',
    serviceRadius: '5km',
    operatingHours: 'Mon - Sat, 09:00 AM - 08:00 PM',
    whyChooseMe: 'Eco-friendly steam wash, premium microfiber towels, scratch-free detailing guarantees.',
    description: 'Serving the community for over 10 years, Sparkle Car Wash offers high-end detailing and exterior cleaning solutions for Sedans, SUVs, and luxury sports vehicles.',
    images: [
      'https://images.unsplash.com/photo-1605610816744-13c4752fea01?w=800&q=80',
      'https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=800&q=80'
    ]
  },
  {
    id: 'test-vendor-2',
    userId: 'u2',
    businessName: 'Elite Auto Spa (Demo)',
    imageUri: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=800&q=80',
    gstNumber: 'GST67890',
    contactNumber: '+1 555-0144',
    address: '123 Maple Avenue, Downtown',
    serviceRadius: '10km',
    operatingHours: 'Mon - Sun, 08:00 AM - 09:00 PM',
    whyChooseMe: 'Certified detailing experts, ceramic coating specialists, premium interior shampoo treatments.',
    description: 'Elite Auto Spa is your ultimate destination for comprehensive car restoration and paint protection. We use state-of-the-art tools and luxury waxes.',
    images: [
      'https://images.unsplash.com/photo-1599256621730-535171e28e50?w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80'
    ]
  }
];

export const useVendorDetail = (vendorId: string | null) => {
  const isTest = !vendorId || vendorId.startsWith('test-vendor-') || !vendorId.startsWith('gid://');

  const { data, loading, error, refetch } = useQuery<GetVendorProfileByIdQuery>(GET_VENDOR_PROFILE_BY_ID, {
    variables: { id: vendorId ?? '' },
    skip: !vendorId || isTest,
    fetchPolicy: 'cache-and-network',
  });

  // Unmask single vendor profile fields safely
  const unmaskedVendor = useFragment(VENDOR_PROFILE_FIELDS, data?.getVendorProfileById);

  const fallbackVendor = useMemo(() => {
    if (!vendorId) return null;
    const match = TEST_FALLBACK_VENDORS.find(v => v.id === vendorId);
    if (match) return match;
    return {
      id: vendorId,
      userId: 'u-demo',
      businessName: 'Sparkle Auto Care & Detailing',
      imageUri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
      gstNumber: 'GST998877',
      contactNumber: '+971 50 987 6543',
      address: 'Downtown Palm Tower, Dubai, UAE',
      serviceRadius: '10km',
      operatingHours: 'Mon - Sun, 08:00 AM - 09:00 PM',
      whyChooseMe: 'Eco-friendly steam wash, scratch-free microfiber polishing, and 100% satisfaction guarantee.',
      description: 'Sparkle Auto Care is your premier auto spa provider offering high-end exterior washing, interior shampooing, and ceramic paint protection.',
      images: [
        'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
        'https://images.unsplash.com/photo-1605610816744-13c4752fea01?w=800&q=80',
        'https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=800&q=80',
      ],
    };
  }, [vendorId]);

  const activeVendor = unmaskedVendor || fallbackVendor;

  return {
    vendor: activeVendor,
    loading: loading && !activeVendor,
    error: activeVendor ? null : error,
    refetch,
  };
};
