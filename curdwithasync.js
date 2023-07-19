import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Load todos from AsyncStorage when the component mounts
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('@todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.log('Error loading todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos));
    } catch (error) {
      console.log('Error saving todos:', error);
    }
  };

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: todoText }]);
      setTodoText('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    // Save todos to AsyncStorage whenever the todos state changes
    saveTodos();
  }, [todos]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => removeTodo(item.id)}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter a new todo"
      />
      <TouchableOpacity onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;
