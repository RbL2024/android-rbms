import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GDim from '@/hooks/useDimension';
import bikeLogo from '@/assets/images/bikeLogo.png';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
import Regpage from './regpage';

const Lrpage = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();

  const handleGoogle = () => {
    toast.info('not implemented yet', {
      duration: 2000,
      position: 'bottom-center',
    })
  }

  const handleSignUp = () => {
    nav.navigate('RSPage'); // Navigate to the registration page
  };
  const handleAHA = () => {
    nav.navigate('LSPage');
  }
  return (
    <LinearGradient
      // Colors for the gradient
      colors={["#355e3b", "#d6d6ca"]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.4 }}
      style={styles.container}
    >
      <View
        style={[
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.logoCon}>
          <ImageBackground
            source={bikeLogo}
            style={{
              width: GDim.width * 0.45,
              height: GDim.height * 0.35,
            }}
            resizeMode='contain'
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleGoogle}>
            <Text style={styles.buttonText}>Continue with google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={handleSignUp}>
            <Text style={styles.buttonText} >Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingTop: GDim.height * 0.25 }}>
          <TouchableOpacity onPress={handleAHA}>
            <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8 }}>Already have an account?  Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Lrpage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: GDim.height * 0.075
  },
  logoCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#355E3B',
    width: GDim.width * 0.85,
    height: GDim.height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GDim.scale * 3
  },
  buttonText: {
    fontFamily: 'js-reg',
    fontSize: GDim.width * 0.055,
    color: 'white',
  }
})