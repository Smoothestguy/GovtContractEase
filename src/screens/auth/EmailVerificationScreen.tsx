import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuth } from '../../context/AuthContext';

export const EmailVerificationScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { verifyEmail, resendVerificationCode } = useAuth();
  const { email } = route.params;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (!code) {
      setError('Please enter verification code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(code);
      navigation.replace('TwoFactorSetup');
    } catch (error) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerificationCode(email);
      setTimer(30);
      setError('');
    } catch (error) {
      setError('Failed to resend code');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to {email}
        </Text>

        <Input
          label="Enter Verification Code"
          value={code}
          onChangeText={text => {
            setCode(text);
            setError('');
          }}
          placeholder="000000"
          keyboardType="number-pad"
          maxLength={6}
          error={error}
        />
        {error && <ErrorMessage message={error} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            title="Verify Email"
            onPress={handleVerify}
            style={styles.button}
          />
        )}

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend in {timer}s</Text>
          ) : (
            <Button
              title="Resend Code"
              variant="secondary"
              onPress={handleResend}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    marginTop: 24,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  resendText: {
    color: colors.textSecondary,
  },
  timerText: {
    color: colors.primary,
    fontWeight: '600',
  },
});