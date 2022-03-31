/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import Menubar from './components/Menubar';
import ChatBox from './components/Chat-box';
import StatusPage from './components/Status-page';
import Archives from './components/Archives';
import Chat from './components/Chat';
import PhoneAuth from './screens/Phone_auth';
import Multi_Button from './components/Multi-Button';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Contacts from './components/Contacts';
import Welcome from './screens/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [remove, setRemove] = useState(false);

  //%% test %%//
  // const clearData = () => {
  //   AsyncStorage.getAllKeys()
  //     .then(keys => AsyncStorage.multiRemove(keys))
  //     .then(() => console.log(`success`));
  // };

  // clearData();

  const handleRemove = () => {
    setRemove(!remove);
  };

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const iconObj = {
    0: 'md-chatbox-ellipses-sharp',
    1: 'camera',
    2: 'add-ic-call',
  };

  const buttonIcon = iconObj[index];

  const handleShow = () => {
    setShow(!show);
  };

  const [chatArr, setChatArr] = useState(null);

  useEffect(() => {
    const userId = auth().currentUser.uid;

    database()
      .ref(`/User_Chat/${userId}/`)
      .on('value', snapshot => {
        const data = Object.keys(snapshot.val());
        database()
          .ref(`/User_Contacts/${userId}/`)
          .on('value', element => {
            if (!element) {
              return;
            }
            const arr = Object.values(element.val());
            setChatArr(arr);
          });
      });
  }, [chatArr]);

  useEffect(() => {
    const userId = auth().currentUser.uid;
    const reference = database().ref(`/online/${userId}`);
    reference.set(true).then(() => console.log('Online presence set'));

    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" />
      <Welcome />
      <Menubar />
      <PhoneAuth />
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'lightgreen',
          height: 3,
        }}
        backgroundColor="green">
        <Tab.Item
          title="Chats"
          titleStyle={{
            fontSize: 12,
            color: index !== 0 ? 'white' : 'lightgreen',
          }}
        />
        <Tab.Item
          title="Status"
          titleStyle={{
            fontSize: 12,
            color: index !== 1 ? 'white' : 'lightgreen',
          }}
        />
        <Tab.Item
          title="Calls"
          titleStyle={{
            fontSize: 12,
            color: index !== 2 ? 'white' : 'lightgreen',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%'}}>
          <ScrollView style={styles.scrollView}>
            <Archives />
            {chatArr &&
              chatArr.map((item, idx) => {
                return (
                  <ChatBox
                    key={idx}
                    id={item.contact_id}
                    name={item.contact_name}
                    show={handleShow}
                  />
                );
              })}
          </ScrollView>
        </TabView.Item>

        <TabView.Item style={{backgroundColor: 'whitesmoke', width: '100%'}}>
          <StatusPage />
        </TabView.Item>

        <TabView.Item style={{backgroundColor: 'whitesmoke', width: '100%'}} />
      </TabView>

      {/* Multi-button and its screens */}
      <Multi_Button show={handleRemove} index={index} icon={buttonIcon} />
      {remove && <Contacts remove={handleRemove} chatShow={handleShow} />}

      {show && <Chat show={handleShow} var={show} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    width: '100%',
    height: '100%',
  },

  scrollView: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  button: {
    position: 'absolute',
    bottom: '3%',
    right: '7%',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    transform: [{scaleX: -1}],
  },
});
