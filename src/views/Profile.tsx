import React from 'react';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Profile;
