import React, { useState } from 'react'; 
import { StyleSheet, View, Text, Platform, TouchableOpacity, PermissionsAndroid, TextInput } from 'react-native'; 
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
 
const ScanQR = (props) => {
  const [QR_Code_Value, setQR_Code_Value] = useState('');
  const [Start_Scanner, setStart_Scanner] = useState(false);
 
  const onQR_Code_Scan_Done = (QR_Code) => { 
    setQR_Code_Value(QR_Code); 
    setStart_Scanner(false);
  }
 
  const open_QR_Code_Scanner = () => { 
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) { 
            setQR_Code_Value('');
            setStart_Scanner(true);
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setQR_Code_Value('');
      setStart_Scanner(true);
    }    
  }

  return(
    <>
      {
        !Start_Scanner &&
          <View style={styles.MainContainer}>  
            <Text style={{ fontSize: 22, textAlign: 'center' }}>Scan QR Code</Text>              
  
            {
              QR_Code_Value?
                <>
                    <Text>Result Scan: </Text>
                    <TextInput style={styles.QR_text} value={QR_Code_Value} />                                
                </>
              : null
            }
  
            <TouchableOpacity
              onPress={open_QR_Code_Scanner}
              style={styles.button}>
              <Text style={{ color: '#FFF', fontSize: 14 }}>
                Open QR Scanner
              </Text>
            </TouchableOpacity>  
          </View>
      }
      {
        Start_Scanner &&
        <View> 
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'#FF3D00'}
          frameColor={'#00C853'}
          colorForScannerFrame={'black'}
          onReadCode={event => onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)}
        />
      </View>
      }
    </>
  );  
}
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14
  },
});

export default ScanQR