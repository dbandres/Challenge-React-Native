import { Controller } from "react-hook-form";
import { TextInput, View, StyleSheet, Platform, Dimensions, Image, TouchableOpacity } from "react-native";

const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height

export function Input({ control, name, placeholder, login, onPress }) {
  return (
    <View style={styles.input}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor='#000'
            style={{ height: '100%', width: '80%' }}
          />
        )}
      />
      {
        login === true ?
          null
          :
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require("../assets/search.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#edd78a',
    width: widthPhone * .5,
    height: Platform.OS === 'android' ? heightPhone * .043 : heightPhone * .050,
    borderRadius: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  }
});