import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../componets/TaskItem';       
import { MaterialIcons } from '@expo/vector-icons';

const TaskScreen = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const day = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      setCurrentTime(time);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const addTask = () => {
    if (task.trim() === '') return;
    const now = new Date();
    const taskDate = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    setTaskList([...taskList, { id: Date.now().toString(), name: task, completed: false, dateAdded: taskDate }]);
    setTask('');
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTaskList(taskList.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDay}</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>
      <Text style={styles.title}>Daftar Kegiatan</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tambahkan kegiatan baru..."
          placeholderTextColor="#999"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      {taskList.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada kegiatan. Tambahkan sekarang!</Text>
      ) : (
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => deleteTask(item.id)}
              onComplete={() => toggleComplete(item.id)}
              dateAdded={item.dateAdded}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  header: {
    marginTop: 20,
    marginBottom: 14,
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    color: '#388E3C',
    fontWeight: '500',
    marginBottom: 5,
  },
  time: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#388E3C',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});

export default TaskScreen;
