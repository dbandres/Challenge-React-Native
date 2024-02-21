import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { Text, View, StyleSheet, Platform, Image } from "react-native";
import { UserContext } from "../components/UserProvider";

export function SplashScreen(){

  const { setUserData } = useContext(UserContext)

  useEffect(()=>{
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        const data = JSON.parse(value);
        if (data !== null) {
          setUserData(true)
        } else {
          console.log('No hay datos almacenados en AsyncStorage.');
        }
      } catch (error) {
        console.log('Error al recuperar los datos:', error);
      }
    };
  
    retrieveData()
  },[])


  return(
    <View style={styles.container}>
      <View style={styles.ellipse1}>

      </View>
      <View>
        <Image
          source={require('../assets/logo.png')}
          style={{width:300, height:200}}
        />
      </View>
      <View style={styles.ellipse2}>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  ellipse1:{
    width:300,
    height:300,
    backgroundColor:'#F4C314',
    borderRadius:200,
    top: Platform.OS === 'ios' ? -45 : -125,
    left:200
  },
  ellipse2:{
    width:400,
    height:400,
    backgroundColor:'#F4C314',
    borderRadius:200,
    bottom: Platform.OS === 'ios' ? -100 : -200,
    right: Platform.OS === 'ios' ? 200 : 180
  }
});
