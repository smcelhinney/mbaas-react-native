import CONSTANTS from '../constants';
import DeviceStorage from '../utils/storage';
import { EventRegister } from 'react-native-event-listeners';

interface IAuthentication {
  auth0Login: (email: string, password: string) => string;
  auth0Register: (email: string, password: string) => string;
  logout: () => void;
  setSession: (token: string) => void;
}

class Authentication {
  public events: any;

  constructor() {
    this.auth0Login = this.auth0Login.bind(this);
    this.logout = this.logout.bind(this);
    this.auth0ResetPassword = this.auth0ResetPassword.bind(this);
    this.auth0Register = this.auth0Register.bind(this);
  }

  public auth0ResetPassword(email: string) {
    const requestBody = {
      client_id: CONSTANTS.APP.CLIENT_ID,
      email,
      password: '',
      connection: 'Username-Password-Authentication'
    };

    const resetPassword = fetch(CONSTANTS.AUTH.AUTH0RESETURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return resetPassword
      .then(response => {
        if (response.status !== 200) {
          throw Error('ERROR');
        }
        return 'PASSWORD_RESET_SUCCESS';
      })
      .catch(err => {
        throw err;
      });
  }

  public auth0Register(email: string, password: string) {
    const requestBody = {
      client_id: CONSTANTS.APP.CLIENT_ID,
      email: email,
      password: password,
      connection: 'Username-Password-Authentication'
    };

    const registerUser = fetch(CONSTANTS.AUTH.AUTH0REGISTER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return registerUser
      .then(response => {
        if (response.status !== 200) {
          throw Error('ERROR');
        }
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(err => {
        throw err;
      });
  }

  public auth0Login(email: string, password: string) {
    const requestBody = {
      client_id: CONSTANTS.APP.CLIENT_ID,
      client_secret: CONSTANTS.APP.CLIENT_SECRET,
      username: email,
      password: password,
      connection: 'Username-Password-Authentication',
      scope: 'openid',
      grant_type: 'password'
    };

    const loginUser = fetch(CONSTANTS.AUTH.AUTH0URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return loginUser
      .then(response => {
        if (response.status !== 200) {
          throw Error('ERROR');
        }
        return response.json();
      })
      .then(responseJson => {
        return responseJson.id_token;
      })
      .then(token => {
        this.setSession(token);
        return token;
      })
      .catch(err => {
        throw err;
      });
  }

  public userAuthenticated() {
    EventRegister.emit('USER-LOGGED-IN');
  }

  public logout(client?: any) {
    DeviceStorage.delete(CONSTANTS.AUTH.TOKEN_STORE_KEY).then(() => {
      EventRegister.emit('USER-LOGGED-OUT');
    });
  }

  private setSession(token: string) {
    DeviceStorage.save(CONSTANTS.AUTH.TOKEN_STORE_KEY, token);
  }
}

export default Authentication;
