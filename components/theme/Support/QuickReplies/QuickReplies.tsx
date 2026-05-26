import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { QUICK_REPLIES } from '@/data/mockSupport';
import { Typography } from '../../Typography';
import { QuickRepliesProps, ReplyBadgeProps } from './types';
import { quickRepliesStyles } from './styles';

export const ReplyBadge: React.FC<ReplyBadgeProps> = React.memo(({ reply, onPress }) => {
  const handlePress = useCallback((): void => {
    onPress(reply);
  }, [reply, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={quickRepliesStyles.badge}
      activeOpacity={0.7}
    >
      <Typography variant="body-sm" className={quickRepliesStyles.badgeText}>
        {reply}
      </Typography>
    </TouchableOpacity>
  );
});

ReplyBadge.displayName = 'ReplyBadge';

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onReplySelect }) => {
  const handleReplyPress = useCallback(
    (reply: string): void => {
      onReplySelect?.(reply);
    },
    [onReplySelect],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={quickRepliesStyles.scrollView}
    >
      <View className={quickRepliesStyles.container}>
        {QUICK_REPLIES.map((reply) => (
          <ReplyBadge
            key={reply}
            reply={reply}
            onPress={handleReplyPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

QuickReplies.displayName = 'QuickReplies';
