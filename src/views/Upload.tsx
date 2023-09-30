import React from 'react';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface UploadProps {}

const Upload: FC<UploadProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Upload</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Upload;
