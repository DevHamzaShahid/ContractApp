import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Title from '../components/Title';
class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    IconName={'keyboard-backspace'}
                    title={'About Us'}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                        <Text style={{ textAlign: 'justify' }}>
                            PayKamsy is a solution of Verithrust Validations Ltd, with a team that is made up of essentially skillful, talented and creative members who have a mission to build a fraud-free system. Here, we exploit technology to deal with the challenges related to fraudulent activities on financial transactions. This vision has aided the design and implementation of a sophisticated and trusted digital escrow platform which will aid the management of your financial transactions without having to go by laborious and potentially insecure methods.
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            We operate as an independent escrow service provider, networking with Banks licensed by the Central Bank of Nigeria. The process of payment helps to ensure the satisfaction of both buyers and sellers in making financial transactions. PayKamsy is suitable for all variety of trades such as household items, automobiles, gadgets and devices, e-commerce payments and other business ventures. Our escrow fees can be settled by either the buyer or seller, or even shared between the buyer and the seller.
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            Summarily, PayKamsy is:
                        </Text>
                        <Text style={styles.BulletText}>{'\u2022'}
                            A safe and secure online escrow for both Buyers and Sellers.
                        </Text>

                        <Text style={styles.BulletText}>{'\u2022'}
                            In association with Banks licensed by the Central Bank of Nigeria
                        </Text>

                        <Text style={styles.BulletText}>{'\u2022'}
                            Facilitated with proficient and all-inclusive escrow procedures for all varieties of transactions
                        </Text>

                        <Text style={styles.BulletText}>{'\u2022'}
                            The most guaranteed service in Nigeria to trust with your financial transactions.
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            Headquartered in Lagos, Nigeria, PayKamsy and her operating subsidiaries provide online escrow services that facilitate and promote e-commerce by assuring a secure settlement.
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            PayKamsy is one of the pioneering industry in the process of online escrow services in Nigeria, and has been appropriately patented.
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Our mission</Text> is to eliminate not just peer-to-peer fraud, but all forms of fraud in financial transactions so that everyone, everywhere can transact with an assurance of security.
                            {'\n'}{'\n'}
                            We uphold the right all parties involved in a transaction possess to be included in the payment process through the entire sequence of the transaction process.
                            {'\n'}{'\n'}
                            We are committed to enacting this right and ensure that online payment is operating at its best.


                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>PayKamsy for Buyers
                                {'\n'}
                            </Text> Now you can get the specifications of your items, you can also be refunded without mincing words. Your requests are not taken for granted.
                            {'\n'}
                            You can now feel very comfortable to perform the transactions and payments that had once seemed to be insecure.
                            {'\n'}
                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>PayKamsy for Sellers
                                {'\n'}
                            </Text> Once we receive payments from buyers, we will notify you to proceed and deliver orders with total assurance that your account will be credited after obtaining a proof of delivery. It is the better alternative to Cash-on-delivery.
                            {'\n'}
                            Your customers can be more comfortable in relating with your services by integrating our ultimate escrow service to your payment options.

                            {'\n'}
                            {'\n'}
                                                        
                        </Text>

                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    BulletText:
    {
        textAlign: 'justify',
        marginLeft: 10,

    },
}
);


export default AboutUs;