import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoreVertical } from 'lucide-react-native';
import { Container, Typography } from '../../theme';
import { ProfileAvatar } from '../ProfileAvatar';

export interface ProfileHeaderProps {
  userName: string;
  userPhone: string;
  onMenuPress?: () => void;
  onEditProfilePress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userPhone,
  onMenuPress,
  onEditProfilePress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      className="bg-primary-800 relative overflow-hidden"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: Math.max(insets.top, 20),
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
     


      
      <Container variant="between" className="mb-6">
        <Typography variant="h2" className="text-white font-heading-bold">
          Profile
        </Typography>
        {onMenuPress ? (
          <TouchableOpacity
            onPress={onMenuPress}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-white items-center justify-center"
          >
            <MoreVertical size={20} color="#1e40af" />
          </TouchableOpacity>
        ): null}
      </Container>

    
      <Container variant="column-centered" gap={3}>
        <ProfileAvatar size={100} onEditPress={onEditProfilePress} />
        <Container variant="column-centered" gap={1}>
          <Typography variant="h3" className="text-white font-heading-bold">
            {userName}
          </Typography>
          <Typography variant="body" className="text-white opacity-90">
            {userPhone}
          </Typography>
        </Container>
      </Container>
    </Container>
  );
};
