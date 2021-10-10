import React from 'react';
import { StyleSheet, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

export default function LoadingBar() {
    return(
        <View style={styles.progress}>
            <BallIndicator color="#773c10"/>
        </View>
    );
}

const styles = StyleSheet.create({
    progress: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  });