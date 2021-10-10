import React from 'react';
import {View, Text, StatusBar, Image, TextInput, ScrollView, Alert} from 'react-native';
import TitleInput from '../components/TitleInput';
import Title from '../components/Title'
import MyButton from '../components/MyButton';
import {connect} from 'react-redux';
import{SERVER_URL} from '../Global';
import LoadingBar from '../components/LoadingBar';

class Disputes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            invoiceId:'',
            title:'',
            description:''
        }
    }

    saveDispute = async () =>{
        if(!this.state.invoiceId){
            alert('Enter invoice id');
            return;
        }if(!this.state.title){
            alert('Enter title');
            return;
        }if(!this.state.description){
            alert('Enter description');
            return;
        }
        this.setState({loading: true});
        try{
            const formData = new FormData();
            formData.append('invoice_id', this.state.invoiceId);
            formData.append('title', this.state.title);
            formData.append('description', this.state.description);
            formData.append('user_id', this.props.auth.user.id);
            const response = await fetch(`${SERVER_URL}create_disputes`,{
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({loading:false});
            if(responseJson.status == 'success'){
                Alert.alert('Success..',
                'Dispute submitted successfully.',
                [{title:'OK', onPress:()=>this.props.navigation.goBack()}],
                {cancelable:false}
                );
            }else{
                alert('Invalid response from server, try again');
            }
        }catch(e){
            this.setState({loading: false});
            console.log('Invalid response from server',e);
            alert('Invalid response from server');
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
                    title={'Disputes'}
                    IconName={'arrow-left'}
                    color={'#000000'}
                    onPress={() => this.props.navigation.goBack()}
                />

            <ScrollView>
            <View style={{ paddingLeft: 14, marginTop: '8%' }}>
                <Image
                    source={require('../assets/logo.png')}
                />
                <Text style={{ fontFamily: 'bold', fontSize: 22, marginTop: 10, color: '#000' }}>Raise Dispute</Text>
                <Text style={{ fontSize: 14, marginTop: 8, color: '#000000', marginBottom: 10 }}>Please provide dispute detail</Text>
            </View>
            <View>
                <TitleInput
                    title={'Invoice Id #'}
                    value={this.state.invoiceId}
                    placeholder={'Invoice Id #'}
                    onChangeText={value => {
                        this.setState({invoiceId: value});
                    }}
                />
                <TitleInput
                    title={'Title'}
                    placeholder={'dispute title'}
                    value={this.state.title}
                    onChangeText={value => {
                        this.setState({title: value});
                    }}
                />
                <Text style={{ color: '#000000', fontSize: 15, paddingLeft: 16, paddingBottom: 7 }}>
                    Description
                </Text>
                <TextInput
                    style={{justifyContent: "flex-start", borderWidth:1, borderColor:'#969393', marginLeft:14, marginRight:20,
                    borderRadius: 10,}}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                    value={this.state.notes}
                    textAlignVertical='top'
                    onChangeText={(value)=> this.setState({description:value}) }
                />
                <View style={{marginTop:20}}>
                    <MyButton
                        title='Submit'
                        onPress={() => this.saveDispute() }
                    />
                </View>

                </View>
                </ScrollView>
                {this.state.loading && <LoadingBar/>}
            </View>
        );
    }

}

const mapStateToProps = state => {
    const {loginSuccess, auth, loading} = state.login;
    return {loginSuccess, loading, auth};
}

export default connect(mapStateToProps)(Disputes);