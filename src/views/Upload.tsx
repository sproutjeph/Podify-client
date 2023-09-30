import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import colors from '@utils/Colors';
import {categoriesData} from '@utils/categories';
import React, {useState} from 'react';
import {FC} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {types} from 'react-native-document-picker';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UploadProps {}

const Upload: FC<UploadProps> = ({}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    category: '',
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialComIcon
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{type: [types.images]}}
          onSelect={file => {
            console.log(file);
          }}
        />
        <FileSelector
          icon={
            <MaterialComIcon
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
          options={{type: [types.audio]}}
          onSelect={file => {
            console.log(file);
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
        <Pressable
          style={styles.categorySeletor}
          onPress={() => setShowCategoryModal(true)}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          placeholder="About"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          multiline={true}
          numberOfLines={10}
        />
        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => setShowCategoryModal(false)}
          title="Category"
          data={categoriesData}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({category: item});
          }}
        />

        <View style={{marginBottom: 20}} />

        <AppButton title="Submit" borderRadius={7} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },

  input: {
    borderWidth: 2,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySeletor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
