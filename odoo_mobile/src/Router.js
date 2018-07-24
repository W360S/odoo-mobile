import React from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './pages/home/Home'
import Authentication from './pages/authentication/Authentication'
import Login from './pages/login/Login'

export const HomeStack = StackNavigator({
    Authentication_Page: {
        screen: Authentication,
        navigationOptions: {
            header: null,
        },
    },
    Login_Page: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    Home_Page: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
})