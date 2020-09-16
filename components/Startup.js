//import { auth } from 'firebase-admin';
import React from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import './Globaalit';


export default function Startup(props) {
    
    const [kayttaja, setKayttaja] = React.useState('user@example.com');
    const [salasana, setSalasana] = React.useState('secretPassword');
    const [msg, setMsg] = React.useState('');
    const [isRegisterScreen, setIsRegisterScreen] = React.useState(true);
  const [vaihto, setVaihto] = React.useState(true);

    global.fbtoken ="";

    React.useEffect(() => {
       yritaKirjautua();
    }, []);


    //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
    //hakee käyttäjän webbtokenin jota tarvitaan kun lähetetään viestejä, swipejä tms backendpalvelimelle.
    function testausta()
    {

      auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
        tallennaToken(idToken); //tallennetaan asyncciin, voitas kyl tallentaa vaikka globaliin myös? 
      }).catch(function(error) {
        // Handle error
      });
    }



    const yritaKirjautua = async () => {
        try {
          let value = await AsyncStorage.getItem('kirjautumisTiedot');
          console.log('asyncista tullut:' + value);
          if (value != null) {
              
              global.fbtoken = value;
              setIsRegisterScreen(false);
            // setVaihto(false);
           // onkoTokenVanhentunut(value);
          } else {
            //setVaihto(true);
          }
        } catch (error) {
          console.log(error);
         
        }
      }
    

    const login = () => {
        auth()
        .signInWithEmailAndPassword(kayttaja, salasana)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
        //auth().
        // console.log(url);
    }

    const tallennaToken = async (data) => {
        try {
            await AsyncStorage.setItem('tokenKey', data);
            props.onkoToken();
            } catch (error) {
            console.log('Async error: ' + error);
            }
    }


    return (
        <View>
            <Input
                containerStyle={{ paddingTop: 100 }}
                lable="Käyttäjätunnus"
                placeholder="Käyttäjätunnus"
                onChangeText={kayttaja => setKayttaja(kayttaja)}
                value={kayttaja}
            />
            <Input
                lable="Salasana"
                placeholder="Salasana"
                secureTextEntry={true}
                onChangeText={salasana => setSalasana(salasana)}
                value={salasana}
            />
            <Button
                onPress={login} title="Login"
                containerStyle={{ paddingHorizontal: 10 }}
            />
            <Text>{msg}</Text>

            <Button
                onPress={login} title="REKISTERÖIDY"
                containerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    );
}