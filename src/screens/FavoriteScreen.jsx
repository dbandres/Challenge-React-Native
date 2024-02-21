import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Card } from "../components/Card";

const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height

export function FavoriteScreen({ navigation }) {

  const favoritos = useSelector(state => state.favoritos.favoritos);

  return (
    <SafeAreaView style={{ backgroundColor: '#F4C314', flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', height: 90, justifyContent: 'center', }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back-button.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{height:50}}>
          <Text>
            MIS FAVORITOS
          </Text>
        </View>
        <View style={styles.whiteContainer}>
          <FlatList
            data={favoritos}
            numColumns={2}
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Card
                  item={item}
                />
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: '#FFF',
    width: widthPhone,
    height: Platform.OS === 'android' ? heightPhone * .9 : heightPhone * .9,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1,
    justifyContent: 'center',
    alignItems:"center",
    padding: 20
  }, flatList: {
    justifyContent: 'space-between',
  },
});