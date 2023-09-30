import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@views/Home';
import Profile from '@views/Profile';
import Upload from '@views/Upload';

const Tab = createBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="ProfileScreen" component={Profile} />
      <Tab.Screen name="UploadScreen" component={Upload} />
    </Tab.Navigator>
  );
}

export default BottomBar;
