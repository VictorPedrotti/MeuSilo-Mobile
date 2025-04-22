import { Stack } from 'expo-router';
import AuthGuard from '@/components/AuthGuard'; 

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}