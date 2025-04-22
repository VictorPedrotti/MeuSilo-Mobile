import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#228B22" />
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : <Redirect href="/(auth)/login" />;
}