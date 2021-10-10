import { NavigationContainer } from '@react-navigation/native';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Alert} from 'react-native';
import Title from '../components/Title'
import TitleInput from '../components/TitleInput';
import { TextArea } from 'react-native-ui-lib';
import MyButton from '../components/MyButton';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDown from '../components/Dropdown';
import * as ImagePicker from 'react-native-image-picker'
import CountryPicker from 'react-native-country-picker-modal'
import CheckBox from '@react-native-community/checkbox';
import LoadingBar from '../components/LoadingBar';
import {SERVER_URL} from '../Global';
import {connect} from 'react-redux';
import moment from 'moment';
import RNFS from 'react-native-fs';


export default class Guest extends Component {

    constructor(props) {
        super(props);
        this.edit = this.props.route.params ? this.props.route.params.edit : false;
        this.preInvoice = this.props.route.params ? this.props.route.params.invoice : '';
        this.updateInvoice = true;
        if(this.edit == true){
            this.userDetail = JSON.parse(this.preInvoice.guest_user_detail);
            this.bankDetail = JSON.parse(this.preInvoice.guest_bank_detail);
            this.gsDetail = JSON.parse(this.preInvoice.invoice_gs_detail);
            this.isGoods = this.preInvoice.invoice_for == 0 ? true : false;
            this.isServices = this.preInvoice.invoice_for == 1 ? true : false;
            if(this.preInvoice.invoice_status != 'pending'){
                this.updateInvoice = false;
            }
        }
        this.state = {
            date: this.edit ? moment(this.preInvoice.expiry_date, 'YYYY-MM-DD') : moment(),
            choseGoods: this.edit ? (this.preInvoice.invoice_for == 0 ? true : false) : false,
            choseServices: this.edit ? (this.preInvoice.invoice_for == 1 ? true : false) : false,
            choseDeliveryYes: this.edit ? (this.preInvoice.delivery_require == 'yes' ? true : false) : false,
            choseDeliveryNo: this.edit ? (this.preInvoice.delivery_require == 'no' ? true : false) : false,
            loading:false,
            countryCode: '',
            toggleCheckBox:this.edit,

            invoiceNo: this.edit ? this.preInvoice.invoice_no : '',
            invoiceName: this.edit ? this.preInvoice.name : '',
            expiryDate: moment(this.edit ? this.preInvoice.expiry_date : ''),
            currency: this.edit ? this.preInvoice.name : '',
            bankName:'',
            amount: this.edit ? this.preInvoice.amount : '',
            detail: this.edit ? this.preInvoice.detail : '',
            invoiceFor: this.edit ? (this.preInvoice.invoice_for  == 0 ? 'Goods': 'Services') : 'Select',
            showPassword:true,
            invoicePassword: this.edit ? this.preInvoice.invoice_password : '',
            goods:{
                productName: this.edit && this.isGoods ? this.gsDetail.brand_name : '',
                model: this.edit && this.isGoods ? this.gsDetail.model_no : '',
                year: this.edit && this.isGoods ? this.gsDetail.year_of_manufacture : '',
                serialNo: this.edit && this.isGoods ? this.gsDetail.serial_no : '',
                condition: this.edit && this.isGoods ? this.gsDetail.product_condition : '',
                extraLink: this.edit && this.isGoods ? this.gsDetail.extra_link : '',
                images:'',
            },
            services:{
                serviceTitle: this.edit && this.isServices ? this.gsDetail.service_title : '',
                description:this.edit && this.isServices ? this.gsDetail.service_description : '',
            },
            deliveryOption: this.edit ? this.preInvoice.delivery_require : 'Select',
            delivery:{
                mode:this.edit && this.preInvoice.shipment_mode ? this.preInvoice.shipment_mode : 'Select',
                deliveryDays: this.edit && this.preInvoice.delivery_days ? this.preInvoice.delivery_days : '',
                cost:this.edit && this.preInvoice.shipment_cost ? this.preInvoice.shipment_cost : '',
                option: this.edit && this.preInvoice.delivery_option ? this.preInvoice.delivery_option : 'Select',
                contractDuration: this.edit && this.preInvoice.end_contract ? this.preInvoice.end_contract : '',
                whoPay: this.edit && this.preInvoice.pay_service_charges ? this.preInvoice.pay_service_charges : 'Select'
            },
            imagePath:[],
            guestUser:{
                fullName: this.edit ? this.userDetail.full_name : '',
                address: this.edit ? this.userDetail.address : '',
                city:this.edit ? this.userDetail.city : '',
                state:this.edit ? this.userDetail.state : '',
                zip: this.edit ? this.userDetail.zip : '',
                country: this.edit ? this.userDetail.country : '',
                countryCode: this.edit ? this.userDetail.country_code : '',
                phone: this.edit ? this.userDetail.phone : '',
                email: this.edit ? this.userDetail.email : '',
            },
            guestBankDetail:{
                bankName: this.edit ? this.bankDetail.bank_name : '',
                accountNo: this.edit ? this.bankDetail.account_no : '',
                code: this.edit ? this.bankDetail.short_code : '',
                address: this.edit ? this.bankDetail.bank_address : '',
                city: this.edit ? this.bankDetail.bank_city : '',
                state: this.edit ? this.bankDetail.bank_state : '',
                zip: this.edit ? this.bankDetail.bank_zip : '',
                country:this.edit ? this.bankDetail.bank_country : '',
                countryCode:this.edit ? this.bankDetail.bank_country_code : '',
                phone: this.edit ? this.bankDetail.bank_phone_no : '',
            }

        }
    }

    componentDidMount(){
        if(this.edit == false)
            this.loadInitData();
    }

    async loadInitData(){
        try{
            this.setState({loading:true});
            const response = await fetch(`${SERVER_URL}get_invoice_no`,{
                method:'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            this.setState({invoiceNo: responseJson.invoice_no});
        }catch(e){
            console.log('Invalid Response from server', e);
            alert('Invalid Response from server');
            this.setState({loading:false});
        }
    }

      renderImage(index){
          return(
            <ImageBackground source={{uri:this.state.imagePath[index].path}} 
                style={{margin:10, width:50, height:50}}>
                <TouchableOpacity style={{alignItems:'flex-end', paddingTop: -10}} 
                    onPress={()=> {
                        console.log(index);
                        let inputValues=this.state.imagePath;
                        inputValues.splice(index, 1);
                        this.setState({inputValues});
                    }}>
                    <Image source={require('../assets/close.png')}
                    style={{height: 20, width: 20,}}/>
                </TouchableOpacity>
            </ImageBackground>
          );
      }

      launchImageLibrary = async () => {
        if(this.state.imagePath.length >= 4){
            alert('Maximum 4 images allowed.');
            return;
        }
        let options = {
            title: 'Select Image',
            customButtons: [
              {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
              },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            quality: 0.5,
            base64: true
        };

       ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            // const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            console.log('url',response.assets[0].uri);
            
            RNFS.readFile(response.assets[0].uri, 'base64').then(res =>{
               let inputValues=this.state.imagePath;
                inputValues.push({
                    id: Math.random(),
                    path: response.assets[0].uri,
                    type: response.assets[0].type,
                    base64: res});
                this.setState({inputValues});
            });
            // ImgToBase64.getBase64String(response.assets[0].uri)
            // .then(base64String => console.log(base64String))
            // .catch(err => console.log(err));
          }
        });

      }

      async uploadImages(){
        if(this.state.imagePath.length > 0){
            console.log('total length', this.state.imagePath.length);
                const fd = new FormData();
                fd.append('image_array', JSON.stringify(this.state.imagePath));
                const responseImg = await fetch(`${SERVER_URL}upload_image`,{
                    method:'POST',
                    body: fd
                });
                const responseImgJson = await responseImg.json();
                console.log('upload complete')
                console.log(responseImgJson);
        }
      }

      async saveData(){
        if(!this.state.guestUser.fullName){
            alert('Enter user full name');
            return;
        }
        if(!this.state.guestUser.phone){
            alert('Enter user phone no');
            return;
        }
        if(!this.state.guestUser.email){
            alert('Enter user email');
            return;
        }
        if(!this.state.guestUser.address){
            alert('Enter user address');
            return;
        }
        if(!this.state.guestUser.city){
            alert('Enter user city');
            return;
        }
        if(!this.state.guestUser.state){
            alert('Enter user state');
            return;
        }
        if(!this.state.guestUser.zip){
            alert('Enter user zip code');
            return;
        }
        if(!this.state.guestUser.country){
            alert('Select user country');
            return;
        }
        if(!this.state.guestBankDetail.bankName){
            alert('Enter bank name');
            return;
        }
        if(!this.state.guestBankDetail.accountNo){
            alert('Enter account number');
            return;
        }
        if(!this.state.guestBankDetail.code){
            alert('Enter bank short code');
            return;
        }
        if(!this.state.guestBankDetail.address){
            alert('Enter bank address');
            return;
        }
        if(!this.state.guestBankDetail.city){
            alert('Enter bank city');
            return;
        }
        if(!this.state.guestBankDetail.state){
            alert('Enter bank state');
            return;
        }
        if(!this.state.guestBankDetail.zip){
            alert('Enter bank zip code');
            return;
        }
        if(!this.state.guestBankDetail.country){
            alert('Select bank country');
            return;
        }
        if(!this.state.guestBankDetail.phone){
            alert('Enter bank phone no');
            return;
        }

        if(!this.state.invoiceName){
            alert('Enter invoice name');
            return;
        }
        if(!this.state.currency){
            alert('Please select currency.');
            return;
        }
        if(!this.state.amount){
            alert('Enter amount for invoice');
            return;
        }
        if(!this.state.detail){
            alert('Enter invoice detail');
            return;
        }
        if(this.state.choseGoods ==false && this.state.choseServices == false){
            alert('Please select goods/Services');
            return;
        }
        if(this.state.choseDeliveryYes ==false && this.state.choseDeliveryNo == false){
            alert('Please select delivery options');
            return;
        }
        if(this.state.invoicePassword ==false){
            alert('Enter invoice password.');
            return;
        }
        if(this.state.toggleCheckBox ==false){
            alert('please accept terms & conditions.');
            return;
        }


          let formData = new FormData();
          if(this.edit == true){
              formData.append('invoice_id', this.preInvoice.id);
          }
          formData.append('user_full_name', this.state.guestUser.fullName);
          formData.append('user_address', this.state.guestUser.address);
          formData.append('user_city', this.state.guestUser.city);
          formData.append('user_state', this.state.guestUser.state);
          formData.append('user_zip', this.state.guestUser.zip);
          formData.append('user_country', this.state.guestUser.country);
          formData.append('user_country_code', this.state.guestUser.countryCode);
          formData.append('user_phone', this.state.guestUser.phone);
          formData.append('user_email', this.state.guestUser.email);

          formData.append('bank_name', this.state.guestBankDetail.bankName);
          formData.append('bank_account_no', this.state.guestBankDetail.accountNo);
          formData.append('bank_short_code', this.state.guestBankDetail.code);
          formData.append('bank_address', this.state.guestBankDetail.address);
          formData.append('bank_city', this.state.guestBankDetail.city);
          formData.append('bank_state', this.state.guestBankDetail.state);
          formData.append('bank_zip', this.state.guestBankDetail.zip);
          formData.append('bank_country', this.state.guestBankDetail.country);
          formData.append('bank_country_code', this.state.guestBankDetail.countryCode);
          formData.append('bank_phone_no', this.state.guestBankDetail.phone);
          
          formData.append('invoice_no', this.state.invoiceNo);
          formData.append('name', this.state.invoiceName);
          formData.append('expiry_date', this.state.date.format('YYYY-MM-DD'));
          formData.append('currency', this.state.currency);
          formData.append('amount', this.state.amount);
          formData.append('detail', this.state.detail);
          formData.append('invoice_status', 'pending');
          formData.append('invoice_password', this.state.invoicePassword);
          formData.append('guest_invoice', 1);
          
          if(this.state.choseGoods){
            formData.append('invoice_for', 0);
            formData.append('brand_name', this.state.goods.productName);
            formData.append('model_no', this.state.goods.model);
            formData.append('year_of_manufacture', this.state.goods.year);
            formData.append('product_condition', this.state.goods.condition);
            formData.append('extra_link', this.state.goods.extraLink);
            formData.append("image_array", JSON.stringify(this.state.imagePath));
          }
        if(this.state.choseServices){
            formData.append('invoice_for', 1);
            formData.append('service_title', this.state.services.serviceTitle);
            formData.append('service_description', this.state.services.description);
        }
        if(this.state.choseDeliveryYes == true){
            formData.append('delivery_require', 'yes');
            formData.append('shipment_mode', this.state.delivery.mode);
            formData.append('delivery_days', this.state.delivery.deliveryDays);
            formData.append('shipment_cost', this.state.delivery.cost);
            formData.append('delivery_option', this.state.delivery.option);
        }if(this.state.choseDeliveryNo == true){
            formData.append('delivery_require', 'no');
            formData.append('end_contract', this.state.delivery.contractDuration);
            formData.append('pay_service_charges', this.state.delivery.whoPay);
        }
        formData.append('invoice_type', 'guest');
        formData.append('app_user_id', '1');

        console.log('form data', formData);
        this.setState({loading:true});
        try{
            const response = await fetch(`${SERVER_URL}create_invoice`,{
                method:'POST',
                body:formData
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            console.log('res json', responseJson);
            if(responseJson.status == 'success'){
                Alert.alert(
                    'Invoice',
                    'invoice added successfully\nYour invoice no: '+
                    this.state.invoiceNo+"\nPassword: "+this.state.invoicePassword,
                    [
                      {text: 'OK', onPress: ()=>this.props.navigation.goBack()},
                    ], { cancelable: false }
                  );
            }else{
                alert('Unknown error occurred.');
            }
        }catch(e){
            this.setState({loading:false});
            console.log('Invalid Response from server', e);
            alert('Invalid Response from server');
        }

      }

      
    render() {
        const productConditionOptions =  ['New','Used','Refurbished','Damaged'];
        const shipmentModeOptions = ['Tracked Shipment','untracked Shipment'];
        const deliveryOptions = ['Delivery to address','Pickup from shipping agency'];
        const whoPayChargesOptions = ['Buyer','Client', 'Seller'];
        const currencyOptions = ['Euro', 'USD', 'CAD', 'Pound Sterling', 'Naira', 'Franc'];
        return (
            <View>
                <Title
                    title={'Guest Invoice'}
                    IconName={'arrow-left'}
                    color='#000'
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>

                    <View>
                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>User Detail</Text>
                            </View>
                            
                            <TitleInput
                                title={'Full Name'}
                                value={this.state.guestUser.fullName}
                                placeholder={'Enter Your Name'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.fullName = value;
                                    this.setState(inputValues);
                                }}
                            />

                            <TitleInput
                                title={'Phone Number'}
                                value={this.state.guestUser.phone}
                                placeholder={'Enter Your Phone Number'}
                                keyboardType={'numeric'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.phone = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Email'}
                                value={this.state.guestUser.email}
                                placeholder={'Enter Your Email'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.email = value;
                                    this.setState(inputValues);
                                }}
                            />

                            <TitleInput
                                title={'Address'}
                                value={this.state.guestUser.address}
                                placeholder={'Enter Your Address'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.address = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'City'}
                                value={this.state.guestUser.city}
                                placeholder={'Enter Your City'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.city = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'State'}
                                value={this.state.guestUser.state}
                                placeholder={'Enter Your State'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.state = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Zip/Postal Code'}
                                value={this.state.guestUser.zip}
                                placeholder={'Zip/Postal Code'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestUser;
                                    inputValues.zip = value;
                                    this.setState(inputValues);
                                }}
                            />

                            <View style={{ justifyContent: 'center', height: 45, borderColor: 'gray',
                             width: '90.6%', borderWidth: 1, paddingLeft: 10, marginLeft: 15,
                              borderRadius: 10, marginBottom: 15 }}>
                                <CountryPicker
                                    onSelect={(value) => {
                                        let inputValues=this.state.guestUser;
                                        inputValues.country = value.name;
                                        inputValues.countryCode = value.cca2;
                                        this.setState({inputValues})}
                                    }
                                    countryCode={this.state.guestUser.countryCode}
                                    withCountryNameButton='true'
                                />
                                
                            </View>
                        </View>
                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Account you will receive payment for this Invoice</Text>
                            </View>
                            <TitleInput
                                title={'Bank Name'}
                                value={this.state.guestBankDetail.bankName}
                                placeholder={'Enter Your bank name.'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.bankName = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Account Number'}
                                value={this.state.guestBankDetail.accountNo}
                                placeholder={'Enter Your Account No.'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.accountNo = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Code'}
                                keyboardType={'numeric'}
                                value={this.state.guestBankDetail.code}
                                placeholder={'Sort Code/Transit Code'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.code = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Address'}
                                value={this.state.guestBankDetail.address}
                                placeholder={'Bank Address'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.address = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'City'}
                                value={this.state.guestBankDetail.city}
                                placeholder={'Enter Your City'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.city = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'State'}
                                value={this.state.guestBankDetail.state}
                                placeholder={'Enter Your State'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.state = value;
                                    this.setState(inputValues);
                                }}
                            />
                            <TitleInput
                                title={'Zip/Postal Code'}
                                value={this.state.guestBankDetail.zip}
                                placeholder={'Zip/Postal Code'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.zip = value;
                                    this.setState(inputValues);
                                }}
                            />

                            <View style={{ justifyContent: 'center', height: 45, borderColor: 'gray', width: '90.6%', borderWidth: 1, paddingLeft: 10, marginLeft: 15, borderRadius: 10, marginBottom: 15 }}>
                            <CountryPicker
                                    onSelect={(value) =>{
                                        let inputValues=this.state.guestBankDetail;
                                        inputValues.country = value.name;
                                        inputValues.countryCode = value.cca2;
                                        this.setState({inputValues})}
                                    }
                                    countryCode={this.state.guestBankDetail.countryCode}
                                    withCountryNameButton='true'
                                />
                            </View>

                            <TitleInput
                                title={'Phone Number'}
                                value={this.state.guestBankDetail.phone}
                                placeholder={'Enter Phone Number'}
                                keyboardType={'numeric'}
                                onChangeText={value => {
                                    let inputValues=this.state.guestBankDetail;
                                    inputValues.phone = value;
                                    this.setState(inputValues);
                                }}
                            />

                        </View>

                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Contract</Text>
                            </View>
                            <Text style={{ marginBottom: 10, marginTop:20, paddingLeft: 16, color: '#000000', fontWeight: 'bold', fontSize: 15, paddingBottom: 7 }}>Invoice # {this.state.invoiceNo}</Text>
                            <TitleInput
                                title={'Choose a Name for this Invoice'}
                                placeholder={'Enter Contract Name'}
                                value={this.state.invoiceName}
                                onChangeText={value => this.setState({invoiceName: value}) }
                            />
                            <Text style={{ paddingLeft: 16, color: '#000000', fontSize: 15, paddingBottom: 7 }}>Expiry Date for this Transaction</Text>
                            <DatePicker
                                style={{ paddingLeft: 15, paddingRight: 15, width: '98%', marginBottom: 20 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-06-2018"
                                maxDate="01-06-2050"
                                confirmBtnText="Confirm"
                                showIcon={true}
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderRadius: 10,
                                    },
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateText: {
                                        textAlign: 'left',
                                        width: '95%',
                                    },
                                    placeholderText: {
                                        textAlign: 'left',
                                        width: '95%',
                                    },
                                }}
                                onDateChange={(date) => this.setState({date:moment(date, 'DD-MM-YYYY')})}
                            />

                            <DropDown
                                Name={'Currency'}
                                DefaultPlaceHolder={this.state.currency ? this.state.currency :'Select'}
                                options={currencyOptions}
                                onSelect={(index)=>{
                                    this.setState({currency: currencyOptions[index]});
                                }}
                            />

                            <TitleInput
                                title={'Amount'}
                                placeholder={'Enter Amount'}
                                value={this.state.amount}
                                onChangeText={value => this.setState({amount: value}) }
                            />
                        </View>


                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Additional Information</Text>
                            </View>
                            <TextInput
                                style={{ paddingLeft: 20, paddingRight: 20 }}
                                underlineColorAndroid="transparent"
                                placeholder="Enter detail"
                                placeholderTextColor="grey"
                                multiline={true}
                                value={this.state.detail}
                                onChangeText={value => this.setState({detail:value}) }
                            />
                        </View>

                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Goods/Services</Text>
                            </View>

                            <DropDown
                                Name={'Invoice for'}
                                DefaultPlaceHolder={this.state.invoiceFor}
                                options={['Goods','Services']}
                                onSelect={(index)=>{
                                    if(index == 0){
                                        this.setState({choseGoods: true, choseServices: false, invoiceFor:'Goods'});
                                    }else if(index == 1){
                                        this.setState({choseGoods: false, choseServices: true, invoiceFor:'Services'});
                                    }
                                }}
                            />

                            {this.state.choseGoods && <View style={{marginBottom:12}}>
                                <View style={{flexDirection:'row', marginRight:10, justifyContent:'space-between',}}>
                                    <Text style={{marginLeft:10, color:'#000'}} >Goods Detail</Text>
                                    <View style={{flexDirection:'row', alignItems:'center'}} >
                                        <CheckBox
                                            disabled={false}
                                            tintColors='#000'
                                            value={!this.state.choseGoods}
                                            onValueChange={(newValue) => console.log(newValue)}
                                        />
                                        <Text style={{color:'#773c10'}} >Not Applicable</Text>
                                    </View>
                                </View>
                                <TitleInput
                                    title={'Product/Brand Name'}
                                    placeholder={'Product/Brand Name'}
                                    value={this.state.goods.productName}
                                    onChangeText={value => {
                                        let inputValues=this.state.goods;
                                        inputValues.productName = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <TitleInput
                                    title={'Model'}
                                    placeholder={'Model..'}
                                    value={this.state.goods.model}
                                    onChangeText={value => {
                                        let inputValues=this.state.goods;
                                        inputValues.model = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <TitleInput
                                    title={'Serial #'}
                                    placeholder={'Product Serial No'}
                                    value={this.state.goods.serialNo}
                                    onChangeText={value => {
                                        let inputValues=this.state.goods;
                                        inputValues.serialNo = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <TitleInput
                                    title={'Year of Manufacture'}
                                    keyboardType={'numeric'}
                                    placeholder={'Year of Manufacture'}
                                    value={this.state.goods.year}
                                    onChangeText={value => {
                                        let inputValues=this.state.goods;
                                        inputValues.year = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <View style={{width:'100%'}}>
                                    <DropDown
                                    Name={'Product Condition'}
                                    DefaultPlaceHolder={'Select Product Condition'}
                                    options={productConditionOptions}
                                    onSelect={(index)=>{
                                        console.log(index);
                                        let inputValues=this.state.goods;
                                        inputValues.condition = productConditionOptions[index];
                                        this.setState(inputValues);
                                    }}
                                    />
                                </View>
                                <TitleInput
                                    title={'Extra Link'}
                                    placeholder={'Product Extra Links'}
                                    value={this.state.goods.extraLink}
                                    onChangeText={value => {
                                        let inputValues=this.state.goods;
                                        inputValues.extraLink = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <View style={{flexDirection:'row', flex:4}}>
                                    {this.state.imagePath.map((url, index)=>
                                        this.renderImage(index)
                                    )}
                                </View>
                                    <TouchableOpacity style={{paddingLeft:15, paddingRight:15}}
                                        onPress={()=>this.launchImageLibrary()}>
                                            <Text style={{borderWidth:1, padding:12, borderColor:'#773c10'}} >Chose product images</Text>
                                    </TouchableOpacity>
                            </View>}
                            {this.state.choseServices && <View style={{alignItems:'center', marginBottom:12}}>
                                <TitleInput
                                    title={'Service title'}
                                    placeholder={'Service title'}
                                    value={this.state.services.serviceTitle}
                                    onChangeText={value => {
                                        let inputValues=this.state.services;
                                        inputValues.serviceTitle = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <TitleInput
                                    title={'description'}
                                    multiline={true}
                                    placeholder={'description'}
                                    value={this.state.services.description}
                                    onChangeText={value => {
                                        let inputValues=this.state.services;
                                        inputValues.description = value;
                                        this.setState(inputValues);
                                    }}
                                />
                            </View>}
                            

                        </View>


                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Delivery</Text>
                            </View>

                            <DropDown
                                Name={'Delivery option'}
                                DefaultPlaceHolder={this.state.deliveryOption}
                                options={['Yes','No']}
                                onSelect={(index)=>{
                                    if(index == 0){
                                        this.setState({choseDeliveryYes: true, choseDeliveryNo:false});
                                    }else if(index == 1){
                                        this.setState({choseDeliveryYes: false,choseDeliveryNo:true});
                                    }
                                }}
                            />

                            {this.state.choseDeliveryYes && <View style={{marginBottom:12}}>
                                <DropDown
                                    Name={'Mode of shipment?'}
                                    DefaultPlaceHolder={this.state.delivery.mode}
                                    options={shipmentModeOptions}
                                    onSelect={(index)=>{
                                        let inputValues=this.state.delivery;
                                        inputValues.mode = shipmentModeOptions[index];
                                        this.setState(inputValues);
                                    }}
                                />
                                <TitleInput
                                    title={'No of delivery days'}
                                    placeholder={'Max 60 days'}
                                    value={this.state.delivery.deliveryDays}
                                    onChangeText={value => {
                                        let inputValues=this.state.delivery;
                                        inputValues.deliveryDays = value;
                                        this.setState(inputValues);
                                    }}
                                />

                                <TitleInput
                                    title={'Cost of shipment'}
                                    keyboardType={'numeric'}
                                    placeholder={'Cost of shipment'}
                                    value={this.state.delivery.cost}
                                    onChangeText={value => {
                                        let inputValues=this.state.delivery;
                                        inputValues.cost = value;
                                        this.setState(inputValues);
                                    }}
                                />
                                <DropDown
                                    Name={'Delivery option'}
                                    DefaultPlaceHolder={'Select delivery options'}
                                    options={deliveryOptions}
                                    onSelect={(index)=>{
                                        let inputValues=this.state.delivery;
                                        inputValues.option = deliveryOptions[index];
                                        this.setState(inputValues);
                                    }}
                                />
                                
                            </View>}

                            {this.state.choseDeliveryNo && <View style={{marginBottom:12}}>
                                <TitleInput
                                    title={'When will the contract end'}
                                    placeholder={'Max 60 days'}
                                    value={this.state.delivery.contractDuration}
                                    onChangeText={value => {
                                        let inputValues=this.state.delivery;
                                        inputValues.contractDuration = value;
                                        this.setState(inputValues);
                                    }}
                                />

                                <DropDown
                                    Name={'Who will pay service charges'}
                                    DefaultPlaceHolder={this.state.delivery.whoPay}
                                    options={whoPayChargesOptions}
                                    onSelect={(index)=>{
                                        let inputValues=this.state.delivery;
                                        inputValues.whoPay = whoPayChargesOptions[index];
                                        this.setState(inputValues);
                                    }}
                                />
                                
                                
                            </View>}
                            

                        </View>

                        <View style={{ flexDirection:'row', alignItems:'center', marginTop: 20, paddingLeft: 10 }}>
                            <TitleInput
                                title={'Password'}
                                value={this.state.invoicePassword}
                                secureTextEntry={this.state.showPassword}
                                placeholder={'Enter Your Password'}
                                value={this.state.invoicePassword}
                                onChangeText={value => {
                                    this.setState({invoicePassword:value});
                                }}
                            />

                            <TouchableOpacity
                                style={{marginLeft: -70, zIndex: 1000}}
                                onPress={() => {
                                    this.setState({showPassword: !this.state.showPassword})
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{width: 30, height: 30,}}
                                    source={
                                        this.state.showPassword
                                        ? require('./../assets/hide.png')
                                        : require('./../assets/view.png')
                                    }
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Terms and conditions</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginLeft:10, marginBottom:10}}>
                                <CheckBox
                                    disabled={false}
                                    value={this.state.toggleCheckBox}
                                    onValueChange={(newValue) => this.setState({toggleCheckBox:newValue})}
                                />
                                <Text>Accept</Text><Text style={{textDecorationLine: 'underline'}}>Terms and Conditions</Text>
                            </View>
                        </View> 
                        {this.updateInvoice &&
                        <View style={{ marginTop: 20, marginBottom: 30 }}>
                            <MyButton
                                title={this.edit ? 'Update invoice': 'Create Invoice'}
                                onPress={() => this.saveData()}
                            />
                        </View>
                        }
                        


                        <View style={{ marginBottom: 50 }}></View>



                    </View>
                </ScrollView>
                {this.state.loading && <LoadingBar/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headingBorder:{
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10 
    },
    headingBackground:{
        height: 45, 
        backgroundColor: '#773c10', 
        justifyContent: 'center',
        marginBottom: 20, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },
    headingText:{
        color: '#fff',
        fontSize: 16,
        paddingLeft: 18 
    }
});