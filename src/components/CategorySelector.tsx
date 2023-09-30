import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import React = require('react');
import colors from '@utils/Colors';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CategorySelectorProps<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem: (item: T) => JSX.Element;
  onSelect: (item: T, index: number) => void;
  onRequestClose?: () => void;
}

const CategorySelector = <T extends any>({
  data,
  visible = false,
  title,
  renderItem,
  onSelect,
  onRequestClose,
}: CategorySelectorProps<T>) => {
  const [selectedIndex, setSelectedindex] = React.useState<number | null>(null);

  function handleSelect(item: T, index: number) {
    setSelectedindex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  }
  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.backDrop} onPress={onRequestClose} />
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <ScrollView style={{}}>
            {data.map((item, index) => {
              return (
                <Pressable
                  style={styles.selectorContainer}
                  key={index}
                  onPress={() => handleSelect(item, index)}>
                  {selectedIndex === index ? (
                    <MaterialComIcon
                      name="radiobox-marked"
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialComIcon
                      name="radiobox-blank"
                      color={colors.SECONDARY}
                    />
                  )}

                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelector;
