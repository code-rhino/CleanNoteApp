import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

const NoteCard = ({note, onPress}) => {
  const containerStyle = {
    ...styles.card,
    backgroundColor: note.cleanText ? 'green' : 'tomato', // Default to 'tomato' red if 'cleanText' is false or undefined
  };
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{note?.title}</Text>
        {/* Conditional rendering based on cleanText */}
        {note.cleanText === false ? (
          <Text style={styles.warning}>This note has offensive language, open with caution.</Text>
        ) : (
          <Text numberOfLines={5} style={styles.body}>{note?.body}</Text>
        )}
      </View>
    </Pressable>
  );
}

export default NoteCard;

const styles = StyleSheet.create({
    cardContent:{
      width:'100%',
      height:'99%',
      borderTopLeftRadius: 5, // Round only the top-left corner
      borderTopRightRadius: 5, // Round only the top-right corner
      backgroundColor: '#2e2e2e',
      padding: 10,
    },
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        elevation: 5,
        height: 200,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    body: {
      fontSize: 14,
      color: '#afadad',
    },
    warning: {
      fontSize: 14,
      paddingTop:5,
      color: '#ffcc00', // Yellow color for caution
    },  
});