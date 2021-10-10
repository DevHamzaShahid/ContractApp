import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Splashscreen() {

    return (
        <View style={{ height: 182, width: 150, marginBottom: '5%' }}>
            <Image
                source={require('../assets/SplashScreen.png')}
            />
        </View>
    )
}