import React,{useState} from 'react';
import { View, StatusBar, Image, Text} from 'react-native';
import Title from '../components/Title'
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

export default function ForgetPassword ({navigation}){

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    const resetEmail = async () => {
        if(!email){
            alert('Enter email');
        }
        try{
            const formData = new FormData();
            formData.append('email', email);
            setLoading(true);
            const response = await fetch(`${SERVER_URL}reset_password_request`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            setLoading(false);
            if(responseJson.status == 'error'){
                alert(responseJson.msg);
            }else{
                alert('kindly check your email address to reset password.');
            }
        }catch(e){
            setLoading(false);
            console.log('Invalid response from server.', e);
            alert('Invalid response from server');
        }
    }

    return(
        <View>
            <StatusBar
                // animated={true}
                    backgroundColor="#fff"
                    barStyle='dark-content'
                
                    />
                <Title
                    title={'Forget password'}
                    IconName={'arrow-left'}
                    color={'#000000'}
                    onPress={() => navigation.goBack()}
                />
                <View style={{ paddingLeft: 14, marginBottom:20, marginTop: '8%' }}>
                    <Image source={require('../assets/logo.png')}/>
                    <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10, color: '#000' }}>Reset Password</Text>
                    <Text style={{ fontSize: 14, marginTop: 8, color: '#000000', marginBottom: 10 }}>Enter your email address to reset your password</Text>
                </View>
                <TitleInput
                    title={'Email address'}
                    keyboardType='email-address'
                    placeholder={'Enter your email address'}
                    value={email}
                    onChangeText={value => {
                        setEmail(value);
                    }}
                />

                <View style={{marginTop:20}}>
                    <MyButton
                        title='Submit'
                        onPress={() => resetEmail()}
                    />
                </View>
            {loading && <LoadingBar/>}
        </View>
    );

}