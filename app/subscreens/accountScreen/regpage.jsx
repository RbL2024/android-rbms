import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GDim from '@/hooks/useDimension';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome as FA } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import toc from '@/assets/images/toc.png';


const Regpage = () => {

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
    };
    const insets = useSafeAreaInsets();
    const nav = useNavigation();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bdate, setBdate] = useState(formatDate(date));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [street, setStreet] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCPassword, setShowCPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setBdate(formatDate(currentDate));
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

    const handleInputChange = (field, value) => {
        setEmail(value);
    };
    const emailPattern = /^(.*@gmail\.com|.*@yahoo\.com)$/;
    const isValidEmail = (email) => {
        const emailPattern = /^(.*@gmail\.com|.*@yahoo\.com)$/;
        return emailPattern.test(email);
    };
    const handleSignUp = async () => {
        if(!isChecked){
            toast.error('Please accept the terms and conditions',{
                position: "bottom-center",
                duration: 2000
            });
            return;
        }
        if (areInputsEmpty()) {
            toast.error("Please fill in all fields.", {
                position: 'bottom-center',
                duration: 2000
            }); // Show an error message
            return; // Prevent further action
        }
        if (!isValidEmail(email)) {
            Alert.alert("Error", "Please enter a valid Gmail or Yahoo email address."); // Show an error message
            return; // Prevent further action
        }
        const data = {
            i_first_name: firstname,
            i_middle_name: middlename,
            i_last_name: lastname,
            i_age: age,
            i_bdate: bdate,
            i_gender: gender,
            i_username: username,
            i_password: password,
            i_city: city,
            i_province: province,
            i_street: street,
            i_postalCode: postalcode,
            i_email: email,
            i_phone: phone,
        }
        try {
            console.log(data);
            const createAcc = await axios.post('https://rbms-backend-g216.onrender.com/rbmsa/createUser', data);
            // console.log('Response from API:', createAcc.data);
            if (createAcc.data.isCreated) {
                toast.success(createAcc.data.message, {
                    position: 'bottom-center',
                    duration: 2000,
                    onAutoClose:()=>{
                        clearInputs();
                    }
                })
            } else {
                toast.error(createAcc.data.message, {
                    position: 'bottom-center',
                    duration: 2000
                })
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    const clearInputs = () =>{
        setFirstname('');
        setMiddlename('');
        setLastname('');
        setAge('');
        setBdate('');
        setGender('');
        setUsername('');
        setPassword('');
        setCity('');
        setProvince('');
        setStreet('');
        setPostalcode('');
        setEmail('');
        setPhone('');

    }
    const areInputsEmpty = () => {
        return (
            !firstname.trim() ||
            !middlename.trim() ||
            !lastname.trim() ||
            !age.trim() ||
            !gender.trim() ||
            !username.trim() ||
            !password.trim() ||
            !confirmPassword.trim() ||
            !city.trim() ||
            !province.trim() ||
            !street.trim() ||
            !postalcode.trim() ||
            !email.trim() ||
            !phone.trim()
        );
    };

    const handleCheckboxPress = () => {
        if (!isChecked) {
            setModalVisible(true);
        } else {
            setIsChecked(false);
        }
    };

    const handleAgree = () => {
        setIsChecked(true);
        setModalVisible(false);

    };

    const handleClose = () => {
        setModalVisible(false);
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <LinearGradient
                // Colors for the gradient
                colors={["#355e3b", "#d6d6ca"]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 0.4 }}
                style={styles.container}
            >
                {/* <View style={{position:'absolute', left:GDim.width*0.05,top:GDim.height*0.06}}>
                    <Text style={{color:'white'}}>&#60;&#60;Swipe left to login</Text>
                </View> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
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
                        {/* <View style={styles.logoCon}>
                            <ImageBackground
                                source={bikeLogo}
                                style={{
                                    width: GDim.width * 0.45,
                                    height: GDim.height * 0.35,
                                }}
                                resizeMode='contain'
                            />
                        </View> */}

                        <View>
                            <Text style={styles.title}>Create your account</Text>
                        </View>
                        <Text style={{
                            fontSize: GDim.width * 0.07,
                            fontFamily: 'js-reg',
                            color: '#4C4C4C',
                        }}>User Information</Text>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={firstname}
                                onChangeText={setFirstname} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Middle Name</Text>
                            <TextInput
                                style={styles.input}
                                value={middlename}
                                onChangeText={setMiddlename} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={lastname}
                                onChangeText={setLastname} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Age</Text>
                            <TextInput
                                style={styles.input}
                                value={age}
                                onChangeText={setAge} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Date of birth</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    value={bdate}
                                    onChangeText={setBdate} // Update the state when the text changes
                                    // Other optional props
                                    keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                    returnKeyType="done" // Change the return key type
                                    autoCapitalize="none"
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
                                <TouchableOpacity onPress={() => showDatepicker()} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                                    <FA name='calendar-o' size={GDim.scale * 7} color={'#355E3B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Gender</Text>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) => setGender(itemValue)} // Update the state when the value changes
                                style={styles.input} // Use the same styles as the TextInput
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
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
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword} // Update the state when the text changes
                                    secureTextEntry={!showCPassword} // Toggle secure text entry
                                    keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                    returnKeyType="done" // Change the return key type
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setShowCPassword(!showCPassword)} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                                    <FA name={showCPassword ? 'eye' : 'eye-slash'} size={GDim.scale * 8} color={'#355E3B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: GDim.width * 0.07,
                            fontFamily: 'js-reg',
                            color: '#4C4C4C',
                            marginTop: GDim.height * 0.05
                        }}>Address</Text>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>City</Text>
                            <TextInput
                                style={styles.input}
                                value={city}
                                onChangeText={setCity} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Province</Text>
                            <TextInput
                                style={styles.input}
                                value={province}
                                onChangeText={setProvince} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Street Address</Text>
                            <TextInput
                                style={styles.input}
                                value={street}
                                onChangeText={setStreet} // Update the state when the text changes
                                // Other optional props
                                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Zip Code (optional)</Text>
                            <TextInput
                                style={styles.input}
                                value={postalcode}
                                onChangeText={setPostalcode} // Update the state when the text changes
                                // Other optional props
                                keyboardType="numeric" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={{
                            fontSize: GDim.width * 0.07,
                            fontFamily: 'js-reg',
                            color: '#4C4C4C',
                            marginTop: GDim.height * 0.05
                        }}>Contact Information</Text>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                keyboardType="email" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Contact No.</Text>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone} // Update the state when the text changes
                                // Other optional props
                                keyboardType="numeric" // Options: 'default', 'numeric', 'email-address', etc.
                                returnKeyType="done" // Change the return key type
                                autoCapitalize="none"
                            />
                        </View>
                        <BouncyCheckbox
                            size={20}
                            fillColor="#355E3B"
                            text="I agree to terms & conditions"
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "js-reg" }}
                            isChecked={isChecked}
                            onPress={handleCheckboxPress}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={handleClose}
                        >
                            <View style={styles.modalView}>
                                <ScrollView >
                                    <View>
                                        <ImageBackground source={toc} style={{ width: GDim.width * 0.2, height: GDim.height * 0.10, alignSelf: 'center' }} />
                                    </View>
                                    <Text style={styles.modalText}>
                                        Terms and Conditions
                                    </Text>
                                    <Text style={styles.termsText}>
                                        By using the Rental Bike Management System, you agree to the following terms and conditions:
                                    </Text>
                                    <Text style={styles.termsText}>
                                        Protection of Personal Information{'\n'}
                                        • We are committed to safeguarding your personal information and ensuring that it remains secure. We only collect essential data for providing our services, in accordance with our Privacy Policy.
                                        {'\n'}{'\n'}
                                        Online Payment and No Cancellation{'\n'}
                                        • All bike reservations must be made through the online payment options provided in the app. We do not accept cash payments. Once a reservation is confirmed and paid for, it cannot be canceled, changed, or refunded, so please review your booking details carefully.
                                        {'\n'}{'\n'}
                                        Age Requirement{'\n'}
                                        • Only users aged 8 years and above are allowed to rent or use our bicycles. Users between the ages of 8-10 must provide parental consent and a valid ID if renting in person.
                                        {'\n'}{'\n'}
                                        Smartphone and App Requirement{'\n'}
                                        • A smartphone and our mobile application are required to lock and unlock the bicycles. The app serves as the primary tool for accessing and controlling the bike's smart lock system.
                                        {'\n'}{'\n'}
                                        Location Monitoring{'\n'}
                                        • Only users aged 8 years and above are allowed to rent or use our bicycles. Users between the ages of 8-10 must provide parental consent and a valid ID if renting in person.
                                        {'\n'}{'\n'}
                                        Walk-in Clients (8-10 years old){'\n'}
                                        • For walk-in rentals, children between the ages of 8-10 must have a parent or legal guardian present to provide consent. Additionally, a valid ID for the child must be presented to proceed with the rental.
                                        {'\n'}{'\n'}
                                        Reservation and Payment{'\n'}
                                        • Customers must pay for the hour of bike use that they reserve, whether they are walk-in or online customers.{'\n'}
                                        • If a customer returns the bike late, they will be charged for the additional time, calculated in minutes or hours.
                                        {'\n'}{'\n'}
                                        Reservation Policy{'\n'}
                                        • If the reservation time expires, customers have the option to extend their reservation by paying for an additional hour.{'\n'}
                                        • The maximum allowable extension is three hours.
                                        {'\n'}{'\n'}
                                        Cancellation of Reservation{'\n'}
                                        • If a customer fails to pick up the bike within the allotted reservation time and does not extend their reservation, the reservation will automatically be cancelled.
                                        {'\n'}{'\n'}
                                        Liability{'\n'}
                                        • Customers are responsible for the bike during the rental period and must report any damage or issues immediately.
                                        {'\n'}{'\n'}
                                        Compliance{'\n'}
                                        • Customers agree to comply with all local laws and regulations regarding bike usage.
                                        {'\n'}{'\n'}
                                        Changes to Terms{'\n'}
                                        • These terms may be updated periodically. Customers are encouraged to review them regularly.{'\n'}
                                        {'\n'}{'\n'}
                                        By using our service, you confirm that you have read, understood, and agree to these terms and conditions.
                                    </Text>
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.mdlbutton}
                                    onPress={handleAgree}
                                >
                                    <Text style={styles.mdlbuttonText}>I Agree</Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity
                                    style={styles.mdlbutton}
                                    onPress={handleClose}
                                >
                                    <Text style={styles.mdlbuttonText}>Cancel</Text>
                                </TouchableOpacity> */}
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
                <View style={{ marginVertical: GDim.height * 0.015, gap: GDim.scale * 5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => handleSignUp()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8 }}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Regpage

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
    title: {
        fontFamily: 'js-reg',
        fontSize: GDim.width * 0.09,
        textAlign: 'center',
        marginBottom: GDim.height * 0.02


    },
    button: {
        backgroundColor: '#355E3B',
        width: GDim.width * 0.85,
        height: GDim.height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: GDim.scale * 3,

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
        paddingEnd: 40,
        marginBottom: 12,
        backgroundColor: '#FFF',
        fontFamily: 'js-reg',
        fontSize: GDim.scale * 8,
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
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height: GDim.height * 0.9,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: GDim.width * 0.05,

    },
    termsText: {
        marginBottom: 20,
        textAlign: 'justify',
    },
    mdlbutton: {
        backgroundColor: '#355E3B',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
    },
    mdlbuttonText: {
        color: 'white',
        fontFamily: 'js-reg'
    },
})