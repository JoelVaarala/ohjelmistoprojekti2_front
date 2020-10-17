import { StyleSheet } from 'react-native';


export default StyleSheet.create({

      container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },

      containerFlexStart: {
        flex: 1,
        justifyContent: 'flex-start'
      },

      containerAlignItemsCenter: {
        flex: 1,
        alignItems: 'center'
      },

      flexThree: {
        flex: 3
      },

      marginLeftTwenty: {
        marginLeft: 20,
      },

      heightForty: {
        height: 40
      },

      containerCenter: {
        alignItems: "center",
        justifyContent: "center",
      },

      backgroundBlack: {
        backgroundColor: 'black'
      },

      marginTopFifty: {
        marginTop: 50
      },

      marginTopThirty: {
        marginTop: 30
      },

      paddingTopFifty: {
        paddingTop: 50,
      },

      paddingTopTen: {
        paddingTop: 10,
      },

      paddingBottomFifty: {
        paddingBottom: 50
      },

      iconsPadding: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      },

      flexDirectionRow: {
        flexDirection: 'row'
      },

      justifyContentSpaceBetween: {
        justifyContent: 'space-between'
      },

      alignItemsFlexEnd: {
        alignItems: 'flex-end'
      },

      textOrangeBold: {
        color: 'orange',
        fontWeight: 'bold'
      },

      orangeMarginTopFive: {
        color: 'orange',
        marginTop: 5
      },

      saveButton: {flex: 1, 
        marginLeft: 80, 
        marginRight: 80
      },

      addTagInputBox: {
        height: 40, 
        width: 200, 
        backgroundColor: 'white', 
        color: 'black'
      },

      userTextStyle: {
        fontSize: 40,
        color: 'orange'
      },

      userBioStyle: {
        fontSize: 20,
        color: 'orange'
      },

      fontSizeTwenty: {
        fontSize: 20
      },

      //SwipingPage

      tagListContainer: {
        flex: 1,
        //backgroundColor: '#eaeaea',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 20
      },

      chatContainer: {
        flex: 1,
        backgroundColor : 'black'
    },

    editProfileContainer: {
      flex: 1,
      backgroundColor: '#eaeaea',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },

    matchesContainer: {
      //paddingTop: 50,
      flex: 1,
      backgroundColor: 'black',
  },

  viewLikersContainer: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
},

startingscreenContainer: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},

editProfileTextAreaContainer: { 
  height: 90, 
  width: 500, 
  backgroundColor: 'white', 
  color: 'black' },

myProfileContainer: {
  flex: 1,
  backgroundColor: '#fff'
},

profileContainer: {
  alignItems: 'center',
  flex: 6,
},

settingsContainer: {
  flex: 1,
  backgroundColor: '#fff',
},

      button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
      headers: {
        fontWeight: 'bold',
        marginTop: 10
      },
      textbox: {
        height: 40,
        width: 200,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
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

      flexOne: {
          flex: 1,
      },
//___________________________________________________________________________________________________
      //SwipeCard-components
      noMoreCardsText: {
        fontSize: 22,
      },

      //No more cards content at center of screen
      noMoreCardsContent: {
        flex: 1,
        justifyContent: 'center'
      },

      //Card bottom shadow thingy
      imageShadow: {
        height: 400, 
        width: 350, 
        right: 15, 
        top: 25, 
        opacity: 0.9, 
        borderRadius: 5
      },
      
      //Card size
      cardContainer: { position: "absolute", 
      top: 0, 
      left: 15, 
      right: 150, 
      justifyContent: "flex-end", 
      alignItems: "flex-start" 
    },

    //Event info at bottom side of card
    eventInfoMargin: {
        bottom: 50
    },

    //Event info text style
    eventInfo: { 
        fontSize: 18, 
        color: "white", 
        fontWeight: "bold" 
    },

    //Event info bio style
    eventInfoBio: { 
        fontSize: 12,
        color: "white" 
    },

    eventButton: { 
      flexDirection: 'row', 
      alignContent: 'center', 
      alignItems: 'center', 
      justifyContent: 'space-evenly' 
    },

//___________________________________________________________________________________________________
//SwipingPage
  
  //Icons location at bottom of the screen
  iconLocation: {
    flex: 1, 
    justifyContent: "flex-start"
  },

  //Space between icons
  iconSpacebetween: {
    flex: 1, flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-end"
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
    flex:1,
    marginTop: 22,
},

eventAddMargin: {
    marginLeft: 10,
    marginRight: 10
},
  /*
  ei käytössä?
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  */
  eventHeaders: {
    fontWeight: 'bold',
    marginTop: 10
  },
  eventTextbox: {
    height: 40,
    width: 200,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },

//___________________________________________________________________________________________________
//Carousel

carouselBackground: {
    flex: 1,
    backgroundColor: 'floralwhite'
},

carouselFontSize: {
    fontSize: 30,
},

carouselSafeAreaView: {
    flex: 1,
    paddingTop: 0,
},

carouselLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
},

//___________________________________________________________________________________________________
//Chat



chatStyle: { 
    justifyContent: 'space-around', 
    flexDirection: 'row', 
    padding: 5, 
    backgroundColor: 'black' 
},

/*
chatButton: {
    paddingHorizontal: 10
},
*/


//___________________________________________________________________________________________________
//EditProfile


  editProfilebutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },

  editProfileTextArea: {
    textAlignVertical: "top",
    alignSelf: 'stretch',
    fontSize: 15
  },
  editProfileText: {
    fontSize: 20,
    paddingTop: 2,
    paddingBottom: 1,
  },

  omatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 80
  },

  tagTextInput: { 
    height: 40, 
    width: 200, 
    backgroundColor: 'white', 
    color: 'black' 
  },

//___________________________________________________________________________________________________
//Globaalit



//ei käytössä?
matchesButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  matchesImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  matchesLogo: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    width: 400,
    height: 50,
    padding: '15%'
  },

  matchMessage: {
    fontSize: 20, color: 'orange',
    fontWeight: 'bold',
    fontFamily: 'roboto'
  },

  matchContainerBackground: {
    backgroundColor: 'rgba(255,154,0,0)'
  },
  
  opacityOne: {
    opacity: 1,
  },

  listItemTitleStyle: {
    color: 'white', 
    fontWeight: 'bold',
    fontFamily: 'roboto'
  },

  listItemSubtitleStyle: {
    color: 'gray',
    fontFamily: 'roboto'
  },

  matchesTextStyle: {
    fontSize: 20, 
    color: 'orange',
    fontWeight: 'bold',
    fontFamily: 'roboto'
  },

  avatarRoundedBackground: {
    backgroundColor: 'rgba(255,154,0,0)'
  },

//___________________________________________________________________________________________________
//MyProfile

myProfileUser: {
    fontSize: 20, 
    top: 5
},



//ei käytössä?
myProfileButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
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

//___________________________________________________________________________________________________
//Profile



profileAlignItem: {
    alignItems: 'center', 
    flex: 6 
},

profileUserText: {
    fontSize: 40,
},

profileUserBio: {
    fontSize: 20,
},

profileFlexThree: {
    flex: 3,
},

//Ei vielä käytössä?
profileButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
},

//___________________________________________________________________________________________________
//Register

registerScrollView: {
    flex: 1,
    paddingTop: 20,
},

registerText: {
    alignSelf: 'center'
},

registerBirthdayMarginLeft: {
    marginLeft: '10'
},

registerBirthdayText: {
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
},

registerDatePicker: {
    alignSelf: 'center',
},

registerGenderStyle: {
    marginLeft: 10,
    paddingTop: 10,
},

registerGenderText: {
    color: 'grey', 
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
},

registerUserButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80,
},

heightForty: {
  height: 40
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



  settingsScrollView: {

  },
  settingsButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    justifyContent: 'flex-start',
  },
  tagBox: {
    padding: 6,
    fontSize: 16,
    color: 'black',
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: 'orange',
    borderRadius: 6,
  },
  settingsOmatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 80
  },
  settingsContent: {
    paddingTop: 10,
  },
  settingsCheckbox: {
    flexDirection: 'row'
  },

  optionMarginTopFive: {
    marginTop: 5,
  },

  saveDataButton: {
      paddingHorizontal: 10,
      alignItems: 'stretch',
  },

  settingsRangerSlider: {
      width: 250,
      height: 60,
  },

  settingsAgePaddingTop: {
      paddingTop: 50,
  },

  settingsAddTag: { 
      height: 40, 
      width: 200, 
      backgroundColor: 'white',
      color: 'black',
    },

textInputBackground: {
    backgroundColor: 'white',
},

//___________________________________________________________________________________________________
//Startingscreen



//___________________________________________________________________________________________________
//Startup

StartupUsername: {
    paddingTop: 100,
},

startupButtons: {
    paddingHorizontal: 10,
},

//___________________________________________________________________________________________________
//Startup


viewLikersbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
},
viewLikersPicker: {
    //flex: 1,
    // paddingTop: 0,
    alignItems: "center"
},

viewLikersPickerSize: {
    height: 50,
    width: 150,
},

viewLikersSwipedFontSize: {
    fontSize: 20,
},

viewLikersItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},

});



