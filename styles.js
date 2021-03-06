import { StyleSheet } from 'react-native';

const backgroundTheme = 'black';
const textColor = 'orange';
const logInBackgroundColor = '#F2F2F2'; //HEX Vaalean harmaa väri
const datePickerBackgroundColor = 'white';
const textAreaBackground = 'white';
const inputTextColor = 'black';
const swipeCardTextColor = 'white';
const tagBoxBackgroundColor = 'black';
const tagBoxBorderColor = 'orange';
const addEventTextboxUnderline = 'grey';
const matchesBackgroundColor = '#F2F2F2'; //HEX Vaalean harmaa väri
const buttonColor = 'orange';
const buttonTextColor = 'black';

global.myTheme = {
  dark: true,
  colors: {
    primary: textColor, // NavIconin alapuolella oleva viiva
    background: logInBackgroundColor, //log in sivulla näkyvä taustaväri
    card: backgroundTheme, //NavIconien ympärillä oleva tausta
    text: textColor, //Screenien otsikon väri
    notification: 'rgb(255, 69, 58)' // punainen väri
  }
};

global.navIconColor = (focused) => (focused ? textColor : 'gray'); //NavBar iconien aktiivi ja passiivi värit
global.navBarTintColor = textColor;

global.checkBoxColor = () => ({ true: buttonColor }); //checkboxin väri

global.buttonColor = buttonColor; //musta taustavärien buttonien värit
global.buttonTitleColor = buttonTextColor; //musta taustavärien buttonien värit

global.rangerSliderColor = '#FFA500'; // HEX color = orange

global.viewLikersIconButton1 = 'lightgreen';
global.viewLikersIconButton2 = 'red';

global.swipesPageButtonGroupColor = {
  colors: {
    primary: buttonColor
  }
};

export default StyleSheet.create({
  //backgrounds
  background: {
    backgroundColor: backgroundTheme
  },
  carouselBackground: {
    backgroundColor: 'floralwhite',
    flex: 1
  },

  addEventDatePickerBackground: {
    backgroundColor: datePickerBackgroundColor
  },
  //title and text
  buttonContainer: {
    color: buttonColor
  },
  title: {
    fontSize: 18,
    color: textColor
  },
  registerUserTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  myProfileUserText: {
    fontSize: 20,
    color: textColor
  },
  checkboxText: {
    fontSize: 14,
    color: textColor,
    marginTop: 5
  },
  addEventPreviewText: {
    fontSize: 14,
    color: textColor
  },
  matchesName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  matchesBackground: {
    //Greyish
    backgroundColor: matchesBackgroundColor
  },
  registerUserText: {
    color: inputTextColor,
    fontSize: 16,
    fontWeight: 'bold'
  },
  //buttons
  buttonGroupBorderColor: {
    borderColor: tagBoxBorderColor
  },
  buttonGroupInnerlineColor: {
    color: tagBoxBorderColor
  },

  buttonTitleColor: {
    color: buttonTextColor
  },
  previewButtonStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  registerUserButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80
  },
  saveButton: {
    flex: 1,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 20
  },
  viewLikersbutton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  viewLikersTextColor: {
    color: textColor
  },
  //Tagbox color and size
  tagBox: {
    padding: 6,
    fontSize: 16,
    color: textColor,
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: tagBoxBackgroundColor,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: tagBoxBorderColor
  },
  //Containers
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  justifyContentFlexStart: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    position: 'absolute',
    top: -75,
    left: 15,
    right: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  //fontFamily
  textGreyRoboto: {
    color: 'grey',
    fontFamily: 'roboto'
  },

  fontRoboto: {
    fontFamily: 'roboto'
  },

  //flexDirection

  flexDirectionRow: {
    flexDirection: 'row'
  },
  //viewLikersItemContent
  viewLikersItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  //no more cards
  noMoreCardsContent: {
    flex: 1,
    justifyContent: 'center'
  },

  //images
  //card bottom shadow
  shadowImage: {
    height: 400,
    width: 300,
    bottom: 0,
    right: 15,
    opacity: 0.9,
    borderRadius: 5
  },
  imageSize: {
    width: '100%',
    height: '100%'
  },
  //height & width
  heightForty: {
    height: 40
  },
  viewLikersPickerSize: {
    height: 50,
    width: 150
  },
  //Space between icons
  iconSpacing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 20
  },

  //alignSelfCenter

  alignSelfCenter: {
    alignSelf: 'center'
  },

  //justifyContent

  justifyContentSpaceBetween: {
    justifyContent: 'space-between'
  },

  //fontSize
  userTextStyle: {
    fontSize: 40,
    color: textColor
  },
  noMoreCardsText: {
    fontSize: 22
  },
  swipesUserInfo: {
    fontSize: 18,
    color: swipeCardTextColor
  },
  eventInfoBio: {
    fontSize: 12,
    color: swipeCardTextColor
  },
  //opacity
  opacityOne: {
    opacity: 1
  },

  addEventTextbox: {
    height: 40,
    width: 200,
    borderBottomColor: addEventTextboxUnderline,
    borderBottomWidth: 1,
    color: textColor
  },

  //textInput
  addTagInputBox: {
    height: 40,
    width: 200,
    backgroundColor: textAreaBackground,
    color: inputTextColor,
    borderRadius: 4
  },
  editProfileBioTextArea: {
    height: 90,
    width: 500,
    backgroundColor: textAreaBackground,
    color: textColor,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6
  },

  //radioInput
  /* 
    registerRadioGroup: {
        width: 22,
        height: 22,
        borderColor: '#000',
        borderWidth: 0.8,
        marginRight: 10,
        fillColor: '#279315'
    },
    */

  //rangerSlider size
  rangerSliderSize: {
    width: 250,
    height: 60
  },
  //paddingHorizontal
  paddingHorizontalTen: {
    paddingHorizontal: 10
  },
  //card things

  //Card size
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 345,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    bottom: 20
  },
  carouselSafeAreaView: {
    flex: 1,
    paddingTop: 0
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  carouselImageSize: {
    height: '50%',
    width: '50%'
  },
  chatStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: backgroundTheme
  },

  //___________________________________________________________________________________________________
  //EditProfile

  editProfileTextArea: {
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    fontSize: 15
  },
  editProfileText: {
    fontSize: 23,
    marginTop: 15,
    paddingBottom: 1,
    color: inputTextColor
  },

  omatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 80
  },
  //input for tagbox
  tagTextInput: {
    height: 40,
    width: 200,
    backgroundColor: textAreaBackground,
    color: inputTextColor,
    borderRadius: 6
  },
  opacityOne: {
    opacity: 1
  },
  myProfileAvatarContainer: {
    marginTop: 15,
    alignItems: 'center'
  },

  iconSpacing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 20
  },

  /* 
registerRadioGroup: {
      width: 22,
      height: 22,
      borderColor: '#000',
      borderWidth: 0.8,
      marginRight: 10,
      fillColor: '#279315'
},
*/

  //alignItem

  alignItemsCenter: {
    flex: 1,
    alignItems: 'center'
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end'
  },

  //flex

  flexOne: {
    flex: 1
  },
  flexThree: {
    flex: 3
  },

  //margin
  marginLeftTen: {
    marginLeft: 10
  },
  marginLeftTwenty: {
    marginLeft: 20
  },
  marginTopTen: {
    marginTop: 10
  },
  MarginTopTwenty: {
    marginTop: 20
  },
  marginTopThirty: {
    marginTop: 30
  },
  marginTopFifty: {
    marginTop: 50
  },
  marginBottomForty: {
    marginBottom: 40
  },
  marginLeftRightTen: {
    marginLeft: 10,
    marginRight: 10
  },
  swipesUserInfosContainer: {
    marginTop: -65
  },
  //padding
  paddingTopTen: {
    paddingTop: 10
  },
  paddingTopFifty: {
    paddingTop: 50
  },
  paddingTopHundred: {
    paddingTop: 100
  },
  paddingBottomFifty: {
    paddingBottom: 50
  },
  iconsPadding: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  // Event modal
  mapView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  viewFirst: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 },
  viewSecond: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  viewThird: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    width: '80%',
    height: '75%',
    alignItems: 'center',
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: 'orange',
    overflow: 'hidden'
  },
  touchableHigh: {
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'yellow',
    alignSelf: 'center',
    padding: 6,
    margin: 6,
    borderRadius: 20,
    paddingLeft: 9,
    paddingRight: 9
  },
  modalTextinput: {
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: 'orange'
  }
});
