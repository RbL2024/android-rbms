import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GDim from '@/hooks/useDimension';
import bikeLogo from '@/assets/images/bikeLogo.png';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome as FA } from '@expo/vector-icons';


const setLoggedIn = async (isLoggedIn) => {
    try {
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    } catch (error) {
        console.error('Error setting login status:', error);
    }
};

// const storeData = async (username, password) => {
//     try {
//         await AsyncStorage.setItem('username', username);
//         await AsyncStorage.setItem('password', password); // Note: Storing passwords is not secure
//     } catch (e) {
//         console.error('Failed to save data', e);
//     }
// };
const storeData = async (cName, cAddress, cPhone) => {
    try {
        await AsyncStorage.setItem('name', cName);
        await AsyncStorage.setItem('address', cAddress);
        await AsyncStorage.setItem('phone', cPhone); // Note: Storing passwords is not secure
    } catch (e) {
        console.error('Failed to save data', e);
    }
};
const getData = async () => {
    try {
        
        const name = await AsyncStorage.getItem('name');
        const address = await AsyncStorage.getItem('address');
        const phone = await AsyncStorage.getItem('phone');

        if (name !== null && address !== null &&  phone !== null) {
            return { name, address, phone };
        }
    } catch (e) {
        console.error('Failed to fetch data', e);
    }
};

const Logpage = () => {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const clearInputs = () =>{
        setUsername('');
        setPassword('');
    }
    const handleLogin = async () => {
        if (username === '' || password === '') {
            toast('Please fill in all fields', {
                position: 'bottom-center',
                duration: 2000,
            });
            return;
        }
        try {
            const data = {
                i_username: username,
                i_password: password
            }
            const logAcc = await axios.post('https://rbms-backend-g216.onrender.com/rbmsa/loginAcc', data);
            
            if (logAcc.data.isFound) {
                toast.success(logAcc.data.message, {
                    position: 'bottom-center',
                    duration: 1500,
                    onAutoClose: () => {
                        clearInputs();
                        nav.navigate('ACmainPage');
                        setLoggedIn(true);
                        const cName = logAcc.data.loginData.c_first_name + " " + String(logAcc.data.loginData.c_middle_name).charAt(0) + ". " + logAcc.data.loginData.c_last_name
                        const cAddress = logAcc.data.loginData.c_full_address.city
                        const cPhone = logAcc.data.loginData.c_phone
                        storeData(cName, cAddress , cPhone);
                    },
                    onDismiss: () => {
                        clearInputs();
                        nav.navigate('ACmainPage');
                        setLoggedIn(true);
                    }
                })
            } else {
                toast.error(logAcc.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <LinearGradient
                // Colors for the gradient
                colors={["#355e3b", "#d6d6ca"]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 0.4 }}
                style={styles.container}
            >
                {/* <View style={{position:'absolute', right:GDim.width*0.05,top:GDim.height*0.06}}>
                    <Text style={{color:'white'}}>Swipe right to register</Text>
                </View> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ maxHeight: GDim.height }}>
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


                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword} // Update the state when the text changes
                                    secureTextEntry={!showPassword} // Toggle secure text entry
                                    keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                    returnKeyType="done" // Change the return key type
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                                    <FA name={showPassword ? 'eye' : 'eye-slash'} size={GDim.scale * 8} color={'#355E3B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: GDim.height * 0.02 }}>
                            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', paddingTop: GDim.height * 0.1 }}>
                            <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 5 }}>Swipe right to register</Text>
                        </View>
                        <View style={{ alignItems: 'center', paddingTop: GDim.height * 0.02 }}>
                            <TouchableOpacity>
                                <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8 }}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Logpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: GDim.height * 0.03,
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
    },
    inputCon: {
        width: GDim.width * 0.80,
    },
    inputLabel: {
        fontSize: GDim.width * 0.07,
        fontFamily: 'js-reg',
    },
    input: {
        height: GDim.height * 0.05,
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#FFF',
        fontFamily: 'js-reg',
        fontSize: GDim.scale * 8

    },
    button: {
        backgroundColor: '#355E3B',
        width: GDim.width * 0.5,
        height: GDim.height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: GDim.scale * 50
    },
    buttonText: {
        fontFamily: 'js-reg',
        fontSize: GDim.width * 0.055,
        color: 'white',
    }
})