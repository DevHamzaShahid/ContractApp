import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
export default function DropDown(props){
    
    return(
        <View style={{ paddingLeft: 14, paddingRight: 14, marginBottom: '7%' }}>
        <Text style={{ color: '#000000', fontSize: 15, paddingLeft: 2, paddingBottom: 7 }}>{props.Name}</Text>
        <ModalDropdown
            style={{ paddingLeft: 10, justifyContent: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 10, width: '98%', height: 48 }}
            isFullWidth={true}
            dropdownTextStyle={{ paddingLeft: 10, fontSize: 15, color: '#000000', }}
            // dropdownStyle={{height:'auto'}}
            defaultValue={props.DefaultPlaceHolder}
            textStyle={{ fontSize: 15, color: '#000000' }}
            onSelect={props.onSelect}
            options={props.options} />

    </View>
    );
}