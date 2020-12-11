import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import styles from '../styles';
import { connect } from 'react-redux';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function MyProfile({ navigation, route }) {
  const [userTiedot, setUserTiedot] = useState({
    age: 0,
    bio: '',
    name: '',
    pic: ''
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      HaeTiedot();
    });
    return unsubscribe;
  }, [navigation])

  const HaeTiedot = async () => {
    const ref = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    const doc = await ref.get();
    if (!doc.exists) {
      console.log('document not found');
    } else {
      console.log('success HERE HERE ::::', doc.data());
      setUserTiedot({
        age: doc.data().age,
        bio: doc.data().bio,
        name: doc.data().displayName,
        pic: doc.data().images[0]
      });
      console.log(doc.data());
    }
  };

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

  return (
    <View style={[styles.flexOne, styles.background]}>
      <View style={styles.myProfileAvatarContainer}>
        {userTiedot.pic ? (
          <Avatar size="xlarge" rounded source={{ uri: userTiedot.pic }} />
        ) : (
          //jos käyttäjällä ei ole kuvia, niin tulee tämä default pic
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
          />
        )}
        <Text style={styles.myProfileUserText}>
          {userTiedot.name}, {userTiedot.age}
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
        <Button
          buttonStyle={{ backgroundColor: buttonColor }}
          titleStyle={{ color: buttonTitleColor }}
          onPress={() => navigation.navigate('Add_Event')}
          title="Add event"
        />
      </View>
    </View>
  );
}
