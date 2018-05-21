import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './routes';
import Icons from './constants/icons';
import DeviceStorage from './utils/storage';
import { EventRegister } from 'react-native-event-listeners';

registerScreens();

const navigatorButtons = {
  rightButtons: [
    {
      id: 'createNewVisit',
      icon: Icons.PLUS
    }
  ]
};

const navigatorStyle = {
  drawUnderNavBar: true,
  navBarTranslucent: true,
  navBarButtonColor: '#FF8436'
};

export default class App {
  public listener: any;

  constructor() {
    DeviceStorage.get('id_token').then(token => {
      console.log(token);
      if (token) {
        this.startApp();
      } else {
        this.startAuthApp();
      }
    });

    EventRegister.addEventListener('USER-LOGGED-IN', (data: any) => {
      this.startApp();
    });

    EventRegister.addEventListener('USER-LOGGED-OUT', (data: any) => {
      this.startAuthApp();
    });
  }

  private startAuthApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'screens.LoginScreen',
        navigatorStyle: {
          navBarHidden: true,
          drawUnderNavBar: true,
          navBarBackgroundColor: '#3C95C0',
          navBarNoBorder: true,
          navBarButtonColor: '#FFFFFF'
        }
      },
      animationType: 'fade'
    });
  }

  private startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'screens.Dashboard',
          label: 'Visits',
          icon: Icons.HEART,
          title: 'My Visits',
          navigatorButtons,
          navigatorStyle
        },
        {
          screen: 'screens.UserProfile',
          label: 'Medical ID',
          icon: Icons.MEDICAL,
          title: 'Medical ID',
          navigatorStyle
        },
        {
          screen: 'screens.MoreScreen',
          label: 'More',
          icon: Icons.MORE_HOR,
          title: 'More',
          navigatorStyle
        }
      ],
      tabsStyle: {
        // optional, add this if you want to style the tab bar beyond the defaults
        drawUnderTabBar: true,
        tabBarTranslucent: true,
        tabBarSelectedButtonColor: '#FF5956'
      },
      animationType: 'fade'
    });
  }
}
