import iconNetwork from '../assets/network.png';
import iconCalendar from '../assets/iconCalendar.png';
import iconChat from '../assets/iconChats477.png';
import iconCall from '../assets/iconCalls517.png';
import iconFavourite from '../assets/iconFavourites.png';
import iconExtralink from '../assets/iconExtralink.png';

export default [
  {
    icon: iconNetwork,
    navigationName: 'APPNAME NETWORK',
    navigationNameStyle: 'navigation-name-bold'
  },
  {
    icon: iconCalendar,
    navigationName: 'EVENTS',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'default-navigation-element-margin'
  },
  {
    icon: iconCalendar,
    navigationName: 'MY EVENTS',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'large-navigation-element-margin'
  },
  {
    icon: iconChat,
    navigationName: 'MY CHATS',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'default-navigation-element-margin'
  },
  {
    icon: iconCall,
    navigationName: 'MY CALLS',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'default-navigation-element-margin'
  },
  {
    icon: iconFavourite,
    navigationName: 'MY FAVOURITES',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'default-navigation-element-margin'
  },
  {
    icon: iconExtralink,
    navigationName: 'ADDITIONAL EXTRALINK',
    navigationNameStyle: 'navigation-name-default',
    elementMargin: 'large-navigation-element-margin'
  }
];
