import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

interface CategoryCardProps {
  title: string;
  count: number;
  icon: string;
  action: string;
  onPress: () => void;
}

export const CategoryCard = ({ title, count, icon, action, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Icon name={icon} size={24} color={colors.primary} />
        <View style={styles.avatarStack}>
          <View style={[styles.avatar, { right: 0 }]} />
          <View style={[styles.avatar, { right: 12 }]} />
          <View style={[styles.avatar, { right: 24 }]} />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.count}>{count} New Tasks</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Text style={styles.actionText}>{action}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarStack: {
    height: 24,
    width: 48,
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  content: {
    gap: 4,
  },
  count: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
});