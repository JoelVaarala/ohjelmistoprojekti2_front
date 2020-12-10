# ohjelmistoprojekti2_front


# End points in Backend
Endpoint | Input | Output | Description
------------ | ------------- |  ------------- | -------------
message (post) | input| Output | User sends a message to another user or event
swipe (post) | input| Output | User swipes to another user or event, or event swipes to another user.
findSwipeables (post) | input| Output | Finds swipeables based on your filters and location.
register (post) | input| Output | Registers user for application
removeMatch (post) | input| Output | Removes target match from matches
resetData (post) | input| Output | resets database data and creates dummy data from existing users
profileUpdate (post) | input| Output | User can update own profile
filtersUpdate (post) | input| Output | User can update own filters
event (post) | input| Output | User create a new event
event (put) | input| Output | User updates a existing event
updateLocation (post) | input| Output | User updates users location.
opentest (post) | input| Output | Endpoint to manually get/update helsinki open api events


# Add_Event
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
sendEvent() | date(date), eventName(String), desccription(String), tags(Array) | - | POST - user created event based on user inputs.
fetchAddress() | latitude, longitude | - | Fetches address information based on location coordinates, sets Address to be city and street for given coordinates.
fethcCoordinates() | newAddress(String) | - | Updates marker on the map view to show newly searched location and updates Address to be latest selected location.
showInvalid() | msg(String) | notification | User will be prompted with invalid input indicator if event validation criterias are not fullfilled.
showSuccess() | - | - | Green indicator message for successfully created event.
showFail() | - | - | Red indicator message to let user know that the event creation failed.

Props | Type | Optional | Description
------------ | ------------- |  ------------- | -------------

# AuthContext
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Carousel
Component to display profile photos in scrollable "carousel" view

Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Chat
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
MessageToFirebase() | msg(Obj) | - | POST - latest message to firebase.
getConversationsRealTime() | - | messages(Array) | Fetches and creates array including all of the messages from the conversation. Also sorts them according sender to which side are rendered.
onSend() | messages(Array) | messages(Array) | Appends messages array by latest messages and updates GiftedChat to render newest message.


# EditProfile
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Globaalit
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Matches
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# MyProfile
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Profile
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
getProfileInformation() |   |   |   Fetches current profiles informations: Profile information, event information and event particiapiants
getUser() | user (String) | |  Fetches users profile data.
getEvent() |  | |  Fetches events profile data using route params userMatchProfile parameter
getPeopleWhoWantToJoin() | | | Fetches users that have swiped yes to event but are not swiped by event. Only called when profile type is event.
getParticipiants() | | | Fetches users that are participiating to event. Only callen when profile type is event
Accept() | accepted (boolean), uid (String) | | TBD: Function should swipe yes/no to user based on boolean as a event.
Kick() | uid (String) | | TBD: Function unmatches target user with currently selected event.
removeMatch() | target(String) , myUID(String) |  | Removes match (person-person match)

# Register
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Settings
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SortableList
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Startup
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipeCards
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipingPage
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------


