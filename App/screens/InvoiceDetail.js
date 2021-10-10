import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Title from '../components/Title';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/MyButton';
import moment from 'moment';
import { connect } from 'react-redux';
import { SERVER_URL, getCurrencySymble } from '../Global';
import LoadingBar from '../components/LoadingBar';

class InvoiceDetail extends Component {

    constructor(props) {
        super(props);
        this.invoice = this.props.route.params.invoice;
        this.invoiceFor = JSON.parse(this.invoice.invoice_gs_detail);
        this.Guest_Bank = this.props.route.params.bankDetail ? this.props.route.params.bankDetail : {};
        if(this.invoice.invoice_type == 'guest'){
            this.Guest_User = JSON.parse(this.invoice.guest_user_detail);
            // this.Guest_Bank = JSON.parse(this.invoice.guest_bank_detail);
        }else{
            this.Guest_User = this.invoice.invoice_user;
            // this.Guest_Bank = this.invoice.invoice_user.bank_detail;
        }
        this.invoice.shipment_cost=this.invoice.shipment_cost ? this.invoice.shipment_cost : 0;
        
        this.total_amount = parseInt(this.invoice.amount) + parseInt(this.invoice.shipment_cost)
        this.state = {
            loading: false
        }
    }

    async acceptRejectInvoice(acceptStatus) {
        try {
            this.setState({ loading: true });
            const formData = new FormData();
            formData.append('user_id', this.props.auth.user.id);
            formData.append('invoice_id', this.invoice.id);
            formData.append('accept_status', acceptStatus);
            const response = await fetch(`${SERVER_URL}accept_reject_invoice`, {
                method: 'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({ loading: false });
            if (responseJson.status == 'success') {
                alert('Invoice accepted successfully.');
            } else {
                alert('Unknown error, please try again.');
            }
        } catch (e) {
            this.setState({ loading: false });
            console.log('Invalid response from server.', e);
            alert('Invalid response from server');
        }
    }

    render() {
        console.log(this.invoice.app_user_id);
        console.log(this.props.auth.user.id);
        return (

            <View style={{ flex: 1, height: 500000 }}>
                <StatusBar
                    // animated={true}
                    backgroundColor="#773c10"
                    barStyle='light-content'

                />
                <View style={{ backgroundColor: '#773c10', paddingLeft: 6, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Icon name='arrow-left' size={30} color='#fff' onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', width: '100%', marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>Invoice Details</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: 'center', height: 240, width: '100%', backgroundColor: '#773c10' }}>
                            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start', marginBottom: 50 }}><Text style={{ color: '#fff', fontSize: 22 }}>INVOICE #</Text></View>
                                    <View style={{ justifyContent: 'flex-end', marginBottom: 50 }}><Text style={{ color: '#fff', fontSize: 22 }}>{this.invoice.invoice_no}</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flex:1, justifyContent: 'flex-start', }}>
                                        <Text style={{ color: '#fff', fontSize: 34, fontWeight: 'bold' }}>{getCurrencySymble(this.invoice.currency)}{this.invoice.amount}</Text>
                                        <Text style={{ color: '#fff', fontSize: 16, }}>Total Balance</Text>
                                    </View>
                                    <View >
                                        <Text style={{ color: '#fff', fontSize: 34, textAlign:'right', fontWeight: 'bold' }}>{getCurrencySymble(this.invoice.currency)}{this.invoice.amount_received}</Text>
                                        <Text style={{ color: '#fff',textAlign:'right', fontSize: 16, }}>Received Amount</Text>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}></View>
                                </View>
                            </View>
                        </View>

                        {/* Card1 */}
                        <View style={{
                            alignSelf: 'center', marginTop: 8, borderColor: '#000', height: 110, width: '96%', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 0.5, }}><Text style={{ fontSize: 20, color: '#000', paddingLeft: 10, paddingTop: 15 }}>{moment(this.invoice.created_at).format('DD-MM-YYYY')}</Text></View>
                                <View style={{ flex: 0.5, }}><Text style={{ fontSize: 20, color: '#000', paddingLeft: 10, paddingTop: 15 }}>{moment(this.invoice.expiry_date).format('DD-MM-YYYY')}</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, }}><Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', paddingLeft: 10 }}>Invoice Date</Text></View>
                                <View style={{ flex: 0.5, }}><Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', paddingLeft: 10 }}>Due Date</Text></View>
                            </View>
                        </View>
                        {/* Card2 */}
                        {(this.invoice.app_user_id != this.props.auth.user.id) &&
                            <View>
                                <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Bill To</Text>
                                <View style={{
                                    alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Full Name:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.full_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Address:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.address}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Country:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.country}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>City:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.city}, {this.Guest_User.zip}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Phone Number:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.phone}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Email:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>{this.Guest_User.email}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        }
                        {/* Card3 */}
                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Description</Text>
                        <View style={{
                            alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                        }}>
                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>
                                {this.invoice.detail}
                            </Text>

                        </View>

                        <View>
                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Invoice For</Text>
                            {this.invoice.invoice_for == 0 ?
                                <View style={{
                                    alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                }}>
                                    {/* <Text style={{ paddingLeft: 10, color: '#000', marginTop: 30, fontSize: 22, fontWeight: 'bold' }}>Mode Of Shipment</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Type:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Goods</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Brand Name:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoiceFor.brand_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Model No:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoiceFor.model_no}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14 }}>Serial No:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14 }}>{this.invoiceFor.serial_no}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14}}>Year of Manufacture:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14}}>{this.invoiceFor.year_of_manufacture}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14}}>Product condition:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14}}>{this.invoiceFor.product_condition}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>Extra link:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>{this.invoiceFor.extra_link}</Text>
                                        </View>
                                    </View>

                                </View>
                            :
                                <View style={{
                                    alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                    }}>
                                    {/* <Text style={{ paddingLeft: 10, color: '#000', marginTop: 30, fontSize: 22, fontWeight: 'bold' }}>Mode Of Shipment</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Type:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Services</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Service Title:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoiceFor.service_title}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14,paddingBottom: 20 }}>Service Description:</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14,paddingBottom: 20 }}>{this.invoiceFor.service_description}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            
                        </View>

                        {/* Card4 */}
                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Mode Of Shipment</Text>
                        {this.invoice.delivery_require == 'yes' ?
                            <View style={{
                                alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 2,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Delivery Required:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>YES</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Shipment Mode:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoice.shipment_mood}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Delivery days:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoice.delivery_days}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Delivery Option:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoice.delivery_option}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>Cost Of Shipment:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>{this.invoice.shipment_cost}</Text>
                                    </View>
                                </View>

                            </View>
                        :
                            <View style={{
                                alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 2,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>Delivery Require:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>No</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, }}>When will contract end:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, }}>{this.invoice.end_contract}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingLeft: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>Who will pay service charges:</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ paddingRight: 10, color: '#000', marginTop: 20, fontSize: 14, paddingBottom: 20 }}>{this.invoice.pay_service_charges}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                        {/* Card9 */}
                        {(this.invoice.app_user_id != this.props.auth.user.id) &&
                            <View>
                                <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>PayKamsy's Bank details</Text>
                                <View style={{
                                    alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Bank name:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.bank_name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Bank Phone Number:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.phone}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Account no:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.account_no}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Short code:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.short_code}

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Bank City:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.city}

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Bank State:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.state}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Bank Zipcode:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.zip}

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10 }}>
                                        <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                Country:
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                            <Text style={{ color: '#000', fontSize: 14 }}>
                                                {this.Guest_Bank.country}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        }
                        {/* Card 10 term/conditions */}
                        {/* <Text style={{ paddingLeft: 10, color: '#000', marginTop: 10, fontSize: 16, fontWeight: 'bold', fontWeight: 'bold' }}>Terms & Condition</Text>
                        <View style={{
                            alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                        }}>
                            <Text style={{ padding: 10, color: '#000', fontSize: 14 }}>
                                Lorem ipsum dolor sit amet,
                                consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis
                                Curabitur ullamcorper ultricies nisi.
                            </Text>
                        </View> */}

                        {/* Card 11 */}
                        {/* <View style={{
                            alignSelf: 'center', marginTop: 8, borderColor: '#000', width: '96%', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                            marginBottom: 50
                        }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 15 }}>
                                <View style={{ justifyContent: 'flex-start', paddingLeft: 10, marginTop: 15, }}>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
                                        Total Cost
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', marginTop: 15, paddingRight: 10 }}>
                                    <Text style={{ color: '#000', fontSize: 14 }}>
                                        {this.total_amount}
                                    </Text>
                                </View>
                            </View>
                        </View> */}
                        <View style={{height:30}}/>
                        {(this.invoice.app_user_id != this.props.auth.user.id) &&
                            this.invoice.invoice_status == 'pending' ?
                            <View>
                                <MyButton
                                    title={'Confirm'}
                                    onPress={() => this.acceptRejectInvoice('accepted')}
                                />
                                <TouchableOpacity style={{ width: '90%', marginTop: 8, alignSelf: 'center', marginBottom: 20 }}
                                    onPress={() => this.acceptRejectInvoice('rejected')}>
                                    <View style={{ backgroundColor: '#BE0303', alignItems: 'center', height: 59, justifyContent: 'center', borderRadius: 4, width: '100%' }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>Reject</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }
                    </View>

                </ScrollView>
                {this.state.loading && <LoadingBar />}
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { loginSuccess, auth, loading } = state.login;
    return { loginSuccess, loading, auth };
};

export default connect(
    mapStateToProps,
)(InvoiceDetail);
