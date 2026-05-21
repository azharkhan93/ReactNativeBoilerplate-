import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { User, Camera } from 'lucide-react-native';
import { Container } from '../../theme';

export interface ProfileAvatarProps {
  size?: number;
  avatarUrl?: string | null;
  onEditPress?: () => void;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 100,
  avatarUrl,
  onEditPress,
  className,
}) => {
  return (
    <Container variant="column-centered" className={className}>
      <View
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >
        <Container
          variant="centered"
          className="rounded-full border-2 border-primary-500 bg-gray-900 overflow-hidden"
          style={{
            width: size,
            height: size,
          }}
        >
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <User size={size * 0.5} color="#3b82f6" />
          )}
        </Container>
        
        {onEditPress ? (
          <TouchableOpacity
            onPress={onEditPress}
            activeOpacity={0.8}
            className="absolute bottom-0 right-0 rounded-full bg-primary-500 p-2.5 shadow-lg border-2 border-gray-950 items-center justify-center"
            style={{
              width: size * 0.35,
              height: size * 0.35,
            }}
          >
            <Camera size={size * 0.16} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
      </View>
    </Container>
  );
};

