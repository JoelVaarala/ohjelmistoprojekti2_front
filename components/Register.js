import React from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import RadioGroup from 'react-native-radio-button-group';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles';


export default function Register({ navigation }) {

    const [kayttajaTiedot, setKayttajaTiedot] = React.useState({ email: '', password: '', age: '', displayName: '', gender: '' });
    const [naytasalasana, setNaytaSalasana] = React.useState(true);
    const [salasanaIcon, setSalasanaIcon] = React.useState('eye');
    const [date, setDate] = React.useState(Date.now());

    //tällä muutetaan valitun syntymäajan päivämäärä unix ajaksi
    React.useEffect(() => {
        let unixIka = Math.floor(date / 1000);
        inputChanged('age', unixIka);
    }, [date]);

    //sukupuolen radiobutton valinnat
    const genderOptions = [
        { id: 'male', label: 'Mies' },
        { id: 'female', label: 'Nainen' },
        { id: 'other', label: 'Muu' }
    ];

    function inputChanged(inputName, inputValue) {
        setKayttajaTiedot({ ...kayttajaTiedot, [inputName]: inputValue });
    }

    //funkkari näyttämään/piilottamaan salasana inputkentässä 
    function naytasalasanaVaihto() {
        if (naytasalasana) {
            setNaytaSalasana(false);
            setSalasanaIcon('eye-with-line')
        } else {
            setNaytaSalasana(true);
            setSalasanaIcon('eye');
        }
    }

    //salasanainputin iconi
    function iconi() {
        return (
            <Entypo
                name={salasanaIcon}
                size={30}
                onPress={() => naytasalasanaVaihto()} />
        )
    }

    //lähetetään rekisteröinti tiedot backiin, joka luo uuden käyttäjän ja tälle tarvittavat documentit yms.
    function registerUser() {
        let url = global.url + 'register';
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(kayttajaTiedot)
            }
        )
            .then(response => response.json())
            .then(res => {
                console.log(res.result);
            })
            //tämä testiä varten
            .then(_ => {
                setKayttajaTiedot({ email: '', password: '', age: '', displayName: '', gender: '' });
                setDate(Date.now());

            })
            .catch(err => console.error(err))
    }

    function testi() {
        navigation.goba
    }
    //TODO
    //labelStyle inputeissa ja itsetehdyt Text "lablet" samalla tyylillä tulevaisuudessa jostain StyleSheatista
    //muuta css hömpötystä
    //salasanalle checki, onko vähintään 6 merkkiä
    //sähköpostile checki, onko legit syntaxi
    return (
        <ScrollView style={styles.registerScrollView}>
            <Text h4 style={styles.registerText}>Luo käyttäjä</Text>
            <Input
                label="Sähköposti"
                placeholder="Sähköposti"
                onChangeText={value => inputChanged('email', value)}
                value={kayttajaTiedot.email}
            />
            <Input
                label="Salasana"
                placeholder="Vähintään 6 merkkiä"
                secureTextEntry={naytasalasana}
                onChangeText={value => inputChanged('password', value)}
                value={kayttajaTiedot.password}
                rightIcon={iconi}
            />
            <Input
                label="Nimi"
                placeholder="Matti Matikainen"
                onChangeText={value => inputChanged('displayName', value)}
                value={kayttajaTiedot.displayName}
            />

            <View style={styles.registerBirthdayMarginLeft}>
                <Text  //jos on joku parempi label systeemi, saa muuttaa tämän
                    style={styles.registerBirthdayText}
                >Syntymä aika</Text>

                <DatePicker
                    style={styles.registerDatePicker}
                    date={date}
                    onDateChange={value => setDate(value)}
                    mode="date"
                    locale="fi"
                />
            </View>

            <View style={styles.registerGenderStyle}>
                <Text  //jos on joku parempi label systeemi, saa muuttaa tämän
                    style={styles.registerGenderText}
                >Sukupuoli</Text>

                <RadioGroup // muuta setWidthHeight 'useNativeDriver: true' falseksi node moduulissa react-native-radio-button-group/lib/Circle.js, muuten tulee errori: Style property 'height' is not supported by native animated module
                    horizontal
                    options={genderOptions}
                    onChange={(value) => inputChanged('gender', value.id)}
                // circleStyle={{  // tällä voi muutella radiopylpyrän tyyliä
                //     width: 22,
                //     height: 22,
                //     borderColor: '#000',
                //     borderWidth: 0.8,
                //     marginRight: 10,
                //     fillColor: '#279315'
                // }}
                />
            </View>
            <Button
                onPress={() => registerUser()}
                title="Luo käyttäjä"
                containerStyle={styles.registerUserButton}
            />
        </ScrollView>
    );
}