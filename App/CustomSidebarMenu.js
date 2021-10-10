import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Alert
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from "react-native-dialog";
// import {logout} from '../containers/actions/login';
import {logout} from './containers/actions/login';
import {connect} from 'react-redux';
const CustomSidebarMenu = (props) => {
  const [logoutDialog, setLogoutDialog] = useState(false);

  const logout = () => {
    Alert.alert(
      "Logout",
      "Do you want to Logout?",
      [
          {
              text: "No",
              style: "cancel"
          },
          { text: "Yes",
              onPress: ()=>{
                  // this.setState({loading: true});
                  props.logout(props.auth.domainId).then(
                  data => {
                      // this.setState({loading: false});
                      props.navigation.pop();
                      props.navigation.navigate('StartPage');
                  },
                  error => {
                      // this.setState({loading: false});
                      props.navigation.pop();
                      props.navigation.navigate('StartPage');
                  },
                  );
              }
           }
      ]
  );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image

        source={require('./assets/account.png')}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={{ alignSelf: 'center', fontSize: 18 }}>{props.auth.user.email}</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            props.navigation.closeDrawer();
            logout();
          }}
          icon={() => <Icon name={'logout'} size={28} color='#773c10' />}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: '100%',
    height: 100,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const mapStateToProps = state => {
  const {auth, loading} = state.login;
  return {loading, auth};
};

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomSidebarMenu);