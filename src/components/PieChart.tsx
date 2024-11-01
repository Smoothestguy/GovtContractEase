import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface PieChartData {
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export const PieChart = ({ data, size = 200 }: PieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const createPieSlice = (percentage: number, color: string) => {
    const angle = (percentage * 360) / 100;
    const x1 = Math.cos((Math.PI * startAngle) / 180);
    const y1 = Math.sin((Math.PI * startAngle) / 180);
    const x2 = Math.cos((Math.PI * (startAngle + angle)) / 180);
    const y2 = Math.sin((Math.PI * (startAngle + angle)) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    const path = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    startAngle += angle;
    return path;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="-1 -1 2 2">
        <G>
          {data.map((item, index) => (
            <Path
              key={index}
              d={createPieSlice((item.value / total) * 100, item.color)}
              fill={item.color}
            />
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
});