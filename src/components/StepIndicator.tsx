import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepPress: (step: number) => void;
}

export const StepIndicator = ({ steps, currentStep, onStepPress }: StepIndicatorProps) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <View
                style={[
                  styles.connector,
                  isCompleted && styles.connectorCompleted,
                ]}
              />
            )}
            <TouchableOpacity
              onPress={() => onStepPress(index)}
              disabled={!isCompleted && !isActive}
            >
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.dot,
                    isActive && styles.dotActive,
                    isCompleted && styles.dotCompleted,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      (isActive || isCompleted) && styles.stepNumberActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepTitle,
                    (isActive || isCompleted) && styles.stepTitleActive,
                  ]}
                >
                  {step.title}
                </Text>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dotCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  connectorCompleted: {
    backgroundColor: colors.success,
  },
  stepNumber: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: colors.text,
  },
  stepTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  stepTitleActive: {
    color: colors.text,
  },
});