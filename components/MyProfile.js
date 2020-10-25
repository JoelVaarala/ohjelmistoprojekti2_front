import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
const MyProfile = ({ navigation }) => {
  console.log('navigation: ');
  console.log(navigation);
  const [state, setState] = useState({
    picPath: 'https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg',
    name: 'Michael',
    age: 26
  });

  const addImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setState((state) => ({ ...state, picPath: source.uri }));
      }
    });
  };

  const { name, age, picPath } = state;
  return (
    <View style={[styles.flexOne, styles.backgroundBlack]}>
      <View style={styles.myProfileAvatarContainer}>
        <Avatar onPress={() => navigation.navigate('FullProfile')} size="xlarge" rounded source={{ uri: picPath }} />
        <Text style={{ fontSize: 20, top: 5, color: 'black' }}>
          {name}, {age}
        </Text>
      </View>
      <View style={styles.iconSpacing}>
        <View>
          <Icon onPress={() => navigation.navigate('Settings')} size={28} reverse name="settings" />
        </View>
        <View>
          <Icon size={28} reverse name="image" onPress={() => addImage()} />
        </View>
        <View>
          <Icon onPress={() => navigation.navigate('EditProfile')} size={28} reverse name="edit" />
        </View>
      </View>
      <View style={styles.saveButton}>
        <Button color="black" onPress={() => navigation.navigate('Add_Event')} title="add event" />
      </View>
    </View>
  );
};

export default MyProfile;
