import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";


const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height
const transparet = 'rgba(0,0,0,0.6)'

export function Filtros({setSearchCities, favorite}) {

  const [buttonStates, setButtonStates] = useState({
    randomPressed: false,
    searchPressed: false,
    favoritesPressed: false,
  });

  const handleButtonPress = (buttonName) => {

  const updatedButtonStates = { ...buttonStates };
  updatedButtonStates[buttonName] = true;

  for (const name in updatedButtonStates) {
    if (name !== buttonName) {
      updatedButtonStates[name] = false;
    }else if(buttonName === 'favoritesPressed'){
      favorite()
    }else{
      setSearchCities(true)
    }
  }
  setButtonStates(updatedButtonStates);
  };


  return (
    <View style={{ width: widthPhone * 0.95, height: 50, borderRadius: 20, justifyContent: 'flex-start', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => handleButtonPress('randomPressed')} style={{ width: 95, height: 30, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: buttonStates.randomPressed ? '#F4C314' : '#E2E2E2' }}>
          <Image
            source={require('../assets/shuffle.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ fontWeight: '700', fontSize: 16, fontSize: 14, marginLeft:5}}>
            Random
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={ () => handleButtonPress('searchPressed')} style={{ width: 150, height: 30, backgroundColor: buttonStates.searchPressed ? '#F4C314' : '#E2E2E2', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/search.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ fontWeight: '700', fontSize: 14, marginLeft: 5 }}>
            Buscar por ciudad
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => handleButtonPress('favoritesPressed')} style={{ width: 128, height: 30, backgroundColor: buttonStates.favoritesPressed ? '#F4C314' : '#E2E2E2', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/coraRo.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ fontWeight: '700', fontSize: 14, marginLeft: 5 }}>
            Mis favoritos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}