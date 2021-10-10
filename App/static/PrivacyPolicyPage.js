import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet ,Linking} from 'react-native';
import Title from '../components/Title';

class PrivacyPolicyPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    IconName={'keyboard-backspace'}
                    title={'Privacy Policy'}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>PRIVACY POLICY
                                {'\n'}
                            </Text> PayKamsy gives priority to information security and is especially cautious with handling personal information.
                            {'\n'}
                            You can now feel very comfortable to perform the transactions and payments that had once seemed to be insecure.
                            {'\n'}
                            'Personal information' implies the particulars associated with an individual, or specific sensitive details linked to a personality. PayKamsy's Privacy Policy is applicable to every personal information collated and/or recorded by PayKamsy.
                            {'\n'}
                            PayKamsy has an obligation to guarantee the protection of your information. Hence, this privacy policy describes how we utilize any information recorded about you, how you can direct us if you are better suited by limited usage of information, and the measures we take to safeguard your information.

                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Information on Personal Identification

                                {'\n'}
                            </Text> We may request the submission of means of identification from Users in different ways, including Users who visit our site, register on the platform, and takes action in relation to the services and resources provided on our platform. The name, email address, phone number and credit card details may be requested as applicable.

                            {'\n'}
                            Nonetheless, Users may anonymously use the PayKamsy app or visit our site incognito. Information relating to personal identification will be collected from a User if he/she releases such information to us willingly. A User may ignore the submission of personal information, except they are restrained from performing certain activities on our platform.

                            {'\n'}

                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Information on Non-personal Identification

                                {'\n'}
                            </Text> Non-personal information may be collected about a User anytime they use the PayKamsy app or perform certain activities on our site. Such information may comprise of the browser name, type of computer, and technological information about the User’s mode of connection to our site. Technological information such as the Operating System, the Internet Service Provider being utilized, and any other related information.


                            {'\n'}

                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>How We Use Collected Information

                                {'\n'}
                            </Text> Users’ personal information may be collected by PayKamsy for one or more of the following purposes:
                            {'\n'}
                            <Text style={styles.BulletText}>{'\u2022'}
                                To give response to requests about our services
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                For billing, payment methods or use of our website
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                To provide a User with services and products requested
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}To carry out customer evaluation and assessment
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                To give customers more information about our products and services
                                {'\n'}
                            </Text>
                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>How Your Personal Data Are Being Collected

                                {'\n'}
                            </Text>We utilize various means to fetch Users’ information, these means include:

                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Direct interactions-
                            </Text>A User may submit his/her Identity, Profile and Contact details, Financial and Transaction details either by filling forms or by giving a feedback via post, phone, and email.
                            {'\n'}
                            <Text style={styles.BulletText}>{'\u2022'}
                                Use our Services;

                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                Enquire about us or our Services;
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                Create an account on our website or on the PayKamsy app;
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                Subscribe to our services and publications;
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                Contact our Customer Services; or
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                Send some feedback to us.                                {'\n'}
                            </Text>

                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>How We Protect Your Information

                                {'\n'}
                            </Text> We exert great premium on the protection of the personal information of Users. This, aside from other measures include the use of state-of-the-art mechanisms. Therefore, while we gear our efforts to secure Users’ personal information, we cannot ascertain or guarantee the security of any information relayed to us as well as those received from us.

                            {'\n'}

                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Disclosure of Personal Information
                                {'\n'}
                            </Text>We will not in any case disclose any personal information to a third party. Personal Information may only be provided to our contractors who are committed to keep every information confidential. Such provision is for the limited purpose of rendering services to us. Other exceptions to the disclosure of your information is when;

                            {'\n'}
                            <Text style={styles.BulletText}>{'\u2022'}
                                you give us the permission to do so                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                legal processes demand we do so, for example, an order from the law court, and/or
                                {'\n'}
                            </Text>
                            <Text style={styles.BulletText}>{'\u2022'}
                                the protection of property rights related to our website is necessitated                                {'\n'}
                            </Text>

                        </Text>

                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Policy Changes

                                {'\n'}
                            </Text>By submitting data to us, our agents or by using the Site, you agree to the usage of your data according the manner spelt out in this Privacy Policy. Note that this Privacy Policy is subject to change in any span of time to include/exclude statements while PayKamsy does not saddle the responsibility for updating Users to such effect.


                        </Text>
                        <Text style={{ marginTop: 10, textAlign: 'justify' }}>

                            <Text style={{ fontWeight: 'bold', color: '#000', textAlign: 'justify' }}>Contacting us
                            

                                {'\n'}
                            </Text>In case you have any question(s) about this Privacy Policy, the practices of this site, or your activities on this site, please contact us at:{'\n'}
                            <Text style={{color:'blue'}} onPress={ ()=>{ Linking.openURL('http://www.PayKamsy.com')}} >http://www.PayKamsy.com {'\n'}{'\n'}</Text>

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

export default PrivacyPolicyPage;