import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
import Chat from './components/Chat';
// import myProfile from './components/MyProfile'
// import EditProfile from './components/EditProfile'
// import MyFilters from './components/MyFilters'
// import MyProfile from './components/MyProfile';
// import Profile from './components/Profile';
// import Chat from './components/Chat';
// import SwipingPage from './components/SwipingPage';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
