import {useFetchRecommendedAudios} from '@hooks/queries';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface RecomandedAudioProps {}

const RecomandedAudio: FC<RecomandedAudioProps> = ({}) => {
  const {data} = useFetchRecommendedAudios();

  console.log(data);

  return (
    <View style={styles.container}>
      <Text>RecomandedAudio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RecomandedAudio;
