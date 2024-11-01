import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { FontAwesome as FA } from '@expo/vector-icons'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import GDim from '@/hooks/useDimension';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const HorizontalLine = ({ color = '#000', thickness = 1, style }) => {
    return <View style={[styles.line, { backgroundColor: color, height: thickness }, style]} />;
};


const getData = async () => {
    try {

        const name = await AsyncStorage.getItem('name');
        const address = await AsyncStorage.getItem('address');
        const phone = await AsyncStorage.getItem('phone');

        if (name !== null && address !== null && phone !== null) {
            return { name, address, phone };
        } else {
            return 'undefined';
        }
    } catch (e) {
        console.error('Failed to fetch data', e);
    }
};

const Reserve = () => {
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
    };
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zeros
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zeros
        return `${hours}:${minutes}`; // Format as HH:MM
    };
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [gettime, setGettime] = useState(formatTime(date));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setGettime(formatTime(currentDate));
        // console.log(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };




    const route = useRoute();
    const { gotId, gotBikeId, gotImageSource, gotBikeName, gotBikePrice } = route.params;

    const [dou, setDou] = useState(1); // Initial value
    const [bikePrice, setBikePrice] = useState(gotBikePrice);
    const [durationFee, setDurationFee] = useState(Math.floor(bikePrice));

    const reservationFee = 25; // Example fixed reservation fee
    const reserveHourFee = 20; // Example fixed reserve hour fee
    const totalFee = reservationFee + durationFee + reserveHourFee;

    const updateDurationFee = (duration) => {
        const fee = bikePrice * duration; // Calculate fee based on bike price and duration
        setDurationFee(fee);
    };
    // Function to increment the value
    const increment = () => {
        setDou(prevDuration => {
            const newDuration = prevDuration + 1;
            updateDurationFee(newDuration); // Update fee based on new duration
            return newDuration;
        });
    };

    // Function to decrement the value
    const decrement = () => {
        setDou(prevDuration => {
            const newDuration = Math.max(prevDuration - 1, 1); // Prevent negative values
            updateDurationFee(newDuration); // Update fee based on new duration
            return newDuration;
        });// Prevent negative values
    };
    const nav = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(loggedInStatus !== null ? JSON.parse(loggedInStatus) : false);
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsLoggedIn(false); // Default to false on error
        }
    };

    useEffect(() => {
        checkLoginStatus(); // Check login status on component mount
    }, []);


    const handleReserve = async () => {

        const userData = await getData();

        const reserveData = {
            uID: gotId,
            bike_id: gotBikeId,
            timeofuse: gettime,
            duration: dou.toString(),
            paymentTotal: totalFee.toString(),
            bike_status: "reserved",
            ...userData
        }
        console.log(reserveData);

        try {
            const response = await axios.put(`https://rbms-backend-g216.onrender.com/rbmsa/UpdateReserve/${gotId}`, reserveData);
            if (response.data.isReserved) {
                toast.success(response.data.message, {
                    position: "bottom-center",
                    duration: 1500
                })
            }else{
                toast.error(response.data.message + ", Please login first", {
                    position: "bottom-center",
                    duration: 1500,
                })
            }
        } catch (error) {
            console.error(error);
        }




    }
    const [gotuser, setGotuser] = useState({});
    const getuser = async () => {
        setGotuser(await getData())
    }
    useEffect(() => {
        getuser()

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ fontSize: GDim.width * 0.07, fontFamily: 'js-reg', paddingLeft: 12 }}>User Details</Text>
            </View>
            <HorizontalLine />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: GDim.width * 0.03, alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FA name='user' size={GDim.width * 0.1} color={'#355E3B'} />
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg', paddingLeft: 10 }}>Name</Text>
                </View>
                <View>
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>{gotuser.name}</Text>
                </View>
            </View>
            <HorizontalLine />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: GDim.width * 0.02, alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <EvilIcons name="location" size={GDim.width * 0.1} color={'#355E3B'} />
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Address</Text>
                </View>
                <View>
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg', paddingRight: 5 }}>{gotuser.address}</Text>
                </View>
            </View>
            <HorizontalLine />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: GDim.width * 0.03, alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FA name='phone' size={GDim.width * 0.1} color={'#355E3B'} />
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg', paddingLeft: 10 }}>phone</Text>
                </View>
                <View>
                    <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>{gotuser.phone}</Text>
                </View>
            </View>
            <HorizontalLine />
            <View style={{ position: 'relative', flex: 1 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
                    <ImageBackground source={{ uri: gotImageSource }} style={{ width: GDim.width * 0.5, height: GDim.height * 0.16 }} />
                    <View>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>{gotBikeName}</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>&#8369;{gotBikePrice} per hour</Text>
                    </View>
                </View>
                <View>
                    <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 25, marginTop: 25 }}>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Set time for reserve</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    value={gettime}
                                    onChangeText={setGettime} // Update the state when the text changes
                                    // Other optional props
                                    keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                    returnKeyType="done" // Change the return key type
                                    autoCapitalize="none"
                                    readOnly
                                />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                                <TouchableOpacity onPress={() => showTimepicker()} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                                    <FA name='clock-o' size={GDim.scale * 7} color={'#355E3B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Set duration of use</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={decrement} style={styles.iconButton}>
                                    <FA name='minus' size={GDim.scale * 7} color={'#355E3B'} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.douinput}
                                    value={String(dou)}
                                    editable={false}
                                />
                                <TouchableOpacity onPress={increment} style={styles.iconButton}>
                                    <FA name='plus' size={GDim.scale * 7} color={'#355E3B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ position: 'absolute', bottom: 15, width: GDim.width }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Reservation Fee:</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>&#8369;25</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Duration of use Fee:</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>&#8369;{durationFee}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Reserve hour Fee:</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>&#8369;20</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Total:</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>&#8369;{totalFee}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 20 }}>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>Payment Method</Text>
                        <Text style={{ fontSize: GDim.width * 0.055, fontFamily: 'js-reg' }}>GCash Only</Text>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => handleReserve()} style={{ backgroundColor: '#355E3B', width: GDim.width * 0.5, height: GDim.height * 0.06, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'js-reg', fontSize: GDim.width * 0.07 }}>Reserve Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Reserve

const styles = StyleSheet.create({
    line: {
        width: '100%',
    },
    inputCon: {
        width: GDim.width * 0.4,
    },
    inputLabel: {
        fontSize: GDim.width * 0.05,
        fontFamily: 'js-reg',
    },
    input: {
        height: GDim.height * 0.05,
        width: '100%',
        borderRadius: 5,
        paddingEnd: 40,
        paddingStart: 40,
        backgroundColor: '#FFF',
        fontFamily: 'js-reg',
        fontSize: GDim.scale * 10,
        textAlign: 'center'
    },
    douinput: {
        height: GDim.height * 0.05,
        width: '50%',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        fontFamily: 'js-reg',
        fontSize: GDim.scale * 10,
        textAlign: 'center'
    },
    iconButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white', // Optional: Background color for better visibility
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5, // Optional: Rounded corners for buttons
    },
})