/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Profile from './Profile';

export default function Menubar() {
  const [searchVal, setSearchVal] = useState('');
  const [handleChange, setHandle] = useState(false);

  const showSearch = () => {
    setHandle(!handleChange);
  };

  const [remove, setRemove] = useState(false);

  const handleRemove = () => {
    setRemove(!remove);
  };

  return (
    <View>
      {remove && <Profile remove={handleRemove} />}
      <View style={Styles.container}>
        <Text style={Styles.logo}>ChatApp</Text>

        <View style={Styles.buttons}>
          <Icon
            size={35}
            name="search-circle-sharp"
            onPress={showSearch}
            style={handleChange && {display: 'none'}}
          />

          <Icon2
            size={24}
            name="options-vertical"
            style={Styles.options}
            onPress={handleRemove}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'green',
          width: '100%',
          paddingHorizontal: 10,
        }}>
        {handleChange && (
          <SearchBar
            style={Styles.search}
            onChangeText={text => setSearchVal(text)}
            value={searchVal}
            placeholder="Search..."
            onCancel={showSearch}
            onBlur={showSearch}
            autoFocus
          />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'green',
  },

  logo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttons: {
    width: '79%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  search: {
    paddingHorizontal: 5,
    fontSize: 15,
  },

  options: {
    marginLeft: '4%',
    top: 5,
    bottom: 5,
  },

  clear: {
    position: 'absolute',
    right: '5%',
  },
});
