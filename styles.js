import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    //Containers
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
        alignItems: "flex-start" 
      },
      carouselContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
      myProfileAvatarContainer: {
        marginTop: 15,
        alignItems: 'center'
      },

      //flex

      flexOne: {
        flex: 1,
      },
      flexThree: {
        flex: 3
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

      //Chat

      chatStyle: { 
        justifyContent: 'space-around', 
        flexDirection: 'row', 
        padding: 5, 
        backgroundColor: 'black' 
    },

      //viewLikersItemContent
      viewLikersItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

      //title
      registerTitleStyle: {
        color: 'grey',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10
    },

    //carousel

    carouselSafeAreaView: {
        flex: 1,
        paddingTop: 0,
    },



      //no more cards

      noMoreCardsContent: {
        flex: 1,
        justifyContent: 'center'
      },

      //image styling

      //Card bottom shadow thingy
      darkishStyle: { 
        height: 400, 
        width: 350, 
        bottom: -100, 
        right: 15, 
        opacity: 0.9, 
        borderRadius: 5 
      },

      matchesImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

      imageSize: {
        width: '100%', 
        height: '100%'
      },

      //buttons

      previewButtonStyle: {
        flexDirection: 'row', 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-evenly'
      },
      registerUserButton: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 80,
        },
        saveButton: {
            flex: 1, 
            marginLeft: 80, 
            marginRight: 80
        },
        viewLikersbutton: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10
        },
        button: {
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10
          },

      //backgroundcolors

      backgroundBlack: {
        backgroundColor: 'black'
      },
      carouselBackgroundFloralWhite: {
        backgroundColor: 'floralwhite',
        flex: 1,
      },
      matchesBackgroundColor: {
        backgroundColor: 'rgba(255,154,0,0)' 
      },

      //height & width
      heightForty: {
        height: 40
      },
      viewLikersPickerSize: {
        height: 50,
        width: 150,
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

      //scrollView
    addEventScrollView: {
        flex:1,
        marginTop: 22,
    },

    //alignItems

    alignItemsFlexEnd: {
        alignItems: 'flex-end'
      },

      //justifyContent

      justifyContentSpaceBetween: {
        justifyContent: 'space-between'
      },

    //fontSize
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
      noMoreCardsText: {
        fontSize: 22,
      },
      eventInfo: { 
        fontSize: 18, 
        color: "white", 
        fontWeight: "bold" 
    },
    eventInfoBio: { 
        fontSize: 12,
        color: "white" 
    },
    editProfileText: {
        fontSize: 20,
        paddingTop: 2,
        paddingBottom: 1,
      },
      textOrangeBold: {
        color: 'orange',
        fontWeight: 'bold'
      },

    //tagBox

    tagBox: {
        padding: 6,
        fontSize: 16,
        color: 'black',
        marginVertical: 7,
        marginHorizontal: 10,
        backgroundColor: 'orange',
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
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },

      //textInput
      tagTextInput: { 
        height: 40, 
        width: 200, 
        backgroundColor: 'white', 
        color: 'black' 
      },
      addTagInputBox: {
        height: 40, 
        width: 200, 
        backgroundColor: 'white', 
        color: 'black'
      },

      //textArea

      editProfileTextArea: {
        textAlignVertical: "top",
        alignSelf: 'stretch',
        fontSize: 15
      },
      editProfileTextAreaContainer: { 
        height: 90, 
        width: 500, 
        backgroundColor: 'white', 
        color: 'black' 
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
        padding: '15%'
      },


      //margin

      eventAddMargin: {
        marginLeft: 10,
        marginRight: 10
    },

      marginLeftTen: {
        marginLeft: 10
      },
      marginLeftTwenty: {
        marginLeft: 20,
      },
      marginTopTen: {
        marginTop: 10
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
    orangeMarginTopFive: {
        color: 'orange',
        marginTop: 5
      },

    //padding
    paddingTopTen: {
        paddingTop: 10,
      },
      paddingTopFifty: {
        paddingTop: 50,
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
        paddingBottom: 20,
      },
});