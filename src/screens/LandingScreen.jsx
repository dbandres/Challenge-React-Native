import { Dimensions, Text, View, TouchableOpacity, Image, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { Card } from "../components/Card";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreweries, resetStateAll } from "../redux/all20Slice";
import { autocompleteSearch, resetState } from "../redux/searchSlice";
import { UserContext } from "../components/UserProvider";
import { Filtros } from "../components/Filtros";
import { getByCity } from "../redux/getByCitySlice";
import { TextInput } from "react-native-gesture-handler";


const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height
const transparet = 'rgba(0,0,0,0.0)'
const numColumns = 2;

export function LandingScreen({ navigation }) {

  const { userdata } = useContext(UserContext)

  const all20 = useSelector((state) => state.all.all)
  const error = useSelector((state) => state.all.error)
  const loading = useSelector((state) => state.all.loading)

  const autocomplete = useSelector((state) => state.search.autocomplete)
  const errors = useSelector((state) => state.search.error)
  const loadings = useSelector((state) => state.search.loading)

  const cities = useSelector((state) => state.cities.cities)
  const errorr = useSelector((state) => state.cities.error)
  const loadingg = useSelector((state) => state.cities.loading)

  const { control, watch } = useForm();
  const searchTerm = watch('search');
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [newMsg, setNewMsg] = useState(false)
  const [searchCities, setSearchCities] = useState(false)
  const searchCity = watch('searchCities');

  const [filtrado, setFiltrado] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    dispatch(getBreweries());
    return () => { };
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(resetStateAll())
    dispatch(autocompleteSearch(searchTerm));

    return () => { };
  }, [searchTerm]);

  const handleInputChange = (text) => {
    if (userdata == true) {
      setText(text);
      const filtered = all20.filter(item =>
        item.city.toLowerCase().includes(text.toLowerCase())
      );
      setFiltrado(filtered);
    } else {
      setText(text);
      const filtered = all20.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFiltrado(filtered);
    }
  };

  const loadMoreData = () => {
    setNewMsg(true)
    setTimeout(() => {
      setPage(page + 1)
      setNewMsg(false)
    }, 600)
  };

  const getCities = () => {
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getByCity(searchCity))
    }, 1000)
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 15 }}>
      <Card item={item} />
    </View>
  );

  const favorite = () => {
    navigation.navigate('favorites-brewery')
  }

  console.log(filtrado);

  const renderContent = () => {
    return (
      loading || loadings  ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparet, width: widthPhone }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        all20 && all20.length > 0 ? (
          <FlatList
            data={filtrado.length < 1 ? all20 : filtrado}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={false}
            onEndReached={filtrado.length < 1 ? loadMoreData : null}
            onEndReachedThreshold={0}
          />
        ) : (
          <View>
            <Text>No hay datos disponibles.</Text>
          </View>
        )
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/imagBg.png')}
        style={{ flex: 1, width: widthPhone, height: heightPhone, alignItems: 'center' }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.containerBtn, Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow]}>
            <Image
              source={require('../assets/home.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <Input
            control={control}
            name={searchCities === true ? 'searchCities' : 'search'}
            placeholder={searchCities === true ? 'Buscar por ciudad...' : 'Buscar...'}
            onPress={getCities}
          />
          {
            userdata === true ?
              <TouchableOpacity style={[styles.containerBtn, Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow]}>
                <Image
                  source={require('../assets/user.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              :
              null
          }
          <View style={{ position: 'absolute', width: widthPhone * 0.90, height: 30, bottom: 0 }}>
              <TextInput
              value={text}
              onChangeText={handleInputChange}
              placeholder="Filtrar por..."
              style={{ width: '100%', height: 35, fontSize: 12 }}
            />
          
          </View>
        </View>
        {
          userdata === true ?
            <Filtros setSearchCities={setSearchCities} favorite={favorite} />
            :
            null
        }
        {renderContent()}

        {
          newMsg === true ?
            <View style={{ zIndex: 10, backgroundColor: transparet, width: widthPhone, alignItems: 'center' }}>
              <Text>
                Actualizando informacion..
              </Text>
            </View>
            :
            null
        }
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: widthPhone * 0.90,
    height: heightPhone * 0.13,
    justifyContent: "space-between",
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  androidShadow: {
    elevation: 10, // Ajusta este valor según tu preferencia
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerBtn: { backgroundColor: '#F4C314', height: 40, width: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  flatList: {
    justifyContent: 'space-between',
  },
});