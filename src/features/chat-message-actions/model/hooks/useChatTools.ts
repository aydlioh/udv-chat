import { Reply, PinOff, Pin, Copy } from 'lucide-react';
import { IMessage } from '@/shared/types';
import { ChatTools } from '../types';
import { useCallback } from 'react';
import { useChatActions } from '@/entities/chat-message';
import { usePinnedMessages } from '@/entities/pinned-message/model/hooks/usePinnedMessage';

export const useChatTools = (
  chatId: string,
  message: IMessage
): ChatTools[] => {
  const { pinMessage, unpinMessage } = useChatActions(chatId);
  const { pinnedMessage } = usePinnedMessages(chatId);

  const handleCopy = useCallback(
    () => navigator.clipboard.writeText(message.content),
    [message.content]
  );

  const isPinned = pinnedMessage?.id === message.id;

  return [
    {
      key: 'send',
      label: 'Ответить',
      icon: Reply,
      onClick: () => console.log('Ответить'),
    },
    {
      key: 'pin',
      label: isPinned ? 'Открепить' : 'Закрепить',
      icon: isPinned ? PinOff : Pin,
      onClick: isPinned ? unpinMessage : () => pinMessage(message),
    },
    {
      key: 'copy',
      label: 'Копировать текст',
      icon: Copy,
      onClick: handleCopy,
    },
  ];
};
