import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Title(props) {

    return (
        <View style={{ marginTop: '3%', paddingLeft: 6, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'flex-start' }}>
                <Icon name={props.IconName} size={36} color={props.color ? props.color:'gray'} onPress={() => props.onPress()} />
            </View>
            <View style={{ alignItems: 'center', position: 'absolute', width: '100%', marginTop: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>{props.title}</Text>
            </View>
        </View>
    );
}