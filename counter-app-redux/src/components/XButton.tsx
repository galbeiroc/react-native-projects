import { Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TouchableOpacityProps } from "react-native";

interface IXButton extends TouchableOpacityProps {
  name: string;
  bgColor?: StyleProp<String>;
}

const XButton = ({ name, bgColor = 'grey', onPress }: IXButton) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.contentBtn(bgColor)}>
      <Text style={styles.textBtn}>{name}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  contentBtn: (bgColor: string) => ({
    backgroundColor: bgColor,
    width: 200,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginTop: 10
  }),
  textBtn: {
    color: 'white'
  }
});

export default XButton;
