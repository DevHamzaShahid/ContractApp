import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, StatusBar,
    TouchableOpacity, Alert, Image, ImageBackground, TouchableHighlight } from 'react-native';
import Title from '../components/Title'
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import DatePicker from 'react-native-datepicker';
import DropDown from '../components/Dropdown';
import * as ImagePicker from "react-native-image-picker";
import CheckBox from '@react-native-community/checkbox';
import LoadingBar from '../components/LoadingBar';
import {SERVER_URL} from '../Global';
import {connect} from 'react-redux';
import moment from 'moment';
import ImgToBase64 from 'react-native-image-base64';

class EditInvoice extends Component{

    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            choseGoods: false,
            choseServices: false,
            choseDeliveryYes: false,
            choseDeliveryNo: false,
            loading:false,
            countryCode: '',
            toggleCheckBox:false,

            invoiceNo:'',
            invoiceName:'',
            expiryDate:'',
            currency:'',
            amount:'',
            detail:'',
            invoiceFor:'',
            goods:{
                productName:'',
                model:'',
                year:'',
                serialNo:'',
                condition:'',
                extraLink:'',
                images:'',
            },
            services:{
                serviceTitle:'',
                description:'',
            },
            deliveryOption:'',
            delivery:{
                mode:'',
                deliveryDays:'',
                cost:'',
                option:'',
                contractDuration:'',
                whoPay:''
            },
            imagePath:[]

        }
    }

    componentDidMount(){
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
            this.state.imagePath.push(response.assets[0].uri)

            // ImgToBase64.getBase64String(response.assets[0].uri)
            // .then(base64String => console.log(base64String))
            // .catch(err => console.log(err));

            this.setState({});
          }
        });

      }

      renderImage(index){
          return(
            <ImageBackground source={{uri:this.state.imagePath[index]}} 
                style={{margin:10, width:50, height:50}}>
                <TouchableOpacity style={{alignItems:'flex-end', marginTop: -10}} 
                    onPress={()=> {
                        console.log(index);
                        this.state.imagePath.splice(index, 1);
                        this.setState({});
                    }}>
                    <Image source={require('../assets/close.png')}
                    style={{height: 20, width: 20,}}/>
                </TouchableOpacity>
            </ImageBackground>
          );
      }

      async saveData(){

        if(!this.state.invoiceName){
            alert('Enter invoice name');
            return;
        }
        if(!this.state.currency){
            alert('Please select currency');
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
        if(this.state.toggleCheckBox ==false){
            alert('please accept terms & conditions.');
            return;
        }
          let formData = new FormData();
          formData.append('invoice_no', this.state.invoiceNo);
          formData.append('name', this.state.invoiceName);
          formData.append('expiry_date', this.state.date.format('YYYY-MM-DD'));
          formData.append('currency', this.state.currency);
          formData.append('amount', this.state.amount);
          formData.append('detail', this.state.detail);
          formData.append('invoice_status', 'pending');
          if(this.state.choseGoods){
            formData.append('invoice_for', 0);
            formData.append('brand_name', this.state.goods.productName);
            formData.append('model_no', this.state.goods.model);
            formData.append('year_of_manufacture', this.state.goods.year);
            formData.append('product_condition', this.state.goods.condition);
            formData.append('extra_link', this.state.goods.extraLink);
            formData.append('images', this.state.goods.images);

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
            formData.append('contract_duration', this.state.delivery.contractDuration);
            formData.append('who_pay', this.state.delivery.whoPay);
        }
        formData.append('invoice_type', 'user');
        formData.append('app_user_id', this.props.auth.user.id);

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
                    responseJson.msg,[
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


    render(){

        const productConditionOptions =  ['New','Used','Refurbished','Damaged'];
        const shipmentModeOptions = ['Tracked Shipment','untracked Shipment'];
        const deliveryOptions = ['Delivery to address','Pickup from shipping agency'];
        const whoPayChargesOptions = ['Buyer','Client', 'Seller'];
        const currencyOptions = ['Euro', 'USD', 'CAD', 'Pound Sterling', 'Naira', 'Franc'];

        return (
            <View>
                <StatusBar
                // animated={true}
                    backgroundColor="#fff"
                    barStyle='dark-content'
                
                    />
                <Title
                    title={'Contract Form'}
                    IconName={'arrow-left'}
                    color={'#000000'}
                    onPress={() => this.props.navigation.goBack()}
                />

                <ScrollView>
                    <View style={{ flex: 1 }}>
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
                            <Text style={{ paddingLeft: 16, color: '#000000', fontSize: 15, paddingBottom: 7 }}>Expiry Date</Text>
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
                                DefaultPlaceHolder={'Select'}
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
                                DefaultPlaceHolder={'Select'}
                                options={['Goods','Services']}
                                onSelect={(index)=>{
                                    if(index == 0){
                                        this.setState({choseGoods: true, choseServices: false});
                                    }else if(index == 1){
                                        this.setState({choseGoods: false, choseServices: true});
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
                                DefaultPlaceHolder={'Select'}
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
                                    DefaultPlaceHolder={'Select'}
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
                                    DefaultPlaceHolder={'Select service charges'}
                                    options={whoPayChargesOptions}
                                    onSelect={(index)=>{
                                        let inputValues=this.state.delivery;
                                        inputValues.whoPay = whoPayChargesOptions[index];
                                        this.setState(inputValues);
                                    }}
                                />
                                
                                
                            </View>}
                            

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
                                <Text>Accept </Text><Text style={{textDecorationLine: 'underline'}}>Terms and Conditions</Text>
                            </View>
                        </View>


                        <View style={{ marginTop: 20, marginBottom: 50 }}>
                            <MyButton
                                title={'Create invoice'}
                                onPress={() => this.saveData() }
                            />
                        </View>

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
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },
    headingText:{
        color: '#fff',
        fontSize: 16,
        paddingLeft: 18 
    }
});

const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
  };
    
  export default connect(
    mapStateToProps,
  )(EditInvoice);
  