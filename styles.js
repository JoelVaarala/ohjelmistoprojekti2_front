import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //Containers
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerFlexStart: {
    flex: 1,
    justifyContent: "flex-start",
  },
  containerAlignItemsCenter: {
    flex: 1,
    alignItems: "center",
  },
  containerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    position: "absolute",
    top: -75,
    left: 15,
    right: 150,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  carouselContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  myProfileAvatarContainer: {
    marginTop: 15,
    alignItems: "center",
  },

  //flex

  flexOne: {
    flex: 1,
  },
  flexThree: {
    flex: 3,
  },

  //fontFamily
  textGreyRoboto: {
    color: "grey",
    fontFamily: "roboto",
  },

  fontRoboto: {
    fontFamily: "roboto",
  },

  //flexDirection

  flexDirectionRow: {
    flexDirection: "row",
  },

  //Chat

  chatStyle: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "black",
  },

  //viewLikersItemContent
  viewLikersItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //title
  registerTitleStyle: {
    color: "grey",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  //carousel

  carouselSafeAreaView: {
    flex: 1,
    paddingTop: 0,
  },

  //no more cards

  noMoreCardsContent: {
    flex: 1,
    justifyContent: "center",
  },

  //image styling

  //Card bottom shadow thingy
  darkishStyle: {
    height: 400,
    width: 350,
    bottom: -100,
    right: 15,
    opacity: 0.9,
    borderRadius: 5,
  },

  matchesImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  imageSize: {
    width: "100%",
    height: "100%",
  },

  //buttons

  previewButtonStyle: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  registerUserButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80,
  },
  saveButton: {
    flex: 1,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 20,
  },
  viewLikersbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },

  //backgroundcolors

  backgroundBlack: {
    backgroundColor: "white",
  },
  carouselBackgroundFloralWhite: {
    backgroundColor: "floralwhite",
    flex: 1,
  },
  matchesBackgroundColor: {
    backgroundColor: "rgba(255,154,0,0)",
  },

  //height & width
  heightForty: {
    height: 40,
  },
  viewLikersPickerSize: {
    height: 50,
    width: 150,
  },
  //Space between icons
  iconSpacing: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    top: 20,
  },

  //alignSelfCenter

  alignSelfCenter: {
    alignSelf: "center",
  },

  //scrollView
  addEventScrollView: {
    flex: 1,
    marginTop: 22,
  },

  //alignItems

  alignItemsFlexEnd: {
    alignItems: "flex-end",
  },

  //justifyContent

  justifyContentSpaceBetween: {
    justifyContent: "space-between",
  },

  //fontSize
  userTextStyle: {
    fontSize: 40,
    color: "black",
  },
  userBioStyle: {
    fontSize: 20,
    color: "black",
  },
  fontSizeTwenty: {
    fontSize: 20,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  eventInfo: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  eventInfoBio: {
    fontSize: 12,
    color: "black",
  },
  editProfileText: {
    fontSize: 20,
    paddingTop: 2,
    paddingBottom: 1,
  },
  textOrangeBold: {
    color: "black",
    fontWeight: "bold",
  },
  textWhite: {
    color: "black",
  },
  textBold: {
    fontWeight: "bold",
  },

  //tagBox

  tagBox: {
    padding: 6,
    fontSize: 16,
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: "black",
    borderRadius: 6,
  },

  //opacity
  opacityOne: {
    opacity: 1,
  },

  //textbox things
  eventTextbox: {
    height: 40,
    width: 200,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },

  //textInput
  tagTextInput: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    color: "black",
  },
  addTagInputBox: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },

  //textArea

  editProfileTextArea: {
    textAlignVertical: "top",
    alignSelf: "stretch",
    fontSize: 15,
  },
  editProfileTextAreaContainer: {
    height: 90,
    width: 500,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
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

  //rangerSlider
  settingsRangerSlider: {
    width: 250,
    height: 60,
  },

  //paddingHorizontal
  paddingHorizontalTen: {
    paddingHorizontal: 10,
  },

  //card things
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 445,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    bottom: 20,
  },

  //logo
  matchesLogo: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    width: 400,
    height: 50,
    padding: "15%",
  },

  //margin

  eventAddMargin: {
    marginLeft: 10,
    marginRight: 10,
  },

  //___________________________________________________________________________________________________
  //SwipingPage

  //Icons location at bottom of the screen
  iconLocation: {
    flex: 1,
    justifyContent: "flex-start",
  },

  //Space between icons
  iconSpacebetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  //Padding between icons
  iconPadding: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  //Mikä buttoni tää on?!?
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },

  //___________________________________________________________________________________________________
  //Add_Event

  addEventScrollView: {
    flex: 1,
    marginTop: 22,
  },

  eventAddMargin: {
    marginLeft: 10,
    marginRight: 10,
  },
  eventHeaders: {
    fontWeight: "bold",
    marginTop: 10,
  },
  eventTextbox: {
    height: 40,
    width: 200,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },

  //___________________________________________________________________________________________________
  //Carousel

  carouselSafeAreaView: {
    flex: 1,
    paddingTop: 0,
  },

  carouselContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  imageSize: {
    width: "100%",
    height: "100%",
  },

  carouselBackgroundFloralWhite: {
    backgroundColor: "floralwhite",
    flex: 1,
  },

  //___________________________________________________________________________________________________
  //Chat

  chatStyle: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
  },

  //___________________________________________________________________________________________________
  //EditProfile

  editProfileTextArea: {
    textAlignVertical: "top",
    alignSelf: "stretch",
    fontSize: 15,
  },
  editProfileText: {
    fontSize: 20,
    paddingTop: 2,
    paddingBottom: 1,
    color: "black",
  },

  omatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: "flex-start",
    paddingLeft: 80,
  },

  tagTextInput: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
  },

  //ei käytössä?
  matchesButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  matchesImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  matchesLogo: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    width: 400,
    height: 50,
    padding: "15%",
  },

  matchMessage: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    fontFamily: "roboto",
  },

  matchContainerBackground: {
    backgroundColor: "rgba(255,154,0,0)",
  },

  opacityOne: {
    opacity: 1,
  },

  listItemTitleStyle: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "roboto",
  },

  listItemSubtitleStyle: {
    color: "gray",
    fontFamily: "roboto",
  },

  matchesTextStyle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    fontFamily: "roboto",
  },

  avatarRoundedBackground: {
    backgroundColor: "rgba(255,154,0,0)",
  },

  //___________________________________________________________________________________________________
  //MyProfile

  myProfileAvatarContainer: {
    marginTop: 15,
    alignItems: "center",
  },

  iconSpacing: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    top: 20,
  },

  //___________________________________________________________________________________________________
  //Register

  registerScrollView: {
    flex: 1,
    paddingTop: 20,
  },

  registerText: {
    alignSelf: "center",
  },

  registerBirthdayMarginLeft: {
    marginLeft: "10",
  },

  registerTitleStyle: {
    color: "grey",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  registerDatePicker: {
    alignSelf: "center",
  },

  registerGenderStyle: {
    marginLeft: 10,
    paddingTop: 10,
  },

  registerGenderText: {
    color: "grey",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  registerUserButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80,
  },

  heightForty: {
    height: 40,
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

  //___________________________________________________________________________________________________
  //Settings
  tagBox: {
    padding: 6,
    fontSize: 16,
    color: "black",
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
  },

  settingsRangerSlider: {
    width: 250,
    height: 60,
  },

  //___________________________________________________________________________________________________
  //Startup

  StartupUsername: {
    paddingTop: 100,
  },

  paddingHorizontalTen: {
    paddingHorizontal: 10,
  },

  //___________________________________________________________________________________________________
  //Startup

  viewLikersbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  viewLikersPicker: {
    //flex: 1,
    // paddingTop: 0,
    alignItems: "center",
  },

  viewLikersPickerSize: {
    height: 50,
    width: 150,
  },

  viewLikersSwipedFontSize: {
    fontSize: 20,
  },

  viewLikersItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  viewLikersButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },

  //});

  marginLeftTen: {
    marginLeft: 10,
  },
  marginLeftTwenty: {
    marginLeft: 20,
  },
  marginTopTen: {
    marginTop: 10,
  },
  marginTopThirty: {
    marginTop: 30,
  },
  marginTopFifty: {
    marginTop: 50,
  },
  marginBottomForty: {
    marginBottom: 40,
  },
  orangeMarginTopFive: {
    color: "black",
    marginTop: 5,
  },

  //padding
  paddingTopTen: {
    paddingTop: 10,
  },
  paddingTopFifty: {
    paddingTop: 50,
  },
  paddingTopHundred: {
    paddingTop: 100,
  },
  paddingBottomFifty: {
    paddingBottom: 50,
  },
  iconsPadding: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});
