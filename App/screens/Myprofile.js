import React,{Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import Title from '../components/Title';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper';
import EditProfile from './EditProfile';
import {connect} from 'react-redux';


class Myprofile extends Component {

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        const user = this.props.auth.user;
        return (
            <View>
                <Title
                    title={'My Profile'}
                    IconName={'menu'}
                    onPress={() => this.props.navigation.openDrawer()}
                />
                <StatusBar
                    // animated={true}
                    backgroundColor="#fff"
                    barStyle='dark-content'
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%', }}>
    
                    <Image
    
                        source={require('../assets/account.png')}
                    />
                    <View style={{ position: 'absolute', }}>
                        <FAB
                            style={styles.fab}
                            small
                            color='#fff'
                            icon="pencil"
                            onPress={() => this.props.navigation.navigate('EditProfile')}
                        />
                    </View>
                    <Text style={{ color: '#000000', fontSize: 21, marginTop: '2.2%' }}>{user.f_name +' '+user.l_name }</Text>
                </View>
                <View style={{ marginTop: '15%' }}>
                    <Text style={{ fontSize: 16, color: '#000000', paddingLeft: 20, }}>email</Text>
                    <Text style={{ fontSize: 14, color: '#999796', paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#bab7b5', borderBottomWidth: 1 }}>
                        {user.email}
                    </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('ChangePassword')}>
                        <Text style={{ fontSize: 16, color: '#000000', padding: 20, borderBottomColor: '#bab7b5', borderBottomWidth: 1 }}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Bank")}>
                        <Text style={{ fontSize: 16, color: '#000000', padding: 20, borderBottomColor: '#bab7b5', borderBottomWidth: 1 }}>Payment Options</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    fab: {
        // position: 'absolute',
        // margin: 90,
        left: '120%',
        top: "84%",
        backgroundColor: '#3396FF',
    },
})

const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };
  
  export default connect(
    mapStateToProps
  )(Myprofile);



