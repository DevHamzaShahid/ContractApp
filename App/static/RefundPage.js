import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import Title from '../components/Title';

class RefundPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    IconName={'keyboard-backspace'}
                    title={'Refund Policy'}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Refund Policy
                                {'\n'}
                            </Text>
                            A Buyer is expected to confirm the receipt of goods and services within 3 hours of delivery. PayKamsy automatically releases the payment to the Seller if the Buyer refuses to confirm the receipt of purchased items.
                            {'\n'}
                            A Buyer may raise a query within 3 hours of obtaining the goods to halt the release of funds to the Seller, if our dispute department agrees with the disputation of the Buyer, then the purchased item has to be returned in the same condition to the Seller, while a refund is sent to the Buyer.

                            {'\n'}
                            The buyer has an option to ‘Accept’ or ‘Reject’ their purchases on the transaction page.
                            {'\n'}
                            A Buyer has 3 hours to confirm after the receipt of the good/services. If the buyer doesn’t confirm the receipt, PayKamsy will automatically release the payment to seller. Buyer must raise a dispute within 3 hours of receiving goods to stop the release of fund to the seller
                            {'\n'}
                            If our dispute department agrees with buyer, the item will be returned in same condition to the Seller and refund made to the Buyer.
                            {'\n'}
                            If the Buyer is discontented with a particular transaction, he/she the option to “Accept” or “Reject” the items purchased during the period of inspection.
                            {'\n'}

                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Rejection Process
                                {'\n'}
                            </Text>
                            A Buyer has to click the “Reject” button on the transaction page if he is not satisfied with the items delivered and wishes to return the deliveries to the Seller.

                            {'\n'}
                            On rejection, the Buyer needs to contact the Seller directly to determine if the Seller permits a return of purchases.
                            {'\n'}
                            PayKamsy.com must be notified via email at <Text style={{ color: 'blue' }} onPress={() => { Linking.openURL('support@PayKamsy.com') }}>support@PayKamsy.com</Text> if the Seller agrees to the return of purchases
                            {'\n'}
                            Once receipt of the notification of agreement, PayKamsy.com will then send amendment emails to both parties and supply further instructions.
                            

                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>How long does the Buyer have to inspect the items?
                                {'\n'}
                            </Text>
                            When the transaction commences, the Buyer or Seller will need to set the terms of their transaction process to include a period of inspection. The period of inspection is the time span the Buyer has to examine and evaluate the purchases on delivery.
                            {'\n'}
                            All parties involved in the transaction have the option to set an inspection period between 1-3 hours.
                            {'\n'}
                            PayKamsy.com will release funds to the Seller when the inspection period has expired and has confirmed that the Buyer has received his/her purchases
                            {'\n'}
                        </Text>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default RefundPage;