import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../components/UserProvider";
import { useDispatch, useSelector } from "react-redux";
import { addData, removeData } from "../redux/favoritosSlice";

const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height

export function DetailsScreen({ navigation }) {

  const { userdata } = useContext(UserContext)
  const favoritos = useSelector(state => state.favoritos.favoritos);

  const route = useRoute();
  const dispatch = useDispatch();
  const { data } = route.params;

  const [mg, setMg] = useState(false);
  

  useEffect(() => {
    if (mg === true && data.fav !== true){
        dispatch(addData(data))
    } else if(mg === true && data.fav === true) {
      dispatch(removeData(data.id))
    }
  },[mg])

  const megusta = () => {
    setMg(!mg)
  }


  const render = () => {
    return (
      <>
        <TouchableOpacity onPress={megusta}>
          {
            mg === true ?
              <Image
                source={require('../assets/coraRo.png')}
                style={{ width: 30, height: 30 }}
              /> :
              <Image
                source={require('../assets/coraBl.png')}
                style={{ width: 30, height: 30 }}
              />
          }
        </TouchableOpacity>
      </>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#F4C314', flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', height: 90, justifyContent: 'space-between', display: "flex", flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back-button.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          {
            userdata === true ?
              render()
              :
              null
          }
        </View>
        <View style={{ width: '90%', height: Platform.OS === 'android' ? 350 : 300 }}>
          <View style={{ height: 80 }}>
            <Text style={{ color: '#000', fontSize: 12 }}>
              Nombre
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>
              {data.name}.
            </Text>
          </View>
          <View style={{ height: 80 }}>
            <Text style={{ color: '#000', fontSize: 12 }}>
              Direccion
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>
              {data.street}.
            </Text>
          </View>
          <View style={{ height: 80 }}>
            <Text style={{ color: '#000', fontSize: 12 }}>
              Ciudad
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>
              {data.city}.
            </Text>
          </View>
          <View>
            <Text style={{ color: '#000', fontSize: 12 }}>
              Local
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>
              {data.brewery_type}.
            </Text>
          </View>
          <Image
            source={require('../assets/logobeer.png')}
            style={{ position: "absolute", width: Platform.OS === 'android' ? 180 : 140, height: Platform.OS === 'android' ? 200 : 160, left: Platform.OS === 'android' ? 200 : 200, top: Platform.OS === 'android' ? 170 : 170 }}
          />
        </View>
        <View style={styles.whiteContainer}>
          <View style={{ backgroundColor: '#F4C314', width: '40%', alignItems: "center", borderRadius: 20, height: 30, justifyContent: "center" }}>
            <Text style={{ color: '#000', fontSize: 18, fontWeight: "600" }}>
              Descripcion
            </Text>
          </View>
          <View style={{ height: 150, justifyContent: 'center' }}>
            <Text style={{ color: '#000', fontWeight: "600", textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quae dolor veritatis illum beatae nulla nisi aliquam vel repellendus, eligendi eveniet harum nostrum numquam molestias enim. Explicabo asperiores odit illum!
            </Text>
          </View>
          <View style={{ display: 'flex', justifyContent: "space-between", width: '95%', flexDirection: "row", height: 90 }}>
            <View>
              <Text>
                {data.state}
              </Text>
              <Text>
                {data.country}
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: 'right' }}>
                {data.phone}
              </Text>
              <Text style={{ textAlign: 'right' }}>
                {data.street}
              </Text>
              <Text>
                {data.website_url}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: '#FFF',
    width: widthPhone,
    height: Platform.OS === 'android' ? heightPhone * .5 : heightPhone * .5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1,
    justifyContent: 'center',
    padding: 20
  }
});