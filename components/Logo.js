import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Logo = () => {
  const { logoWrapper, textWrapper, hubWrapper, logoText, text } = styles;
  return (
    <View style={logoWrapper}>
      <View style={textWrapper}>
        <Text style={text}>Meet</Text>
      </View>
      <View style={hubWrapper}>
        <Text style={[text, { color: 'white' }]}>Hub</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    marginRight: 10
  },
  hubWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: 'black',
    borderRadius: 4
  },
  text: {
    fontSize: 50,
    color: 'black'
  }
});

export default Logo;
