import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { User, Link } from 'lucide-react-native';
import { Container } from '../../theme';

export interface ProfileAvatarProps {
  size?: number;
  onEditPress?: () => void;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 100,
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
          className="rounded-full border-2 border-primary-300 bg-primary-100"
          style={{
            width: size,
            height: size,
          }}
        >
          <User size={size * 0.5} color="#3b82f6" />
        </Container>
        
        {onEditPress ?(
          <TouchableOpacity
            onPress={onEditPress}
            activeOpacity={0.7}
            className="absolute bottom-0 right-0 rounded-full bg-orange-500 p-2"
            style={{
              width: size * 0.35,
              height: size * 0.35,
            }}
          >
            <Container variant="centered" className="flex-1">
              <Link size={size * 0.15} color="#ffffff" />
            </Container>
          </TouchableOpacity>
        ): null}
      </View>
    </Container>
  );
};
