import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native'

export default function MyButton(props){
    
    return(
        <TouchableOpacity style={{width:'90%', alignSelf:'center'}}
            onPress={()=>props.onPress()}>
            <View style={{ backgroundColor: '#773c10', alignItems: 'center', height: 59, justifyContent: 'center', borderRadius: 4, width: '100%' }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}