import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const clearLoginStatus = async () => {
    try {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('address');
        await AsyncStorage.removeItem('phone');
        console.log('Login status cleared');
    } catch (error) {
        console.error('Error clearing login status:', error);
    }
};

const Accountmain = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
                setIsLoggedIn(loggedInStatus === 'true');
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        await clearLoginStatus(); // Clear the login status
        setIsLoggedIn(false); 
        navigation.navigate('LOGPage');
        console.log('tae')
    };
  return (
    <View style={styles.container}>
      <Text>accountmain</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Accountmain

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})