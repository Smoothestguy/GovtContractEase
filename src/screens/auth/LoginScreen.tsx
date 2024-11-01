import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { SocialButton } from '../../components/SocialButton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <Text style={styles.title}>ContractEase</Text>
      <Text style={styles.subtitle}>Join ContractEase for free access</Text>
      
      <View style={styles.form}>
        <Input
          label="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' });
          }}
          placeholder="Email@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        {errors.email && <ErrorMessage message={errors.email} />}
        
        <Input
          label="Enter password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          placeholder="••••••••"
          secureTextEntry
          error={errors.password}
        />
        {errors.password && <ErrorMessage message={errors.password} />}
        
        <Button
          title="Forgot Password?"
          variant="secondary"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
        
        {errors.submit && <ErrorMessage message={errors.submit} />}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button 
            title="Get started"
            onPress={handleSignIn}
            style={styles.button}
          />
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <SocialButton
            title="Google"
            icon="google"
            onPress={signInWithGoogle}
            style={styles.socialButton}
          />
          <SocialButton
            title="Apple"
            icon="apple"
            onPress={signInWithApple}
            style={styles.socialButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to ContractEase?</Text>
          <Button
            title="Sign up"
            variant="secondary"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  socialButton: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  footerText: {
    color: colors.textSecondary,
  },
});