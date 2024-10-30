import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Keyboard, TextInput, KeyboardAvoidingView, Platform, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as MIcon } from '@expo/vector-icons';
import { useMyTheme } from "@/hooks/useMyTheme";
import axios from "axios";
import useConnection from "@/hooks/useConnection";
import { toast } from 'sonner-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GDim from "@/hooks/useDimension";
const getLoginStatus = async () => {
  try {
    const value = await AsyncStorage.getItem('isLoggedIn'); // Replace 'isLoggedIn' with your key
    if (value !== null) {
      // Value exists, convert it to boolean if needed
      return value === 'true'; // Assuming the value is stored as a string
    }
    return false; // Default to false if no value found
  } catch (error) {
    console.error('Error retrieving login status:', error);
    return false; // Handle error and return default value
  }
};

const checkLoginStatus = async () => {
  const isLoggedIn = await getLoginStatus();
  console.log('Is user logged in?', isLoggedIn);
  return isLoggedIn;
};

//Components

const Card = ({ title, description, onPress, imageSource }) => {
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <ImageBackground source={imageSource} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const myTheme = useMyTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const { connectionStatus, serverStatus, isConnected } = useConnection();

  //Bikes
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();


  const clearSearch = () => {
    setSearchQuery(''); // Clear the search input
    Keyboard.dismiss(); // Optionally dismiss the keyboard
  };
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };



  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://rbms-backend-g216.onrender.com/rbmsa/topBikes'); // Adjust the URL based on your backend
      setRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecords(); // Fetch records again
    setRefreshing(false); // Set refreshing to false after fetching
  };
  

  useEffect(() => {
    
    if (isConnected) {
      toast.success('Connected to server', {
        position: 'bottom-center',
        duration: 2000,
      })
    }

    fetchRecords();
    const intervalId = setInterval(() => {
      fetchRecords(); // Fetch data every 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId);
  }, [isConnected])


  const handleCardPress = (bike) => {
    // This function will be executed if the user is logged in
    navigation.navigate('Preview', {
      imageSource: bike.bike_image_url,
      bikeName: bike.bike_name,
      bikeDesc: bike.bike_desc,
      bikePrice: bike.bike_rent_price,
      bikeId: bike.bike_id,
      id: bike._id,
    });
  };

  const handleNavPress = (destination) => {
    if (!isLoggedIn) {
      navigation.navigate('Account'); // Redirect to Account tab if not logged in
    } else {
      navigation.navigate(destination); // Navigate to the desired screen if logged in
    }
  };

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
        <View >
          <View style={styles.sbcontainer}>
            <View style={styles.searchContainer}>
              <MIcon name="search" size={28} color="gray" style={styles.icon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
              {searchQuery.length > 0 && ( // Show clear button only if there is text in the input
                <MIcon name="clear" size={28} color="gray" style={styles.clearIcon} onPress={clearSearch} />
              )}
            </View>
            {/* <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          )}
        /> */}
          </View>
          <View style={styles.homeNav}>
            <TouchableOpacity onPress={() => navigation.navigate('Bikes')} style={styles.button}>
              <MIcon name="pedal-bike" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Bikes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Lock')} style={styles.button}>
              <MIcon name="lock-outline" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Smart Lock</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Availability')} style={styles.button}>
              <MIcon name="checklist" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Availability</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('TTrack')} style={styles.button}>
              <MIcon name="timer" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Time Tracker</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View>
          <View style={{ marginTop: GDim.height * 0.04, marginLeft: GDim.width * 0.05 }}>
            <Text style={{ fontSize: GDim.scale * 10, fontWeight: 'bold' }}>New Bikes</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={true} style={styles.SView} contentContainerStyle={styles.scrollViewCon}>
            {
              records.map((bike, index) => (
                <Card key={index}
                  title={bike.bike_name}
                  description="see details"
                  onPress={() => handleCardPress(bike)}
                  imageSource={{ uri: bike.bike_image_url }} // Replace with your image path
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  homeNav: {
    marginTop: GDim.height * 0.09,
    width: GDim.width * 0.85,
    height: GDim.height * 0.11,
    backgroundColor: "#D6D6CA",
    borderRadius: GDim.scale * 5,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    padding: GDim.scale * 5,

  },
  button: {
    flex: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: GDim.scale * 5,

  },
  SView: {
    height: GDim.height * 0.55,
    width: GDim.width,
    maxHeight: GDim.height * 0.55,
  },
  scrollViewCon: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 8,
    margin: GDim.scale * 4,
    overflow: 'hidden', // Ensures the border radius is applied
  },
  imageBackground: {
    width: GDim.width * 0.5 - 25,
    height: GDim.height * 0.15 - 25, // Set the height of the card
    justifyContent: 'flex-end', // Align content at the bottom
  },
  image: {
    borderRadius: 8,
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
    padding: GDim.scale * 1,
  },
  title: {
    fontSize: GDim.scale * 5,
    fontWeight: 'bold',
    color: '#fff', // Text color
  },
  description: {
    fontSize: GDim.scale * 4,
    color: '#fff', // Text color
  },
  sbcontainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    height: GDim.width * 0.1,
  },
  clearIcon: {
    marginRight: 0, // Space between clear icon and input
  },
  icon: {
    marginRight: 0, // Space between icon and input
  },
  searchBar: {
    flex: 1, // Allow the input to take the remaining space
    height: 35,
    paddingVertical: 0, // Remove default vertical padding
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});


