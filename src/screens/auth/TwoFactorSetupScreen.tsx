import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuth } from '../../context/AuthContext';

export const TwoFactorSetupScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setupTwoFactor, skipTwoFactor } = useAuth();

  const handleVerify = async () => {
    if (!verificationCode) {
      setError('Please enter verification code');
      return;
    }

    setIsLoading(true);
    try {
      await setupTwoFactor(verificationCode);
      navigation.replace('ProfileWizard');
    } catch (error) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    await skipTwoFactor();
    navigation.replace('ProfileWizard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Set Up Two-Factor Authentication</Text>
        <Text style={styles.subtitle}>
          Scan the QR code with your authenticator app
        </Text>

        <View style={styles.qrContainer}>
          <Image
            source={{ uri: 'YOUR_QR_CODE_URL' }}
            style={styles.qrCode}
            resizeMode="contain"
          />
        </View>

        <Input
          label="Enter Verification Code"
          value={verificationCode}
          onChangeText={text => {
            setVerificationCode(text);
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
          <>
            <Button
              title="Verify and Enable 2FA"
              onPress={handleVerify}
              style={styles.button}
            />
            <Button
              title="Skip for now"
              variant="secondary"
              onPress={handleSkip}
            />
          </>
        )}

        <Text style={styles.helpText}>
          You can always enable two-factor authentication later in your account settings
        </Text>
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
  qrContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  button: {
    marginTop: 24,
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});