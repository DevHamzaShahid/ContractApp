import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Title from '../components/Title'
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { SERVER_URL, getCurrencySymble } from '../Global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingBar from '../components/LoadingBar';
import moment from 'moment';


class SellerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            invoiceList: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.focusListener = this.props.navigation.addListener("focus", async payload => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        // if(this.props.navigation && this.props.navigation.removeListener)
        this.props.navigation.removeListener(this.focusListener);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            console.log('fetch data');
            if (this.props.isFocused) {
                this.fetchData();
            }
        }
    }
    async fetchData() {
        try {
            this.setState({ loading: true });
            const formData = new FormData();
            formData.append('user_id', this.props.auth.user.id);
            const response = await fetch(`${SERVER_URL}get_all_invoices`, {
                method: 'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({ loading: false, invoiceList: responseJson });
            // console.log(responseJson);
        } catch (e) {
            console.log('Invalid response from server', e);
            this.setState({ loading: false });
            alert('Invalid response from server');
        }
    }
    Invoice = async (item) => {
        this.setState({ loading: true })
        try {
            const formData = new FormData();
            formData.append('invoice_no', item.invoice_no);
            const response = await fetch(`${SERVER_URL}search_invoice`, {
                method: 'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({ loading: false });
            if (responseJson.status == 'error') {
                alert('Invoice not found');
            } else if (responseJson.status == 'success') {
                console.log(responseJson.status)
                this.props.navigation.navigate('InvoiceDetail', { invoice: responseJson.invoice });
            } else {
                alert("Unknown Error occurred");
            }
        } catch (e) {
            console.log("Invalid response from server");
            this.setState({ loading: false });
            alert("Invalid response from server");
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Title
                    title={'Invoices'}
                    IconName={'menu'}
                    onPress={() => this.props.navigation.openDrawer()}
                />
                {this.state.invoiceList.length > 0 ? 
                    <FlatList
                        data={this.state.invoiceList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => { this.Invoice(item) }}>
                                <View style={{ marginTop: '2%', width: '98%', borderWidth: 1, alignSelf: 'center', bordercolor: '#000000', borderRadius: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text>{item.invoice_no}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text>{item.expiry_date}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ fontWeight: 'bold' }} >{getCurrencySymble(item.currency)}{item.amount}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                        <View style={{ justifyContent: 'flex-start', backgroundColor: '#773c10', borderRadius: 4, paddingLeft: 5, paddingRight: 5 }}>
                                            <Text style={{ alignItems: 'center', color: '#fff', alignSelf: 'center', paddingLeft: 2, paddingRight: 2 }}>
                                                {item.invoice_status}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ContractForm', {edit:true, invoice: item})}}>
                                            <View style={{ justifyContent: 'flex-end', paddingRight: 5, paddingBottom: 5, width: 30, height: 30 }}><Icon name={'edit'} size={25} color='#773c10' /></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        }
                    />:
                    <Text style={{textAlign:'center', marginTop:'50%'}}>No Invoice found</Text>
                }
                <FAB
                    style={styles.fab}
                    large
                    color='#fff'
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('ContractForm')}
                />
                {this.state.loading && <LoadingBar />}
            </View>

        )
    }
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: "1%",
        backgroundColor: '#773c10'
    },
})

const mapStateToProps = state => {
    const { loginSuccess, auth, loading } = state.login;
    return { loginSuccess, loading, auth };
};

export default connect(
    mapStateToProps,
)(SellerPage);
