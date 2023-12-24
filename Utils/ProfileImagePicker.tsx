import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {Icon, Overlay} from '@rneui/themed';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('window');

interface ImagePickerProps {
  onTakeImage: (uri: any | undefined) => void;
}

const ProfileImagePicker: React.FC<ImagePickerProps> = ({onTakeImage}) => {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const requestCameraPermission = async () => {
    const grantedCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'App Storage Permission',
        message: 'App needs access to your storage to save images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (
      grantedStorage === PermissionsAndroid.RESULTS.GRANTED ||
      grantedCamera === PermissionsAndroid.RESULTS.GRANTED
    ) {
      launchCamera(
        {
          saveToPhotos: true,
          quality: 1,
          mediaType: 'photo',
          includeBase64: true,
        },
        (response: ImagePickerResponse) => {
          if (response.assets) {
            const uri = response.assets[0].uri;
            const imgString = response.assets[0].base64;
            setPickedImage(uri);
            onTakeImage(imgString);
            toggleOverlay();
          }
        },
      );
    }
  };

  const requestStoragePermission = async () => {
    const grantedCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'App Storage Permission',
        message: 'App needs access to your storage to save images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (
      grantedStorage === PermissionsAndroid.RESULTS.GRANTED ||
      grantedCamera === PermissionsAndroid.RESULTS.GRANTED
    ) {
      launchImageLibrary(
        {
          selectionLimit: 1,
          quality: 1,
          mediaType: 'photo',
          includeBase64: true,
        },
        (response: ImagePickerResponse) => {
          if (response.assets) {
            const uri = response.assets[0].uri;
            const imgString = response.assets[0].base64;
            setPickedImage(uri);
            onTakeImage(imgString);
            toggleOverlay();
          }
        },
      );
    }
  };

  const takeImageHandler = () => {
    requestCameraPermission();
  };

  const selectImageHandler = () => {
    requestStoragePermission();
  };

  return (
    <View style={styles.profileContainer}>
      {pickedImage && (
        <Image source={{uri: pickedImage}} style={{width: 200, height: 200}} />
      )}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={toggleOverlay} style={styles.uploadBtn}>
          <Text>{pickedImage ? 'Edit' : 'Upload'} Profile</Text>
          <Icon name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.text}>Upload images</Text>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={selectImageHandler}>
              <View style={styles.iconCircle}>
                <Icon name="image" size={20} color={theme.colors.textBlack} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={takeImageHandler}>
              <View style={styles.iconCircle}>
                <Icon name="camera" size={20} color={theme.colors.textBlack} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadContainer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    elevation: 2,
    height: 100,
    width: 100,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '50%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    width: width * 0.65,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: height * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: 30,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: height * 0.001,
    right: width * 0.01,
    zIndex: 1,
  },
  deleteIcon: {color: 'red'},
  text: {
    fontSize: theme.typography.headings.h5.fontSize,
  },
});

export default ProfileImagePicker;
