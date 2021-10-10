import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Title from '../components/Title'
import MyButton from '../components/MyButton';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.state={
            invoiceNo:'',
            invoice:{},
            loading:false,
        }
    }

    async searchInvoice(){
        if(!this.state.invoiceNo){
            alert('Enter invoice number');
            return;
        }
        this.setState({loading:true})
        try{
            const formData = new FormData();
            formData.append('invoice_no', this.state.invoiceNo);
            const response = await fetch(`${SERVER_URL}search_invoice`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            console.log(responseJson);
            if(responseJson.status == 'error'){
                alert('Invoice not found');
            }else if(responseJson.status == 'success'){
                this.props.navigation.navigate('InvoiceDetail',{
                    invoice: responseJson.invoice, bankDetail: responseJson.bank_detail});
            }else{
                alert("Unknown Error occurred");
            }
        }catch(e){
            console.log("Invalid response from server");
            this.setState({loading:false});
            alert("Invalid response from server");
        }

    }

    render(){
        return (
            <View >
                <Title
                    title={'Buyer'}
                    IconName={'menu'}
                    onPress={() => this.props.navigation.openDrawer()}
                />
                <View style={{ marginTop: '5%' }}>
                    <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/logo.png')}
                        />
                        <Text style={{ fontSize: 22, fontFamily: 'bold', color: '#000000', marginTop: 8 }}>Search Your Invoice</Text>

                    </View>
                    <View style={{ alignSelf: 'center', width: '90%', marginTop: '5%' }}>

                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 4, height: 60, paddingLeft: 1, }}
                            // onChangeText={onChangeNumber}
                            underlineColor='transparent'
                            // value={number}
                            left={<TextInput.Icon name="pencil" />}
                            placeholder="Enter Invoice No."
                            onChangeText={text => this.setState({invoiceNo: text})}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <MyButton
                            title={'Search'}
                            onPress={()=>this.searchInvoice()}
                        />
                    </View>

                </View>
                {this.state.loading && <LoadingBar/>}
            </View>
        )
    }
}