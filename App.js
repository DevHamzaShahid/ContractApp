import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/screens/Login';
import Register from './App/screens/Register';
import Myprofile from './App/screens/Myprofile'
import Disputes from './App/screens/Disputes'
import BuyerPage from './App/screens/BuyerPage';
import ContractForm from './App/screens/ContractForm';
import SellerPage from './App/screens/SellerPage';
import InvoiceDetail from './App/screens/InvoiceDetail';
import ForgetPassword from './App/screens/ForgetPassword';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './App/CustomSidebarMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from './App/screens/EditProfile';
import Bank from './App/screens/Bank';
import Guest from './App/screens/Guest';
import ChangePassword from './App/screens/ChangePassword';
import StartPage from './App/screens/StartPage';
import PayInvoice from './App/screens/PayInvoice';
import { store, persistor } from './App/containers/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import InvoicePaymentDetail from './App/screens/InvoicePaymentDetail';
import EditInvoice from './App/screens/EditInvoice';
import GuestSearchInvoice from './App/screens/GuestSearchInvoice';
import CheckInvoice from './App/screens/CheckInvoice';
import ChcekInvoice from './App/screens/CheckInvoice';
import SplashScreen from 'react-native-splash-screen';
import PdfView from './App/screens/PdfView';
import AboutUs from './App/static/AboutUs';
import PrivacyPolicyPage from './App/static/PrivacyPolicyPage';
import RefundPage from './App/static/RefundPage';
import SimpleTrans from './App/static/SimpleTrans';
import TermsPage from './App/static/TermsPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  myDrawer = () => {

    return (


      <Drawer.Navigator initialRouteName="BuyersPage"
        drawerContentOptions={{
          activeTintColor: '#773c10',
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen name="Switch to Buyer Page" component={BuyerPage}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name={'cart-arrow-down'} size={26} color='#773c10' />
            )
          }} />
        <Drawer.Screen name="Switch to Seller Page" component={SellerPage}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name={'account-edit'} size={26} color='#773c10' />
            )
          }} />
        <Drawer.Screen name="Raise Dispute" component={Disputes}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'alert'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="My Profile" component={Myprofile}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'account'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="About Us" component={AboutUs}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'information'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyPage}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'format-list-text'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="Refund Policy" component={RefundPage}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'cash-refund'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="Simple And Transparent Pricing" component={SimpleTrans}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'state-machine'} size={26} color='#773c10' />
              )
            }} />
        <Drawer.Screen name="Terms and Conditions" component={TermsPage}
          options={
            {
              drawerIcon: ({ color, size }) => (
                <Icon name={'book-open-page-variant'} size={26} color='#773c10' />
              )
            }} />
      </Drawer.Navigator>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer >
            <Stack.Navigator screenOptions={{
              headerShown: false,
            }} >
              <Stack.Screen name="StartPage" component={StartPage} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="PayInvoice" component={PayInvoice} />
              <Stack.Screen name="Drawer" component={this.myDrawer} />
              <Stack.Screen name="ContractForm" component={ContractForm} />
              <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Bank" component={Bank} />
              <Stack.Screen name="Guest" component={Guest} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="InvoicePaymentDetail" component={InvoicePaymentDetail} />
              <Stack.Screen name="EditInvoice" component={EditInvoice} />
              <Stack.Screen name="GuestSearchInvoice" component={GuestSearchInvoice} />
              <Stack.Screen name="ChcekInvoice" component={ChcekInvoice} />
              <Stack.Screen name="PdfView" component={PdfView} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
