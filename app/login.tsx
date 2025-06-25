import { loginUser } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../contexts/auth/AuthContext';

export default function LoginScreen() {
  const { signIn, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    const tokenStr = await loginUser(username, password);

    if(!tokenStr) {
      setSubmitting(false);
      Alert.alert('Error', 'Credenciales incorrectas');
      return;
    }

    const success = signIn(tokenStr);
    setSubmitting(false);

    if (!success) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    } else {
      router.push('/');
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={submitting ? 'Ingresando...' : 'Ingresar'} onPress={handleLogin} disabled={submitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, paddingBottom: 120 },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12, marginBottom: 16 },
});
