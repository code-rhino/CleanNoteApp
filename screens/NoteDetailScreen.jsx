import React from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import { useDispatch } from 'react-redux';

const NoteDetail = ({ route, navigation }) => {
  const { note } = route.params;
  const dispatch = useDispatch();

  const onDeletePress = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
       { 
          text: "OK", 
          onPress: () => {
            dispatch({ type: 'DELETE_NOTE', id: note.id }); // Dispatch DELETE_NOTE action with note ID
            navigation.goBack(); // Optionally navigate back
          }
        }      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.body}>{note.body}</Text>

      <TouchableOpacity onPress={onDeletePress} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141414', // Matching the HomeScreen background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#ff5c22', // You can adjust the color
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff', // Matching the HomeScreen text color
  },
  title: {
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Matching the HomeScreen text color
  },
  body: {
    fontSize: 16,
    padding: 10,
    color: '#afadad', // Slightly lighter color for the body, similar to HomeScreen
  },
  deleteButton: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    backgroundColor: '#ff5c22', // Match the floating button style
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default NoteDetail;
