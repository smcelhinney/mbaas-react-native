import { Navigation } from 'react-native-navigation';
import Dashboard from '../screens/Dashboard';
import VisitScreen from '../screens/VisitScreen';
import EnterPassword from '../screens/EnterPassword';
import LoginScreen from '../screens/LoginScreen';
import Terms from '../screens/Terms';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import UserProfile from '../screens/UserProfile';
import UserProfileEdit from '../screens/UserProfileEdit';
import MoreScreen from '../screens/MoreScreen';
import ItemsSelectionModal from '../components/ItemsSelectionModal';
import SingleItemSelectionModal from '../components/SingleItemSelectionModal';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';

export default function() {
  Navigation.registerComponent('screens.MoreScreen', () =>
    ApolloProviderWrapper(MoreScreen)
  );
  Navigation.registerComponent('screens.Terms', () =>
    ApolloProviderWrapper(Terms)
  );
  Navigation.registerComponent('screens.UserProfile', () =>
    ApolloProviderWrapper(UserProfile)
  );
  Navigation.registerComponent('modals.UserProfileEdit', () =>
    ApolloProviderWrapper(UserProfileEdit)
  );
  Navigation.registerComponent('screens.LoginScreen', () =>
    ApolloProviderWrapper(LoginScreen)
  );
  Navigation.registerComponent('screens.RegisterScreen', () =>
    ApolloProviderWrapper(RegisterScreen)
  );
  Navigation.registerComponent(
    'screens.ResetPasswordScreen',
    () => ResetPasswordScreen
  );
  Navigation.registerComponent('screens.EnterPassword', () =>
    ApolloProviderWrapper(EnterPassword)
  );
  Navigation.registerComponent('screens.Dashboard', () =>
    ApolloProviderWrapper(Dashboard)
  );
  Navigation.registerComponent('screens.VisitScreen', () =>
    ApolloProviderWrapper(VisitScreen)
  );
  Navigation.registerComponent('modals.ItemsSelectionModal', () =>
    ApolloProviderWrapper(ItemsSelectionModal)
  );
  Navigation.registerComponent('modals.SingleItemSelectionModal', () =>
    ApolloProviderWrapper(SingleItemSelectionModal)
  );
}
