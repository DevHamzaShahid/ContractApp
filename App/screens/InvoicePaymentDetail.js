import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView ,StatusBar, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleInput from '../components/TitleInput';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import MyButton from '../components/MyButton';
import {SERVER_URL, getCurrencySymble} from '../Global';
import LoadingBar from '../components/LoadingBar';

export default class InvoicePaymentDetail extends React.Component{

    constructor(props){
        super(props);
        this.invoice = this.props.route.params.invoice;
        this.state = {
            loading:false,
            date: moment(),
            transactionName:'',
            bankName:'',
            amountPaid:0,
            transactionRef:'',
        }
    }

    saveAmount = async()=>{
        if(!this.state.transactionName){
            alert('Enter transaction name');
            return;
        }
        if(!this.state.bankName){
            alert('Enter bank name');
            return;
        }if(!this.state.amountPaid && this.state.amountPaid >0){
            alert('Enter amount paid');
            return;
        }
        this.setState({loading:true});
        try{
            const formData = new FormData();
            formData.append('transaction_name', this.state.transactionName);
            formData.append('bank_name', this.state.bankName);
            formData.append('paid_amount', this.state.amountPaid);
            formData.append('paid_date', this.state.date.format('YYYY-MM-DD'));
            formData.append('reference_no', this.state.transactionRef);
            formData.append('invoice_id', this.invoice.id);
            const response = await fetch(`${SERVER_URL}create_payment`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            if(responseJson.status == 'success'){
                Alert.alert(
                    'Success..',
                    'Payment detail addedd successfully',
                    [{text:'OK', onPress: ()=>this.props.navigation.goBack()}],
                    {cancelable: false}
                );
            }
        }catch(e){
            console.log('Invalid server response', e);
            this.setState({loading:false});
            alert('Invalid server response');
        }
    }

    render(){
        return(
            <View>
                <StatusBar
                    // animated={true}
                        backgroundColor="#773c10"
                        barStyle='light-content'
                    
                        />
                <View style={{  backgroundColor:'#773c10',paddingLeft: 6, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'flex-start', paddingBottom:10 }}>
                        <Icon name='arrow-left' size={26} color='#fff' onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', width: '100%', marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Pay Invoice</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ justifyContent: 'center', height: 140, width: '100%', backgroundColor: '#773c10' }}>
                            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start', marginBottom: 20 }}><Text style={{ color: '#fff', fontSize: 22 }}>INVOICE #</Text></View>
                                    <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}><Text style={{ color: '#fff', fontSize: 22 }}>{this.invoice.invoice_no}</Text></View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ justifyContent: 'flex-start', }}>
                                        <Text style={{ color: '#fff', fontSize: 34, fontWeight: 'bold' }}>{getCurrencySymble(this.invoice.currency)}{this.invoice.amount}</Text>
                                        <Text style={{ color: '#fff', fontSize: 16, }}>Total Balance</Text>
                                    </View>
                                    <View >
                                        <Text style={{ color: '#fff', fontSize: 34, textAlign:'right', fontWeight: 'bold' }}>{getCurrencySymble(this.invoice.currency)}{this.invoice.amount_received}</Text>
                                        <Text style={{ color: '#fff',textAlign:'right', fontSize: 16, }}>Received Amount</Text>
                                    </View>

                                </View>
                            </View>
                    </View>

                    <View style={styles.headingBorder}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.headingText}>Payment Details</Text>
                            </View>
                            
                            <TitleInput
                                value = {this.state.transactionName}
                                title={'Name used in Payment'}
                                placeholder={'Enter Name used in Payment'}
                                onChangeText={value => {
                                    this.setState({transactionName: value});
                                }}
                            />

                            <TitleInput
                                value = {this.state.bankName}
                                title={'Bank Name'}
                                placeholder={'Enter Bank used in transaction'}
                                onChangeText={value => {
                                    this.setState({bankName: value});
                                }}
                            />
                            <TitleInput
                                value = {this.state.amountPaid}
                                title={'Amount paid'}
                                keyboardType={'numeric'}
                                placeholder={'Enter amount paid'}
                                onChangeText={value => {
                                    this.setState({amountPaid: value});
                                }}
                            />
                            <Text style={{ paddingLeft: 16, color: '#000', fontSize: 15, paddingBottom: 7 }}>Date</Text>
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

                            <TitleInput
                                value = {this.state.transactionRef}
                                title={'Transaction Ref #'}
                                placeholder={'Enter Transaction Ref #:'}
                                onChangeText={value => {
                                    this.setState({transactionRef: value});
                                }}
                            />

                    </View>
                    <View style={{ marginTop: 20, marginBottom: 50 }}>
                        <MyButton
                            title={'Complete Payment'}
                            onPress={() => this.saveAmount()}
                        />
                    </View>
                </ScrollView>
                {this.state.loading && <LoadingBar/>}
            </View>
        );
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

