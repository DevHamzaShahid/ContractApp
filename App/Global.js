export const SERVER_URL = 'https://duaacollection.com/invoiceapp/api/';
export function getCurrencySymble(currency){
//    Naira = ₦, Pound Sterling = £, Euro= €, Dollars = $, Franc =CHf
    if(currency == null)
        return '';
    if(currency.toLowerCase() =='naira')
        return '₦';
    else if(currency.toLowerCase() =='pound sterling')
        return '£';
    else if(currency.toLowerCase() =='usd' || currency.toLowerCase() =='cad' )
        return '$';
    else if(currency.toLowerCase() =='franc')
        return 'CHf';
    else if(currency.toLowerCase() =='euro')
        return '€';
    else 
        return '';
}