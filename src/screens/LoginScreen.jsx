import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";


const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height
const transparet = 'rgba(0,0,0,0.0)'

export function LoginScreen({ navigation }) {

  const { userdata, setUserData } = useContext(UserContext)
  const { control, watch, setValue } = useForm();
  const [error, setError] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const [activity, setActivity] = useState(false)

  const emailUser = watch('email');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const goTo = () => {
    navigation.navigate('landing')
  }

  const modoInvitado = () => {
    setTimeout(() => {
      AsyncStorage.removeItem('user')
      setUserData(false)
    }, 1000)
  }

  useEffect(() => {
    if (emailUser === undefined || emailUser === '') {
      setDisableBtn(true)
      setError(false)
    } else {
      const isValidEmail = emailRegex.test(emailUser);
      console.log(isValidEmail);
      if (isValidEmail === true) {
        setError(false)
        setDisableBtn(false)
      } else {
        setError(true)
        setDisableBtn(true)
      }
    }
  }, [emailUser])

  const subs = async () => {
    setActivity(true)
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem('user', 'true');
          console.log('Datos guardados correctamente');
          navigation.navigate('landing')
          setUserData(true)
          setActivity(false)
          setValue('email', '');
          resolve();
        } catch (error) {
          console.log('Error al guardar los datos. ', error);
          reject(error);
        }
      }, 3000);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 250, height: 160 }}
        />
      </View>
      <View style={userdata === false ? styles.container2 : styles.container2Bis}>
        {
          userdata === true ?
            <>
              <View style={styles.bienvenido}>
                <Text style={{ fontWeight: '500', fontSize: 30, color: '#000000', marginTop: 25 }}>
                  Hola!!!
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '40%' }}>
                  <TouchableOpacity onPress={goTo} style={styles.btn}>
                    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                      Ingresar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: heightPhone * 0.03, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ color: '#000000', fontSize: 15 }}>
                    Volver al modo Invitado
                  </Text>
                  <TouchableOpacity onPress={modoInvitado}>
                    <Image
                      source={require('../assets/arrow.png')}
                      style={{ width: 20, height: 15, marginLeft: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
            :
            <>
              <View style={styles.bienvenido}>
                <Text style={{ fontWeight: '500', fontSize: 30, color: '#000000' }}>
                  Bienvenido!
                </Text>
                <View style={{ height: heightPhone * 0.15, justifyContent: 'center', alignItems: "center" }}>
                  <Text style={{ fontWeight: '300', fontSize: 15, color: '#000000', paddingBottom: 20 }}>
                    Subscribite y aprovecha al App la 100%
                  </Text>
                  {
                    activity === true ?
                      <ActivityIndicator size="large" color="green" />
                      :
                      <Input
                        control={control}
                        name='email'
                        placeholder='Ingrese su E-mail'
                        login={true}
                      />}
                  {
                    error ?
                      <Text style={{ color: 'red', fontWeight: "bold", fontSize: 10, marginTop: 5 }}>
                        Error al ingresar su E-mail
                      </Text>
                      :
                      null
                  }
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '40%' }}>
                  <TouchableOpacity onPress={subs} disabled={disableBtn} style={styles.btn}>
                    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                      Iniciar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: heightPhone * 0.08, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: '#000000', fontSize: 15 }}>
                  Continuar en modo Invitado
                </Text>
                <TouchableOpacity onPress={goTo}>
                  <Image
                    source={require('../assets/arrow.png')}
                    style={{ width: 20, height: 15, marginLeft: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </>
        }
      </View>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container2: {
    width: widthPhone,
    height: heightPhone * .5,
    backgroundColor: '#F4C314',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2Bis: {
    width: widthPhone,
    height: heightPhone * .3,
    backgroundColor: '#F4C314',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 0
  },
  bienvenido: {
    width: widthPhone * 0.8,
    height: heightPhone * 0.3
  },
  btn: {
    backgroundColor: "#000000",
    width: 135,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
