import React, { Component } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import Title from '../components/Title';

class SimpleTrans extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    IconName={'keyboard-backspace'}
                    title={'Simple And Transparent Pricing'}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                        <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Simple and Transparent Pricing
                            {'\n'}{'\n'}
                        </Text>
                        PayKamsy's pricing schemes are affordable to both buyers and sellers, our mission and objective is hinged on rendering premium services.
                        {'\n'}{'\n'}
                        <Text style={{ fontWeight: 'bold' ,color:'#000'}}>Local Transactions{'\n'}
                            5% of the total transaction value</Text>
                        {'\n'}{'\n'}

                        Applicable only to transactions originating from Nigeria, this includes deposits from Nigerian banks and credit/debit cards.
                        {'\n'} The minimum service capped fee is N350
                        {'\n'}
                        {'\n'}
                        <Text style={{ fontWeight: 'bold' ,color:'#000'}}>
                            International Transactions{'\n'}
                            7% of the total transaction value
                        </Text>
                        {'\n'}
                        Applicable to transactions originating from anywhere outside Nigeria, this includes deposits from non-Nigerian banks. •
                        {'\n'}
                        Enjoy same features available for local transactions
                        {'\n'}
                        Kindly note that it is completely free of charge to start a transaction on PayKamsy.
                        {'\n'}
                        You would not have to pay any fees when nothing has been done.
                        {'\n'}
                        Hence, you would not lose any money whenever you decide to change your mind about a transaction even after initial start-up.
                        {'\n'}
                        The percentage commission is only applicable when an actual payment has been made, thus making it important to assign the task of overseeing the transaction to an expert official.
                        {'\n'}{'\n'}
                        <Text style={{ fontWeight: 'bold',color:'#000' }}>
                            A minimum service fee cap of N350

                        </Text>
                        {'\n'}
                        The threshold of the service fee is N350, a minimum fee of N350 is to be paid in case 5% or 7% (as applicable) of the transaction value falls below price.
                        {'\n'}
                        For example, if PayKamsy is used in paying for a local transaction whose value is N5,000, the escrow service fee will be rated at N350 instead of N250 (i.e., 5% of the N5,000 transaction value).

                    </Text>


                </View>
                </ScrollView>
            </View>
        );
    }
}

export default SimpleTrans;