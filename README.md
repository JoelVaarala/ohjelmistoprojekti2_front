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
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

Props | Type | Optional | Description
------------ | ------------- |  ------------- | -------------

# AuthContext
AuthContext allows access to SignIn() and SignOut() functions from Navigation.js to other components.

# Carousel
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Chat
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# EditProfile
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Globaalit
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Login
Login page where you can login or go to Register to registeras a new user.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Check Navigation for more info

# Matches
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# MyProfile
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Navigation
Handles authentication and different navigation views based on login status.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Starts login() with given email and password. If login is successful, saves email and password to AsyncStorage and switches login page to apps content
signOut() | - | - | Signs user out, removes email and password from AsyncStorage and switches apps content to login page
loginOnStartup() | - | - | When the app open, starts signIn() if email and password is saved to AsyncStorage
login() | email (String), password (String) | String | Tries to login to firebase using given email and password. Returns error string if email or password were wrong or access to location was denied, otherwise returns success string
UpdateLocation() | - | String | Asks premission to users location and send location object to UpdateFirebase(). Returns confirmation or denial string depending if access was granted
UpdateFirebase() | location (object) | - | Send users location to firebase. Location object has latitude and longitude attributes

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
Registering page for new users.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Check Navigation for more info
inputChanged() | inputName (String), inputValue (any) | - | Updates userdata states attributes with given intups. inputName is the name of the attribute you want to upadate and inputValue is the value
genderConvert() | value (int) | - | Converts ButtonGroups selected buttons index to corresponding gender value and updates userdata states gender
changePasswordVisibility() | - | - | Shows or hides password fields input
registerUser() | - | - | Tries to register new user. If registration is successful, signs new user in
validation() | - | boolean | Validates if password, age and username is within given limits. Returns true if everyting is correct

# Settings
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SortableList
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipeCards
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipingPage
Swiping page shows users and event you can match with by swiping left or right. You can filter if you want to be shown users, events or both and what types of events you want to see. Pressing the info button you will be redirected to the users or events profile.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
fetchSwipeablesFromBackend() | - | - | Fetches all swipeables users and events from firebase based on users settings (gender, tags)
updateIndex() | name (String), value (int) | - | Updates selected ButtonGroups indexes to state. name refers to which ButtonGropuso button was pressed (main or sub) and value is the index
filterSwipes() | - | - | Filters users and events shown on SwipeCards based on selected ButtonGroups filters
