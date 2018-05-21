// Type definitions for Wix React Native navigation v2
// Project: https://github.com/wix/react-native-navigation
// Definitions by: Jason Healy <https://github.com/jasonhealy>

declare module 'react-native-navigation' {
  /*
     * Parameters for ShowModal Navigation
     */
  export interface NavigationScreenShowModalParams {
    /*
        * Unique ID registered with Navigation.registerScreen
        */
    screen: string;

    /*
        *  Title of the screen as appears in the nav bar
        */
    title?: string;

    /*
        *  Pass properties to next screen
        */
    passProps?: any;

    /*
        *  Override the navigator style for the screen, see "Styling the navigator" below
        */
    navigatorStyle?: any;

    /*
        *  Navigation animation type "none" / "slide-up"
        */
    animationType?: string;
  }

  /*
     * Parameters for Push Navigation
     */
  export interface NavigationScreenPushParams {
    /*
         * Unique ID registered with Navigation.registerScreen
         */
    screen: string;

    /*
         * Title for next screen
         */
    title?: string;

    /*
         * Title image use -> require(imgUrl)
         */
    titleImage?: any;

    /*
         * Properties to pass to next screen
         */
    passProps?: any;

    /*
         * Does the push have transition animation or does it happen immediately
         */
    animated?: boolean;

    /*
         * Override the back button title (optional)
         */
    backButtonTitle?: string;

    /*
         * Hide the back button altogether (optional)
         */
    backButtonHidden?: boolean;

    /*
         * Override the navigator style for the pushed screen (optional)
         */
    navigatorStyle?: any;

    /*
         * Configure button on navigator
         */
    navigatorButtons?: any;
  }

  export interface NavigationScreen {
    push: (params: NavigationScreenPushParams) => void;
    pop: (params: any) => void;
    popToRoot: (params: any) => void;
    resetTo: (params: any) => void;
    showModal: (params: NavigationScreenShowModalParams) => void;
    dismissModal: (params?: any) => void;
    dismissAllModals: (params?: any) => void;
    showLightBox: (params: any) => void;
    dismissLightBox: (params?: any) => void;
    handleDeepLink: (params: any) => void;
    setOnNavigatorEvent: (params: any) => void;
    setButtons: (params: any) => void;
    setTitle: (params: any) => void;
    toggleDrawer: (params: any) => void;
    toggleTabs: (params: any) => void;
    setTabBadge: (params: any) => void;
    toggleNavBar: (params: any) => void;
  }

  export interface NavigationStatic {
    startTabBasedApp: (params: any) => void;
    startSingleScreenApp: (params: any) => any;
    registerComponent: (screenID: any, Generator: () => any) => any;
  }

  export var Navigation: NavigationStatic;
}
