import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TaskItem = ({ task, onDelete, onComplete }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleCheckboxPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    onComplete();
  };

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxPress}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {task.completed ? (
            <MaterialIcons name="check-box" size={30} color="#FF4081" />
          ) : (
            <MaterialIcons name="check-box-outline-blank" size={30} color="#CCCCCC" />
          )}
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text style={[styles.taskText, task.completed && styles.completedText]}>
          {task.name}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 18,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#FF4081',
  },
  checkbox: {
    marginRight: 20,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingVertical: 5,
    paddingRight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: '#FF4081',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4081',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default TaskItem;
