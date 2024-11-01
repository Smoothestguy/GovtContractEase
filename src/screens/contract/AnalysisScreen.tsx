import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { PieChart } from '../../components/PieChart';

export const AnalysisScreen = ({ navigation }) => {
  const chartData = [
    { value: 75, color: colors.primary },
    { value: 25, color: colors.border },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Analysis</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.documentSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Original Document</Text>
            <Text style={styles.sectionDescription}>
              A detailed contract document outlining the terms of agreement between the involved parties...
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Simplified Version</Text>
            <Text style={styles.sectionDescription}>
              A simplified version of the contract, making it easier to understand for an 8th-grade level...
            </Text>
          </View>

          <View style={styles.chartContainer}>
            <PieChart data={chartData} />
          </View>

          <View style={styles.actionButtons}>
            <Button
              title="Save"
              variant="secondary"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Share"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
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
  card: {
    margin: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  documentSection: {
    padding: 20,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  sectionDescription: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
});