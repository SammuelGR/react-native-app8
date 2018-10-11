import { AppRegistry } from 'react-native';
import App from './src/App';

console.ignoredYellowBox = [
    'Warning: isMounted(...) is deprecated',
    'Setting a timer for a long period of time'
]

AppRegistry.registerComponent('app8', () => App);
