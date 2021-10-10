import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Title from '../components/Title';

class TermsPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    IconName={'keyboard-backspace'}
                    title={'Terms and Conditons'}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Terms and Conditions

                                {'\n'}
                            </Text>
                            The terms of utilizing the Escrow platform shall serve as an indication of your compliance to the terms and conditions guiding your participation. By using the Escrow platform, you are considered to have read and consented to the terms and conditions guiding the Escrow platform, which will control your transaction activities and escrow services provided via the PayKamsy app.

                            {'\n'}
                            If you are unwilling to consent to the Terms and Conditions of Using the Escrow Platform, you shall quit from further usage of the Services.

                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Definitions -
                            </Text>
                            "Account" means (i) an account of a Buyer from which payment for the Transaction and related fees will be obtained, (ii) an account of a Seller to which payment for the Transaction and other payments will be credited.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Description of the Service -
                            </Text>
                            The Services are Internet-based transaction management services operated by PayKamsy.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Limits on the Services -
                            </Text>
                            The Services are only available for lawful items and items not otherwise excluded by Section below.
                            {'\n'}
                            Only registered Users shall be granted full access to use the Services. In order to register, you are required to submit all information required on the Site.

                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Prohibited Transactions -
                            </Text>
                            Users shall not exploit the Site in relation to any form of illegal transaction. All transactions via our Services shall be bereft of involvement with illegal items or illicit purposes.
                            {'\n'}
                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Our Responsibilities -
                            </Text>
                            PayKamsy is obliged to perform only those functions expressly discussed in this Agreement.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Canceling a Transaction -
                            </Text>
                            If a transaction cannot be completed for any reason, including cancellation by PayKamsy for any reason, PayKamsy will send a notification of cancellation of orders to all parties involved in such transaction via e-mail, to the specific e-mail address each party has submitted to PayKamsy.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Questions about the Services –
                            </Text> Enquires about payments through the Service can be made by dialing the toll-free number displayed on the Site or by filling out the customer service form. On contacting PayKamsy, your name, PayKamsy reference number and email address registered on the PayKamsy site/app will be requested, kindly prepare such details at hand.

                            {'\n'}
                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Fees -
                            </Text>
                            Unless otherwise agreed upon by each User in the Transaction, the Buyer agrees to pay the fees for the Services that are disclosed on the Site at the time the Transaction is complete. Escrow Instructions are agreed to by all such Users.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Security -
                            </Text>
                            PayKamsy utilizes secure sockets layer ("SSL"), a protocol of security that enables data encryption, server authentication, and message integrity for connection to the Internet so as to ensure that the data supplied by Users to PayKamsy is not transmitted over the Internet unencrypted, thus such data cannot be viewed by unauthorized individuals.

                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Disclaimers -
                            </Text>
                            You expressly agree that your use of the Services is at your sole risk. The Services are provided on a strictly "as is" and "as available" basis. PayKamsy MAKES NO WARRANTY WITH REGARD TO THE UNDERLYING TRANSACTION, ANY ITEMS OBTAINED BY YOU THROUGH THE USE OF THE SITE OR THE SERVICES, THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, OR THAT THE SERVICES OR THE SITE WILL BE UNINTERRUPTED, TIMELY, OR ERROR FREE.

                            {'\n'}
                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            This Agreement may be assigned by PayKamsy to any affiliated company at the present or in the future, and to any successor in interest. Also, independent contractors or other third parties may be delegated with some of PayKamsy.com rights and responsibilities under the Agreement.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            If you are a registered User of the Site, then each time you request the Services, it will comprise of your agreement to these Terms of Using the Escrow Platform, as amended from time to time on PayKamsy 's sole discretion, and serve as an evidence that you have read, understood and accepted the applicable Terms of Using the Escrow Platform.

                            {'\n'}{'\n'}
                            Revised October 13, 2021.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default TermsPage;