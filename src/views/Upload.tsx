import axiosInstance from '@api/client';
import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import Progress from '@ui/Progress';
import colors from '@utils/Colors';
import {StoreKeys, getFromAsyncStorage} from '@utils/asyncStorage';
import {categoriesData} from '@utils/categories';
import {Form} from 'formik';
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
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';

interface UploadProps {}
interface FormFields {
  title: string;
  about: string;
  category: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultFormFields: FormFields = {
  title: '',
  about: '',
  category: '',
};
const formSchema = yup.object().shape({
  title: yup.string().trim().required('Title is Missing'),
  about: yup.string().trim().required('About is Missing'),
  category: yup.string().oneOf(categoriesData, 'Categorg is Missing'),
  file: yup.object().shape({
    uri: yup.string().required('Audio is Missing'),
    name: yup.string().required('Audio is Missing'),
    type: yup.string().required('Audio is Missing'),
    size: yup.number().required('Audio is Missing'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

const Upload: FC<UploadProps> = ({}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    ...defaultFormFields,
  });

  const handleUpload = async () => {
    try {
      const data = await formSchema.validate(audioInfo);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('about', data.about);
      formData.append('category', data.category);
      formData.append('file', {
        uri: data.file.uri,
        type: data.file.type,
        name: data.file.name,
      });
      if (data.poster.uri) {
        formData.append('poster', {
          uri: data.poster.uri,
          type: data.poster.type,
          name: data.poster.name,
        });
      }

      const token = await getFromAsyncStorage(StoreKeys.AUTH_TOKEN);
      console.log(token);

      const res = await axiosInstance.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log('validation error', error.errors);
      } else {
        console.log(error.response.data);
      }
    }
  };
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
          onSelect={poster => {
            setAudioInfo({...audioInfo, poster});
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
            setAudioInfo({...audioInfo, file});
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          onChange={text => {
            setAudioInfo({...audioInfo, title: text.nativeEvent.text});
          }}
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
          onChange={text => {
            setAudioInfo({...audioInfo, about: text.nativeEvent.text});
          }}
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
            setAudioInfo({...audioInfo, category: item});
          }}
        />

        <View style={{marginVertical: 20}}>
          <Progress progress={50} />
        </View>

        <AppButton title="Submit" borderRadius={7} onPress={handleUpload} />
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
