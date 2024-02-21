import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Dimensions, Platform, TouchableOpacity, Image } from "react-native";

const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height

export function Card({ item }) {

  const navigatio = useNavigation()

  const goToDetails = () =>{
    navigatio.navigate('details-brewery',{
      data: item
    })
  }


  return (
    <TouchableOpacity onPress={goToDetails} style={styles.cardContainer} activeOpacity={0.5}>
      <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', height: 50, justifyContent: 'space-around', marginTop: 7, borderRadius: 15 }}>
        <Image
          source={require('../assets/beer.png')}
          style={{ width: 30, height: 34 }}
        />
        <Text style={{ width: '70%', fontSize: 10, color: '#000' }}>
          {item.name}
        </Text>
      </View>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: "center" }}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '80%', height: 30, justifyContent: 'center', alignItems: "center" }}>
          <Text style={{ fontSize: 11, color: '#000' }}>
            {item.city}
          </Text>
          <Text style={{ fontSize: 10, color: '#000', marginLeft: 5 }}>
            {item.state_province}
          </Text>
        </View>
        <View style={{ display: 'flex', width: '80%', height: 20, justifyContent: 'center', alignItems: "center" }}>
          <Text style={{fontSize: 9, color: '#000' }}>
            {item.street}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPhone * .40,
    height: Platform.OS === 'ios' ? heightPhone * .18 : heightPhone * .15,
    backgroundColor: 'rgba(244, 195, 20, 0.9)',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.65,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  }
});