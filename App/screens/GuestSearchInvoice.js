import React,{ Component } from "react";
import {Text, View, Image, StatusBar, ScrollView } from 'react-native';
import Title from '../components/Title';
import TitleInput from '../components/TitleInput';
import MyButton from '../components/MyButton';
import {SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

export default class GuestSearchInvoice extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            invoiceNo: '',
            password: ''
        }
    }

    async payInvoice(){
        if(!this.state.invoiceNo){
            alert('Kindly enter invoice no');
            return;
        }
        if(!this.state.password){
            alert('Kindly enter password');
            return;
        }
        this.setState({loading:true})
        try{
            const formData = new FormData();
            formData.append('invoice_no', this.state.invoiceNo);
            formData.append('password', this.state.password);
            const response = await fetch(`${SERVER_URL}search_invoice`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            console.log(responseJson);
            this.setState({loading:false});
            if(responseJson.status == 'error'){
                alert('No Record found. Kindly check the invoice number and password and try again');
            }else if(responseJson.status == 'success'){
                this.props.navigation.navigate('Guest',{edit:true, invoice: responseJson.invoice});
            }else{
                alert("Unknown Error occurred");
            }
        }catch(e){
            console.log("Invalid response from server", e);
            this.setState({loading:false});
            alert("Invalid response from server");
        }
    }

    render(){
        return(
            <View>
                <StatusBar
                    // animated={true}
                    backgroundColor="#fff"
                    barStyle='dark-content'
                />
                <Title
                    title={'Guest Edit Invoice'}
                    IconName={'arrow-left'}
                    color={'#000000'}
                    onPress={() => this.props.navigation.goBack()}
                />

                <ScrollView>
                    <View style={{ paddingLeft: 14, marginTop: '8%', marginBottom: '8%' }}>
                        <Image source={require('../assets/logo.png')} />
                        <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10, color: '#000' }}>Guest Edit Invoice</Text>
                    </View>
                    <View>
                        <TitleInput
                            value={this.state.invoiceNo}
                            title={'Invoice #'}
                            placeholder={'Enter Invoice number'}
                            onChangeText={value => {
                                this.setState({invoiceNo: value});
                            }}
                        />
                        <TitleInput
                            value={this.state.password}
                            title={'Password'}
                            secureTextEntry = {true}
                            placeholder={'Enter Password'}
                            onChangeText={value => {
                                this.setState({password: value});
                            }}
                        />
                        <MyButton
                            title='Search'
                            onPress={() => this.payInvoice()}
                        />
                    </View>
                </ScrollView>
                {this.state.loading && <LoadingBar/>}
            </View>
        );
    }

}