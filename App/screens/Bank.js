import React, {Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import Title from '../components/Title';
import ModalDropdown from 'react-native-modal-dropdown';
import CountryPicker from 'react-native-country-picker-modal'
import DropDown from '../components/Dropdown';
import {SERVER_URL} from '../Global';
import {connect} from 'react-redux';
import {updateAuthContact} from '../containers/actions/login';
import LoadingBar from '../components/LoadingBar';

class Bank extends Component {

    constructor(props){
        super(props);
        this.bankDetail = props.auth.user.bank_detail ? JSON.parse(props.auth.user.bank_detail) : '';
        console.log(this.bankDetail);
        this.state = {
            loading: false,
            bankName: this.bankDetail ? this.bankDetail.bank_name : '',
            accountNo: this.bankDetail ? this.bankDetail.account_no : '',
            code: this.bankDetail ? this.bankDetail.short_code : '',
            address: this.bankDetail ? this.bankDetail.bank_address : '',
            city: this.bankDetail ? this.bankDetail.bank_city : '',
            state: this.bankDetail ? this.bankDetail.bank_state : '',
            zip: this.bankDetail ? this.bankDetail.bank_zip : '',
            country: this.bankDetail ? this.bankDetail.bank_country : '',
            countryCode: this.bankDetail ? this.bankDetail.bank_country_code : '',
            phone: this.bankDetail ? this.bankDetail.bank_phone_no : '',
        }
    }

    saveBankData = async () =>{
        if(!this.state.accountNo){
            alert('Enter account number');
            return;
        }
        if(!this.state.address){
            alert('Enter bank address');
            return;
        }
        if(!this.state.city){
            alert('Enter bank city');
            return;
        }
        if(!this.state.state){
            alert('Enter bank state');
            return;
        }
        if(!this.state.country){
            alert('Select bank country');
            return;
        }
        if(!this.state.phone){
            alert('Enter bank phone no');
            return;
        }
        try{
            this.setState({loading:true});
            let formData = new FormData();
            formData.append('bank_name', this.state.bankName);
            formData.append('bank_account_no', this.state.accountNo);
            formData.append('bank_short_code', this.state.code);
            formData.append('bank_address', this.state.address);
            formData.append('bank_city', this.state.city);
            formData.append('bank_state', this.state.state);
            formData.append('bank_zip', this.state.zip);
            formData.append('bank_country', this.state.country);
            formData.append('bank_country_code', this.state.countryCode);
            formData.append('bank_phone_no', this.state.phone);
            formData.append('user_id', this.props.auth.user.id);
            const response = await fetch(`${SERVER_URL}add_user_bank_detail`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            this.props.updateAuthContact(responseJson);
            alert('Bank detail updated successfully');
            // if(responseJson.status == 'success'){
            //     Alert.alert(
            //         'Success..',
            //         'Bank detail updated successfully',
            //         [{text:'ok', onPress:()=>this.props.navigation.goBack()}],
            //         {cancelable:false}
            //     );
            // }
        }catch(e){
            this.setState({loading:false});
            console.log('Invalid response from server',e);
            alert('Invalid response from server');
        }
    }



    render(){
        return (

            <View style={{ flex: 1 }}>

                <Title
                    title={'Bank Account'}
                    IconName={'arrow-left'}
                    color={'#000000'}

                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingLeft: 14, marginTop: '8%' }}>
                        {/* <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 8, color: '#000', marginBottom: 8 }}></Text> */}
                    </View>
                    <View>
                    <TitleInput
                        value = {this.state.bankName}
                        title={'Bank Name'}
                        placeholder={'Enter Your bank name.'}
                        onChangeText={value => {
                            this.setState({bankName: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.accountNo}
                        title={'Account Number'}
                        placeholder={'Enter Your Account No.'}
                        onChangeText={value => {
                            this.setState({accountNo: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.code}
                        title={'Code'}
                        keyboardType={'numeric'}
                        placeholder={'Sort Code/Transit Code'}
                        onChangeText={value => {
                            this.setState({code: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.address}
                        title={'Address'}
                        placeholder={'Bank Address'}
                        onChangeText={value => {
                            this.setState({address: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.city}
                        title={'City'}
                        placeholder={'Enter Your City'}
                        onChangeText={value => {
                            this.setState({city: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.state}
                        title={'State'}
                        placeholder={'Enter Your State'}
                        onChangeText={value => {
                            this.setState({state: value});
                        }}
                    />
                    <TitleInput
                        value = {this.state.zip}
                        title={'Zip/Postal Code'}
                        placeholder={'Zip/Postal Code'}
                        onChangeText={value => {
                            this.setState({zip: value});
                        }}
                    />

                    <View style={{ justifyContent: 'center', height: 45, borderColor: 'gray', width: '90.6%', borderWidth: 1, paddingLeft: 10, marginLeft: 15, borderRadius: 10, marginBottom: 15 }}>
                    <CountryPicker
                            onSelect={(value) =>{
                                this.setState({
                                    country: value.name,
                                    countryCode: value.cca2
                                    })
                                }
                            }
                            countryCode={this.state.countryCode}
                            withCountryNameButton='true'
                        />
                    </View>

                    <TitleInput
                        value = {this.state.phone}
                        title={'Phone Number'}
                        placeholder={'Enter Phone Number'}
                        keyboardType={'numeric'}
                        onChangeText={value => {
                            this.setState({phone:value});
                        }}
                    />
                        <MyButton
                            title='Submit'
                            onPress={() => this.saveBankData()}
                        />
                    </View>
                </ScrollView>
                {this.state.loading && <LoadingBar/>}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,

        marginHorizontal: 20,

        justifyContent: "center",
    },
});

const mapStateToProps = state =>{
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
}
const mapDispatchToProps = {
    updateAuthContact
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Bank);