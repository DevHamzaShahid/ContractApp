import {Input} from 'react-native-elements';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function MyDropDown(props) {
  const [value, setValue] = useState(props.value ? props.value : '');
  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      value={props.value}
      style={pickerSelectStyles}
      onValueChange={(value, index) => {
        // const item = index > 0 ? props.items[index - 1] : {};
        // props.onValueChange
        //   ? props.onValueChange(value, index, item)
        //   : null;
        console.log('Hello');
      }}
      items={props.items}
      placeholder={{label: props.placeholder, value: null}}
      onClose={()=>{
        props.onClose
          ? props.onClose()
          : null;
      }}
    />
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: '93%',
    width: '100%',
    fontSize: wp('3.26%'),
    paddingVertical: hp('1.4%'),
    paddingHorizontal: wp('1%'),
    borderWidth: 0,
    borderRadius: 4,
    color: '#333333',
    textAlign: 'left',
    backgroundColor: '#fff',
    paddingRight: 30,
    fontWeight: 'bold',
    borderColor: '#E7E7E7',
    borderBottomWidth: 1,
  },
  iconContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('0%'),
  },
  inputAndroid: {
    width: '100%',
    minWidth: '93%',
    fontSize: wp('3.26%'),
    paddingHorizontal: wp('1.4%'),
    paddingVertical: hp('1%'),
    borderRadius: 4,
    color: '#333333',
    backgroundColor: '#fff',
    paddingRight: 30,
    fontWeight: 'bold',
    borderColor: '#E7E7E7',
    borderBottomWidth: 1,
    textAlign: 'left',
  },
  placeholder: {
    textAlign: 'left',
    color: '#333333',
  },
});
