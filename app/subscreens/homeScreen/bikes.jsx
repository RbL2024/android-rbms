import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Keyboard} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as MIcon } from '@expo/vector-icons';
import { useMyTheme } from "@/hooks/useMyTheme";
import axios from "axios";
import useConnection from "@/hooks/useConnection";
import { toast } from 'sonner-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GDim from "@/hooks/useDimension";
const Tab = createMaterialTopTabNavigator();
import AdultsScreen from "../allBikes/adults";
import KidsScreen from "../allBikes/kids";


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

const Bikes = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const myTheme = useMyTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const { connectionStatus, serverStatus, isConnected } = useConnection();

  //Bikes
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await axios.get('http://192.168.1.10:8917/rbmsa/allBikes'); // Adjust the URL based on your backend
      setRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    const intervalId = setInterval(() => {
      fetchRecords(); // Fetch data every 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId);
  }, [isConnected])
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Adult's" 
        component={AdultsScreen} 
        options={{
          tabBarStyle:{
            backgroundColor: '#D6D6CA',
            height: GDim.height * 0.045
          },
          tabBarIndicatorStyle:{
            backgroundColor: '#355E3B'
          }
        }}/>
      <Tab.Screen 
        name="Kids's" 
        component={KidsScreen} 
        options={{
          tabBarStyle:{
            backgroundColor: '#D6D6CA',
            height: GDim.height * 0.045
          },
          tabBarIndicatorStyle:{
            backgroundColor: '#355E3B'
          }
        }}/>
    </Tab.Navigator>
  )
}

export default Bikes

const styles = StyleSheet.create({
  bikeCon: {
    backgroundColor: '#D6D6CA',
    flex: 1
  },
  SView: {
    height: GDim.height,
    width: GDim.width,
    maxHeight: GDim.height * 0.65,
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
    fontSize: GDim.scale * 7,
    fontWeight: 'bold',
    color: '#fff', // Text color
  },
  description: {
    fontSize: GDim.scale * 5,
    color: '#fff', // Text color
  },
})