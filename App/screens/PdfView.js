import React from 'react';
// With Flow type annotations (https://flow.org/)
import {View} from 'react-native';
import PDFView from 'react-native-view-pdf';
// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';


export default class PdfView extends React.Component {

    constructor(props){
        super(props);
        this.PdfUrl = this.props.route.params.pdf_url;
    }

  render() {

    const resources = {
        file: this.PdfUrl,
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        base64: 'JVBERi0xLjMKJcfs...',
      };

    const resourceType = 'file';

    return (
      <View style={{ flex: 1 }}>
        {/* Some Controls to change PDF resource */}
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    );
  }
}