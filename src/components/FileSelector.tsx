import colors from '@utils/Colors';
import {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

interface FileSelectorProps {
  icon?: React.ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect: (file: DocumentPickerResponse) => void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

const FileSelector: FC<FileSelectorProps> = ({
  icon,
  btnTitle,
  style,
  onSelect,
  options,
}) => {
  async function handleDocumentSelect() {
    try {
      const document = await DocumentPicker.pick(options);
      console.log(document);
      const file = document[0];
      onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  }
  return (
    <Pressable
      style={[styles.btnContainer, style]}
      onPress={handleDocumentSelect}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelector;
