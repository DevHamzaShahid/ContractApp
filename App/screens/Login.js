import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import Title from '../components/Title';
import {connect} from 'react-redux';
import {login, updateAuth} from '../containers/actions/login';
import LoadingBar from '../components/LoadingBar';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        console.log('auth ', props);
        if (props.auth && props.loginSuccess) {
          props.navigation.navigate('Drawer');
        }
    }, [props, props.auth, props.loginSuccess, props.navigation]);

    const login = async () => {
        // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (!email) {
          alert('Please enter a valid email');
        } else if (!password) {
          alert('Please enter a password');
        } else {
          setLoading(true);
          props.login(email, password).then(
            data => {
              setLoading(false);
            },
            error => {
              setLoading(false);
              alert(error);
            },
          );
        }
      };

    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <StatusBar
                // animated={true}
                backgroundColor="#fff"
                barStyle='dark-content'
            />
            <Title
                title={'Login'}
                IconName={'arrow-left'}
                color={'#000000'}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={{ alignItems:'center', marginTop: '8%' }}><Image
                    source={require('../assets/logo.png')}
                />
                    <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10, color: '#000' }}>Welcome to PayKamsy</Text>
                    <Text style={{ fontSize: 14, textAlign:'center', color: '#000000', marginBottom: 10, marginLeft:10, marginRight:10 }}>Please login into your account or go to our Main Menu to Create, View and Pay an Invoice</Text></View>
                <View>
                    <TitleInput
                        title={'Email'}
                        placeholder={'Enter Your Email'}
                        value={email}
                        keyboardType='email-address'
                        onChangeText={value => {
                            setEmail(value)
                            console.log(email)
                        }}
                    />


                    <View style={{ flexDirection:'row', alignItems:'center'}}>
                        <TitleInput
                            title={'Password'}
                            value={password}
                            secureTextEntry={showPassword}
                            placeholder={'Enter Your Password'}
                            onChangeText={value => {
                                setPassword(value)
                            }}
                        />

                        <TouchableOpacity
                            style={{marginLeft: -70, zIndex: 1000}}
                            onPress={() => {
                                setShowPassword(!showPassword)
                            }}>
                            <Image
                                resizeMode={'contain'}
                                style={{width: 30, height: 30,}}
                                source={
                                    showPassword
                                    ? require('./../assets/hide.png')
                                    : require('./../assets/view.png')
                                }
                            />
                        </TouchableOpacity>

                    </View>

                    <MyButton
                        title='Login'
                        onPress={() => login()}
                    />

                    {/* ForgetPassword */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: '5%', paddingTop: 12 }}>
                        <View ></View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPassword')}>
                            <View style={{ justifyContent: 'flex-end', }}><Text style={{ color: '#100747' }} >Forget Password</Text></View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            {loading ? 
                <LoadingBar/>
            : null}
        </View>
    )
}


const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };
  
  const mapDispatchToProps = {
    login,
    updateAuth,
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
  

