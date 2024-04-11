import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const UserProfileScreen = ({ navigation }) => {
  
  const savedName = useSelector(state => state.user.name);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedName) {
      setName(savedName); // Initialize the input field with the saved name if it exists
    }
  }, [savedName]);

  const onSaveName = () => {
    if (name.trim() !== '') {
      dispatch({
        type: 'SAVE_NAME',
        name: name.trim()
      });
      navigation.goBack(); 
    }
  };

  const isSaveDisabled = name.trim() === '';

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#afadad"
        style={styles.input}
      />
      <TouchableOpacity
        onPress={onSaveName}
        style={[styles.saveButton, isSaveDisabled && styles.disabledSaveButton]}
        disabled={isSaveDisabled}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center', // Align children horizontally in the middle
    justifyContent: 'center', // Align children vertically in the middle
  },
  input: {
    fontSize: 18,
    margin: 20,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '80%', // You might want to limit the width of the input field
  },
  saveButton: {
    backgroundColor: '#ff5c22',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignItems: 'center',
    width: '80%', // Match the width of the input field for consistency
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledSaveButton: {
    backgroundColor: '#a4a4a4',
  },
});

export default UserProfileScreen;
