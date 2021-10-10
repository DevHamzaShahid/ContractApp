import React,{useState} from 'react';
import { View, StatusBar, Image, Text, ScrollView, Alert } from 'react-native';
import Title from '../components/Title'
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import {connect} from 'react-redux';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

function ChangePassword(props) {

    const [loading, setLoading] = useState(false);
    const [prePassword, setPrePassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const savePassword = async()=>{
        if(!prePassword){
            alert('Enter old password');
            return;
        }if(!newPassword){
            alert('Enter new password');
            return;
        }if(!conPassword){
            alert('Enter conform password');
            return;
        }if(newPassword != conPassword){
            alert('conform password did not match');
            return;
        }
        setLoading(true);
        try{
            let formData = new FormData();
            formData.append('previous_password', prePassword);
            formData.append('new_password', newPassword);
            formData.append('user_id', props.auth.user.id);

            const response = await fetch(`${SERVER_URL}change_user_password`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            setLoading(false);
            if(responseJson.status == 'error'){
                alert(responseJson.msg);
            }else{
                Alert.alert(
                    'Success..',
                    'Password updated successfully.',
                    [{text:'OK', onclick: ()=>props.navigation.goBack()}],
                    {cancelable:false}
                );
            }

        }catch(e){
            setLoading(false);
            console.log('Invalid response from server',e);
            alert('Invalid response from server');
        }
    }

    return (
        <View>
            <StatusBar
                // animated={true}
                backgroundColor="#fff"
                barStyle='dark-content'
            />
            <Title
                title={'Change Password'}
                IconName={'arrow-left'}
                color={'#000000'}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={{ paddingLeft: 14, marginBottom: 20, marginTop: '8%' }}>
            
                    <Image source={require('../assets/logo.png')} />
                    <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10, color: '#000' }}>Change Password</Text>
                </View>
                <TitleInput
                    title={'Old Password'}
                    secureTextEntry={true}
                    placeholder={'Enter your Old Password'}
                    value={prePassword}
                    onChangeText={value => {
                        setPrePassword(value);
                    }}
                />
                <TitleInput
                    title={'New Password'}
                    secureTextEntry={true}
                    placeholder={'Enter your New Password'}
                    value={newPassword}
                    onChangeText={value => {
                        setNewPassword(value);
                    }}
                />
                <TitleInput
                    title={'Confirm Password'}
                    secureTextEntry={true}
                    value={conPassword}
                    placeholder={'Enter your Confirm Password'}
                    onChangeText={value => {
                        setConPassword(value);
                    }}
                />

                <View style={{ marginTop: 20 }}>
                    <MyButton
                        title='Save'
                        onPress={() => savePassword()}
                    />
                </View>
            </ScrollView>
            {loading && <LoadingBar/>}
        </View>
    );

}

const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };
  
  export default connect(
    mapStateToProps
  )(ChangePassword);