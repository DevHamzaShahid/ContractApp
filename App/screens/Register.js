import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Alert, TouchableOpacity } from 'react-native';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import Title from '../components/Title';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

export default function Register({ navigation }) {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[phone, setPhone] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState('');
    const[city, setCity] = useState('');
    const[zip, setZip] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const saveData = async () => {
        try {
            let formData = new FormData();
            if(firstName ==''){
                alert('Enter first name');
            }if(lastName ==''){
                alert('Enter last name');
            }if(phone ==''){
                alert('Enter phone number');
            }if(email ==''){
                alert('Enter email address');
            }if(password ==''){
                alert('Enter password');
            }else{
                setLoading(true);
                formData.append('f_name', firstName);
                formData.append('l_name', lastName);
                formData.append('phone', phone);
                formData.append('email', email);
                formData.append('address', address);
                formData.append('city', city);
                formData.append('zip', zip);
                formData.append('password', password);
                // console.log('form data', formData);
                const response = await fetch(
                    `${SERVER_URL}create_account`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                });
                setLoading(false);
                const responseJson = await response.json();
                if(responseJson.status == 'error'){
                    alert(responseJson.msg);
                }else{
                    Alert.alert(
                        'Success..',
                        'Your account creation is successful. Kindly check your email to activate your account',
                        [
                          {text: 'OK', onPress: ()=>navigation.goBack()},
                        ], { cancelable: false }
                      );
                }
            }
        } catch (e) {
            console.log('Invalid Response from server', e);
            setLoading(false);
          }
    }

    return (

        <View style={{flex:1}}>

            <Title
                title={'Register Now'}
                IconName={'arrow-left'}
                color={'#000000'}
                onPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ paddingLeft: 14, marginTop: '8%' }}><Image
                    source={require('../assets/logo.png')}
                />
                    <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 8, color: '#000', marginBottom: 8 }}>Register Now</Text>
                </View>
                <View>
                    <TitleInput
                        value={firstName}
                        title={'First Name'}
                        placeholder={'Enter Your First Name'}
                        onChangeText={value => {
                            setFirstName(value);
                        }}
                    />
                    <TitleInput
                        value={lastName}
                        title={'Last Name'}
                        placeholder={'Enter Your Last Name'}
                        onChangeText={value => {
                            setLastName(value);
                        }}
                    />
                    <TitleInput
                        value={phone}
                        title={'Phone number'}
                        placeholder={'Enter Your phone number'}
                        onChangeText={value => {
                            setPhone(value);
                        }}
                    />
                    <TitleInput
                        value={email}
                        title={'Email'}
                        keyboardType={'email-address'}
                        placeholder={'Enter Your Email'}
                        onChangeText={value => {
                            setEmail(value);
                        }}
                    />
                    <TitleInput
                        value={address}
                        title={'Address'}
                        placeholder={'Enter Your Address'}
                        onChangeText={value => {
                            setAddress(value);
                        }}
                    />
                    <TitleInput
                        value={city}
                        title={'City'}
                        placeholder={'Enter Your City'}
                        onChangeText={value => {
                            setCity(value);
                        }}
                    />
                    <TitleInput
                        value={zip}
                        title={'Zip/Postal Code'}
                        placeholder={'Zip/Postal Code'}
                        onChangeText={value => {
                            setZip(value);
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
                        title='Register Now'
                        onPress={() => saveData()}
                    />
                </View>
            </ScrollView>
            {loading ? 
                <LoadingBar/>
            : null}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    progress: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#F5F5F5',
    },
  });