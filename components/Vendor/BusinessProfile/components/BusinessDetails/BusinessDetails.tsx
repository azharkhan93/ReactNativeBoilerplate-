import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Pencil, Trash2, Building2 } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { DetailRow } from './components/DetailRow';
import { BusinessDetailsProps } from './types';
import { businessDetailsStyles } from './styles';

export const BusinessDetails: React.FC<BusinessDetailsProps> = React.memo(
  ({ profile, onEditPress, onDeletePress, loading }) => (
    <View className={businessDetailsStyles.container}>
      <View className={businessDetailsStyles.headerRow}>
        <Typography variant="subheading" className={businessDetailsStyles.title}>
          Business Details
        </Typography>
        <View className={businessDetailsStyles.actionRow}>
          <TouchableOpacity
            onPress={onEditPress}
            className={businessDetailsStyles.editButton}
            activeOpacity={0.7}
          >
            <Pencil size={13} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDeletePress}
            disabled={loading}
            className={businessDetailsStyles.deleteButton}
            activeOpacity={0.7}
          >
            <Trash2 size={13} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View className={businessDetailsStyles.imageWrapper}>
        {profile.imageUri ? (
          <Image
            source={{ uri: profile.imageUri }}
            className={businessDetailsStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View className={businessDetailsStyles.placeholderImage}>
            <Building2 size={32} color="#94a3b8" />
          </View>
        )}
      </View>

      <DetailRow label="Business Name" value={profile.businessName || ''} />
      <DetailRow label="GST Number" value={profile.gstNumber || ''} />
      <DetailRow
        label="Contact Number"
        value={profile.contactNumber ? `+91 ${profile.contactNumber}` : ''}
      />
      <DetailRow label="Business Address" value={profile.address || ''} />
      <DetailRow label="Service Radius" value={profile.serviceRadius || ''} />
      <DetailRow
        label="Operating Hours"
        value={profile.operatingHours || ''}
        isLast
      />
    </View>
  ),
);
