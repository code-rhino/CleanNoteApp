import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import NoteCard from '../components/NoteCard';
import { useSelector } from 'react-redux';


const HomeScreen = ({ navigation }) => {
    const savedName = useSelector(state => state.user.name);
    const onAddNote = () => {
      navigation.navigate('CreateNote')
    };
    const notes = useSelector(state => state.notes);
  
    const onSetUserName = () => {
      navigation.navigate('UserProfile'); // Make sure to replace 'UserProfileScreen' with the actual name of your user profile setting screen
    };
  
    return (
      <>
        <StatusBar barStyle="light-content" /> 
        <SafeAreaView style={styles.container}>
          {savedName ? (
            <TouchableOpacity onPress={onSetUserName} style={styles.header}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{savedName.charAt(0)}</Text>
              </View>
              <Text style={styles.welcomeText}>Welcome {savedName}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSetUserName} style={styles.setNamePromptContainer}>
              <Text style={styles.setNamePromptText}>Please Click to Set User Profile Name</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={notes}
            renderItem={({ item }) => <NoteCard note={item} onPress={() => navigation.navigate('NoteDetail', { note: item })} />}
            keyExtractor={item => item.id}
            numColumns={2}
            ListEmptyComponent={() => (
              <View style={styles.emptyList}>
                <Text style={styles.emptyText}>No Saved Notes</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={onAddNote}
            style={styles.floatingButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
  
  export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      backgroundColor: '#141414',
    },
    setNamePromptContainer: {
        padding: 20, // Add padding for better touch area
        justifyContent: 'center',
        alignItems: 'center',
      },
      setNamePromptText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    floatingButton: {
      position: 'absolute',
      bottom: 60,
      right: 40,
      width: 60,
      height: 60,
      backgroundColor: '#ff5c22', // You can choose your own color
      borderRadius: 30,
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
    buttonText: {
      fontSize: 30,
      color: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ff5c22',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    avatarText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    welcomeText: {
      color: '#fff',
      fontSize: 18,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyText: {
        fontSize: 18,
        color: '#fff',
      },
  });
  