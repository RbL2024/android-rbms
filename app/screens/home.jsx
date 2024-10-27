import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Keyboard, TextInput } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as MIcon } from '@expo/vector-icons';
import { useMyTheme } from "@/hooks/useMyTheme";
import bike1 from '@/assets/images/MB-White.png';

import GDim from "@/hooks/useDimension";

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

  const clearSearch = () => {
    setSearchQuery(''); // Clear the search input
    Keyboard.dismiss(); // Optionally dismiss the keyboard
  };
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
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
            <TouchableOpacity onPress={() => navigation.navigate('Rent')} style={styles.button}>
              <MIcon name="pedal-bike" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Lock')} style={styles.button}>
              <MIcon name="lock-outline" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Smart Lock</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Availability')} style={styles.button}>
              <MIcon name="checklist" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Availability</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TTrack')} style={styles.button}>
              <MIcon name="timer" size={GDim.scale * 18} color={myTheme.primary} />
              <Text style={styles.buttonText}>Time Tracker</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{marginTop:GDim.height*0.05, marginLeft:GDim.width*0.05}}>
            <Text style={{fontSize: GDim.scale * 12, fontWeight: 'bold'}}>Offers for you</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ofy}>
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
          </ScrollView>
        </View>
        <View>
          <View style={{marginTop:GDim.height*0.03, marginLeft:GDim.width*0.05}}>
            <Text style={{fontSize: GDim.scale * 12, fontWeight: 'bold'}}>All Bikes</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ofy}>

            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
            <Card
              title="Card Title 1"
              description="This is a description for card 1."
              onPress={() => console.log('Card 1 pressed!')}
              imageSource={bike1} // Replace with your image path
            />
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  homeNav: {
    marginTop: GDim.height * 0.09,
    width: GDim.width * 0.85,
    height: GDim.height * 0.11,
    backgroundColor: "#D6D6CA",
    borderRadius: GDim.scale * 2,
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
    fontSize: GDim.scale * 6,

  },
  ofy: {
    display: 'flex',
    marginTop: GDim.height * 0.01,

  },
  card: {
    borderRadius: 8,
    margin: GDim.scale * 4,
    overflow: 'hidden', // Ensures the border radius is applied
  },
  imageBackground: {
    width: GDim.width * 0.5,
    height: GDim.height * 0.15, // Set the height of the card
    justifyContent: 'flex-end', // Align content at the bottom
  },
  image: {
    borderRadius: 8,
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
    padding: GDim.scale * 2,
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


