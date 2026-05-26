export interface QuickRepliesProps {
  /**
   * Callback fired when a quick reply text badge is tapped.
   * @param reply The text content of the selected reply.
   */
  onReplySelect: (reply: string) => void;
}

export interface ReplyBadgeProps {
  readonly reply: string;
  readonly onPress: (reply: string) => void;
}
