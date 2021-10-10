import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import {connect} from 'react-redux';

function StartPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // useEffect(() => {
    //     console.log('auth ', props);
    //     if (props.auth && props.loginSuccess) {
    //       props.navigation.navigate('Drawer');
    //     }
    // }, [props, props.auth, props.loginSuccess, props.navigation]);

    return (
        <View >
            <StatusBar
                // animated={true}
                backgroundColor="#fff"
                barStyle='dark-content'
            />
            <ScrollView>
                <View style={{ alignItems:'center', marginTop: '2%' }}>
                    <Image  source={require('../assets/logo.png')}/>
                    <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10,color: '#000' }}>Welcome to PayKamsy</Text>
                    <Text style={{ fontFamily: 'bold', fontSize: 18, marginBottom:15, color: '#616161' }}>by Verithrust Ltd</Text>
                </View>
                
                        <MyButton
                            title='Login'
                            onPress={() => props.navigation.navigate('Login')}
                        />
                    <View style={styles.btnAction}>
                        <MyButton
                            title='Create new account'
                            onPress={() => props.navigation.navigate('Register')}
                        />
                    </View>
                    <View style={styles.btnAction}>
                        <MyButton
                            title='Generate an invoice'
                            onPress={() => props.navigation.navigate('Guest')}
                        />
                    </View>
                    <View style={styles.btnAction}>
                        <MyButton
                            title='Check invoice'
                            onPress={() => props.navigation.navigate('ChcekInvoice')}
                        />
                    </View>

                    <View style={styles.btnAction}>
                        <MyButton
                            title='Pay an invoice'
                            onPress={() => props.navigation.navigate('PayInvoice')}
                        />
                    </View>
                    <View style={styles.btnAction}>
                        <MyButton
                            title='Edit invoice'
                            onPress={() => props.navigation.navigate('PdfView')}
                        />
                    </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAction:{
        width:'100%', marginTop: '5%', alignSelf: 'center', 
    }
})

const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };
  
  export default connect(   
    mapStateToProps,
  )(StartPage);