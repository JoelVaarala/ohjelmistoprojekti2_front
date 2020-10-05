import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile() {

    const [count, setCount] = React.useState('')
    const onPress = () => setCount("KUVA AVAUTUU");

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
   
            </View>
            <View style={{ alignItems: 'center', flex: 8 }}>
                <Text value={{ count }} >{count}</Text>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg' }} style={{ width: 400, height: 400 }} />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={{ fontSize: 40 }}>Nimi Ikä</Text>
                <Text style={{ fontSize: 20 }}>Asdasdasdasdasdasdasd</Text>
                <Text style={{ fontSize: 20 }}>Asdasdasdasdasdasdasd</Text>

            </View>
            <View>
                <Text style={{ fontSize: 20 }}>Käyttäjän tägit:</Text>
                <Text style={{ fontSize: 20 }}>Asdasdasdasdasdasdasd</Text>
                <Text style={{ fontSize: 20 }}>Asdasdasdasdasdasdasd</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
