import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AboutScreen from '../screen/about'
import ListScreen from '../screen/list'
import DashboardScreen from '../screen/dashboard'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

export default function RouteNavigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size})=>{
                        let iconName;

                       if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-filled'
                            : 'home';
                        } else if (route.name === 'Data') {
                        iconName = focused 
                            ? 'location-city' 
                            : 'location-city';
                        } else if (route.name === 'About') {
                        iconName = focused 
                            ? 'info' 
                            : 'info-outline';
                        }
                        // You can return any component that you like here!
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#113CFC',
                    tabBarInactiveTintColor: '#9D9D9D',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={DashboardScreen} />
                <Tab.Screen name="Data" component={ListScreen} />
                <Tab.Screen name="About" component={AboutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
