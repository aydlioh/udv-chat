import { ChatPage } from '@/routes/chat-page/ui/chat';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Chat ${id}`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <ChatPage id={id} />;
}
