/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TextInput, Button, Modal} from 'react-native';
import React from 'react';
import {useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function AddContact(props) {
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);

  const addContact = () => {
    const userId = auth().currentUser.uid;

    if (!number && !name) {
      console.log('Fill out all the fields to add a contact');
      return;
    }

    database()
      .ref(`/Users/${number}`)
      .on('value', snapshot => {
        const contact = snapshot.val();
        if (contact) {
          database().ref(`/User_Contacts/${userId}/${number}`).set({
            contact_name: name,
            contact_id: contact,
            contact_number: number,
          });

          console.log(`successfully added +${number} to Contacts`);
          return props.remove();
        } else {
          console.log(`there is no user of ${number}`);
          return;
        }
      });
  };

  return (
    <Modal animationType="slide" onRequestClose={props.remove}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Contact</Text>
        <View style={styles.form}>
          <View>
            <Text>Enter Name</Text>

            <TextInput
              maxLength={20}
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          <View>
            <Text>Enter Phone Number</Text>

            <TextInput
              keyboardType="phone-pad"
              onChangeText={text => setNumber(text)}
              value={number}
            />
          </View>

          <View style={styles.button}>
            <Button title="Add" onPress={addContact} />
          </View>
          <View style={styles.button}>
            <Button title="Back" onPress={props.remove} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    marginTop: 80,
    fontSize: 30,
  },
  form: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
  },

  button: {
    marginVertical: 10,
  },
});
