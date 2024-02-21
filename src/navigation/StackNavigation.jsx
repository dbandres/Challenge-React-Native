import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/SplashScree";
import { LoginScreen } from "../screens/LoginScreen";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LandingScreen } from "../screens/LandingScreen";
import { DetailsScreen } from "../screens/DetailsScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";



const Stack = createNativeStackNavigator();

 function StackNavigation() {

  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="splash" options={{ headerShown: false }} component={SplashScreen}/>
      <Stack.Screen name="login" options={{ headerShown: false }} component={LoginScreen}/>
      <Stack.Screen name="landing" options={{ headerShown: false }} component={LandingScreen}/>
      <Stack.Screen name="details-brewery" options={{ headerShown: false }} component={DetailsScreen}/>
      <Stack.Screen name="favorites-brewery" options={{ headerShown: false }} component={FavoriteScreen}/>
    </Stack.Navigator>
  )
}

export default StackNavigation;