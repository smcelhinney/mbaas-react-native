import { AsyncStorage } from 'react-native';
import * as _ from 'lodash';

const DeviceStorage = {
  /**
   * Get a one or more value for a key or array of keys from AsyncStorage
   * @param {String|Array} key A key or array of keys
   * @return {Promise}
   */
  get(key: string) {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then(value => {
        return JSON.parse(value);
      });
    } else {
      return AsyncStorage.multiGet(key).then(values => {
        return values.map(value => {
          return JSON.parse(value[1]);
        });
      });
    }
  },

  /**
   * Save a key value pair or a series of key value pairs to AsyncStorage.
   * @param  {String|Array} key The key or an array of key/value pairs
   * @param  {Any} value The value to save
   * @return {Promise}
   */
  save(key: string, value: any) {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      let pairs = key.map(function(pair) {
        return [pair[0], JSON.stringify(pair[1])];
      });
      return AsyncStorage.multiSet(pairs);
    }
  },

  /**
   * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
   * @param  {String} key The key
   * @param  {Value} value The value to update with
   * @return {Promise}
   */
  update(key: string, value: any) {
    return this.get(key).then((item: any) => {
      value = typeof value === 'string' ? value : _.merge({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  },

  /**
   * Delete the value for a given key in AsyncStorage.
   * @param  {String} key The key
   * @return {Promise}
   */
  delete(key: string) {
    return AsyncStorage.removeItem(key);
  },

  /**
   * Get all keys in AsyncStorage.
   * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
   */
  keys() {
    return AsyncStorage.getAllKeys();
  }
};

export default DeviceStorage;
