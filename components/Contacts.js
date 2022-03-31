/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import React from 'react';
import ContactBox from './ContactBox';
import {useState, useEffect} from 'react';
import AddContact from './AddContact';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const {height, width} = Dimensions.get('screen');

export default function Contacts(props) {
  const [message, setMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const addScreen = () => {
    setShow(!show);
  };

  useEffect(() => {
    const userId = auth().currentUser.uid;

    database()
      .ref(`/User_Contacts/${userId}`)
      .on('value', snapshot => {
        const value = snapshot.val();
        if (value) {
          setData(Object.values(value));
          // console.log(data);
        } else {
          setMessage(true);
        }
      });
  }, []);

  const hide = {display: 'none'};

  return (
    <Modal
      style={styles.container}
      animationType="fade"
      onRequestClose={props.remove}>
      <View style={styles.bar}>
        <Text>Select Contact</Text>
      </View>

      {message && (
        <View>
          <View style={styles.addButton}>
            <Button color={'blue'} title="Add Contact" onPress={addScreen} />
          </View>
          <Text style={styles.message}>You have no Contacts</Text>
        </View>
      )}

      <ScrollView style={message ? hide : styles.contacts}>
        <View style={styles.addButton}>
          <Button color={'blue'} title="Add Contact" onPress={addScreen} />
        </View>

        {data &&
          data.map((item, index) => {
            return (
              <ContactBox
                contact={item.contact_name}
                number={item.contact_number}
                id={item.contact_id}
                show={props.chatShow}
                key={index}
              />
            );
          })}
      </ScrollView>

      {show && <AddContact remove={addScreen} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: width,
    height: height,
  },

  bar: {
    backgroundColor: 'green',
    width: width,
    alignItems: 'center',
    paddingVertical: 20,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  message: {
    alignSelf: 'center',
  },
});
