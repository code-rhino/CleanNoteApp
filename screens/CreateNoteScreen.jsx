import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const CreateNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const rapidApiKey = '<Your-Api-Key>';

  async function checkForNegativeContent(text) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('text', text);
        const response = await axios.post('https://profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com/', encodedParams, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com'
            }
        });
        const semanticAnalysis = response.data.semantic_analysis;
        for (const key in semanticAnalysis) {
            if (semanticAnalysis.hasOwnProperty(key)) {
                const nameSemanticModel = semanticAnalysis[key].name_semantic_model.toLowerCase();
                if (negativeKeywords.some(keyword => nameSemanticModel.includes(keyword))) {
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        console.error(error);
        return true; 
    }
}


  const onSaveNote = () => {
    if (title.trim() !== '' && body.trim() !== '') {
        let cleanText = true;
        if(checkForNegativeContent(title) || checkForNegativeContent(body)){
            cleanText = false;
            console.log('Note contains negative semantic');
        }
        dispatch({
          type: 'ADD_NOTE',
          note: { title, body, id: Date.now().toString(), cleanText:cleanText } 
        });
        navigation.goBack(); 
      }
  };

  // Determine if the Save button should be disabled
  const isSaveDisabled = title.trim() === '' || body.trim() === '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Note</Text>
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#afadad"
        style={styles.titleInput}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        placeholderTextColor="#afadad"
        multiline
        style={styles.bodyInput}
      />
      <TouchableOpacity
        onPress={onSaveNote}
        style={[styles.saveButton, isSaveDisabled && styles.disabledSaveButton]}
        disabled={isSaveDisabled}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Existing styles remain unchanged
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141414',
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
    color: '#ff5c22',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  titleInput: {
    fontSize: 22,
    margin: 10,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  bodyInput: {
    fontSize: 16,
    margin: 10,
    color: '#fff',
    height: 150,
    textAlignVertical: 'top',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#ff5c22',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledSaveButton: {
    backgroundColor: '#a4a4a4', // A gray color to indicate the button is disabled
  },
});

export default CreateNoteScreen;
