import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';

export const UploadScreen = ({ navigation }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      setUploadProgress(progress);
      if (progress >= 1) {
        clearInterval(interval);
        setIsUploaded(true);
        navigation.navigate('Analysis');
      }
    }, 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Government Contract</Text>
      </View>

      <TouchableOpacity 
        style={styles.uploadArea}
        onPress={handleUpload}
        activeOpacity={0.7}
      >
        <Icon name="cloud-upload" size={48} color={colors.primary} />
        <Text style={styles.uploadText}>Drag & Drop your document here</Text>
        <Button 
          title="Browse Files"
          variant="secondary"
          onPress={handleUpload}
          style={styles.browseButton}
        />
      </TouchableOpacity>

      {uploadProgress > 0 && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={uploadProgress} />
          {isUploaded && (
            <View style={styles.successContainer}>
              <Icon name="check-circle" size={24} color={colors.success} />
              <Text style={styles.successText}>Upload Successful</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  uploadArea: {
    margin: 20,
    padding: 40,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  uploadText: {
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    width: '50%',
  },
  progressContainer: {
    padding: 20,
    gap: 16,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successText: {
    color: colors.success,
    fontWeight: '600',
  },
});