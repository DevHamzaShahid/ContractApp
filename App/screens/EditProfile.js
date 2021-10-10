import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import Title from '../components/Title';
import {connect} from 'react-redux';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';
import CountryPicker from 'react-native-country-picker-modal'
import {updateAuthContact} from '../containers/actions/login';
function EditProfile(props){
    const user = props.auth.user;
    const [loading, setLoading] = useState(false);
    const [fname, setFname] = useState(user.f_name);
    const [lname, setLname] = useState(user.l_name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [city, setCity] = useState(user.city);
    const [zip, setZip] = useState(user.zip);
    const [state, setState] = useState(user.state);
    const [country, setCountry] = useState(user.country);
    const [countryCode, setCountryCode] = useState(user.country_code);


    const saveProfile = async() => {
        try {
            let formData = new FormData();
            if(!fname){
                alert('Enter first name');
            }if(!lname){
                alert('Enter last name');
            }if(!phone){
                alert('Enter phone number');
            }if(!address){
                alert('Enter address');
                return;
            }if(!city){
                alert('Enter city');
                return;
            }if(!state){
                alert('Enter state');
                return;
            }if(!country){
                alert('Select country');
                return;
            }else{
                setLoading(true);
                formData.append('f_name', fname);
                formData.append('l_name', lname);
                formData.append('phone', phone);
                formData.append('address', address);
                formData.append('city', city);
                formData.append('zip', zip);
                formData.append('state', state);
                formData.append('country', country);
                formData.append('country_code', countryCode);
                formData.append('user_id', props.auth.user.id);

                const response = await fetch(
                    `${SERVER_URL}update_user_profile`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                });
                setLoading(false);
                const responseJson = await response.json();
                if(responseJson.status == 'success'){
                    props.updateAuthContact(responseJson);
                    alert('Profile updated successfully');
                    // Alert.alert(
                    //     'Success..',
                    //     'Profile updated successfully',
                    //     [
                    //       {text: 'OK', onPress: ()=>props.navigation.goBack()},
                    //     ], { cancelable: false }
                    //   );
                }else{
                    alert('Invalid response from server');
                }
            }
        } catch (e) {
            console.log('Invalid Response from server', e);
            setLoading(false);
          }
    }


    return (
        <View style={{ flex: 1}}>

            <Title
                title={'Edit Your Information'}
                IconName={'arrow-left'}
                color={'#000000'}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={{ paddingLeft: 14, marginTop: '8%'}}><Image
                    source={require('../assets/logo.png')}
                />
                </View>
                <View>
                    <TitleInput
                        title = {'First Name'}
                        value = {fname}
                        placeholder={'Enter Your First Name'}
                        onChangeText={value => {
                            setFname(value);
                        }}
                    />
                    <TitleInput
                        title={'Last Name'}
                        value={lname}
                        placeholder={'Enter Your Last Name'}
                        onChangeText={value => {
                            setLname(value);
                        }}
                    />
                    <TitleInput
                        title={'Phone number'}
                        value={phone}
                        placeholder={'Enter Your phone number'}
                        onChangeText={value => {
                            setPhone(value);
                        }}
                    />
                    <TitleInput
                        title={'Address'}
                        value={address}
                        placeholder={'Enter Your Address'}
                        onChangeText={value => {
                            setAddress(value);
                        }}
                    />
                    <TitleInput
                        title={'City'}
                        value={city}
                        placeholder={'Enter Your City'}
                        onChangeText={value => {
                            setCity(value);
                        }}
                    />
                    <TitleInput
                        title={'Zip/Postal Code'}
                        value={zip}
                        placeholder={'Zip/Postal Code'}
                        onChangeText={value => {
                            setZip(value);
                        }}
                    />
                    <TitleInput
                        title={'State'}
                        value={state}
                        placeholder={'State'}
                        onChangeText={value => {
                            setState(value);
                        }}
                    />
                    <View style={{ justifyContent: 'center', height: 45, borderColor: 'gray',
                             width: '90.6%', borderWidth: 1, paddingLeft: 10, marginLeft: 15,
                              borderRadius: 10, marginBottom: 15 }}>
                        <CountryPicker
                            onSelect={(value) => {
                                setCountry(value.name);
                                setCountryCode(value.cca2);
                                // inputValues.countryCode = value.cca2;
                                }
                            }
                            countryCode={countryCode}
                            withFilter = 'true'
                            withCountryNameButton='true'
                        />
                                
                    </View>
                    <View style={{marginBottom:20}}>
                        <MyButton
                            title='Update'
                            onPress={() => saveProfile()}
                        />
                    </View>
                </View>
            </ScrollView>
            {loading && <LoadingBar/>}
        </View>
    )
}


const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };

const mapDispatchToProps = {
    updateAuthContact
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile);