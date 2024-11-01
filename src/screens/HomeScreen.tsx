import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { ProgressCard } from '../components/ProgressCard';

export const HomeScreen = ({ navigation }) => {
  const categories = [
    {
      id: 'contracts',
      title: 'Contracts',
      count: 5,
      icon: 'file-document',
      action: 'View All',
      onPress: () => navigation.navigate('Contracts'),
    },
    {
      id: 'generate',
      title: 'Generate',
      count: 2,
      icon: 'file-plus',
      action: 'Submit',
      onPress: () => navigation.navigate('Generate'),
    },
    {
      id: 'bids',
      title: 'Contract Bids',
      count: 9,
      icon: 'gavel',
      action: 'Review',
      onPress: () => navigation.navigate('Bids'),
    },
    {
      id: 'urgent',
      title: 'Urgent Tasks',
      count: 5,
      icon: 'alert-circle',
      action: 'View',
      onPress: () => navigation.navigate('Tasks'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>ContractEase</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.actionButtons}>
        <Button 
          title="Upload" 
          onPress={() => navigation.navigate('Contracts', { screen: 'Upload' })}
          style={styles.actionButton}
        />
        <Button 
          title="Analysis" 
          onPress={() => navigation.navigate('Contracts', { screen: 'Analysis' })}
          style={styles.actionButton}
        />
      </View>

      <ProgressCard
        progress={76}
        title="Your Progress Today"
        subtitle="Track your daily contract tasks here"
      />

      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Contract Categories</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              count={category.count}
              icon={category.icon}
              action={category.action}
              onPress={category.onPress}
            />
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  categories: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});