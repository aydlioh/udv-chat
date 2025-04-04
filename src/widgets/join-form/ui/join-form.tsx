'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/ui';

import { JoinFormSchema, type JoinFormType } from '../schema';
import { JoinSuccessToast } from './success-toast';
import { useUserActions } from '@/entities/user';

const defaultValues: JoinFormType = {
  login: '',
  room: '',
};

export const JoinForm = () => {
  const { signIn } = useUserActions();
  const router = useRouter();

  const form = useForm<JoinFormType>({
    resolver: zodResolver(JoinFormSchema),
    defaultValues,
  });

  const onSubmit = (data: JoinFormType) => {
    router.push(`/chat/${data.room}`);
    signIn({ login: data.login });
    toast(<JoinSuccessToast data={data} />);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="Иванов Иван" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название комнаты</FormLabel>
              <FormControl>
                <Input placeholder="MyRoom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-lg">
          Войти
        </Button>
      </form>
    </Form>
  );
};
