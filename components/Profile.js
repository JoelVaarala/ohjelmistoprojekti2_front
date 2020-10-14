import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Carousel from './Carousel';
import styles from '../styles';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile() {

    const [count, setCount] = React.useState('')
    const onPress = () => setCount("KUVA AVAUTUU");

    return (
        <View style={styles.profileContainer}>
            <View style={styles.alignItems}>
                <Carousel />
            </View>
            <View style={styles.profileFlexThree}>
            <Text style={styles.profileUserText}>{user.name}, {user.age}</Text>
                <Text style={styles.profileUserBio}>{user.bio}</Text>
            </View>
        </View>
    );
}
