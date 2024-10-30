import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';


import GDim from '@/hooks/useDimension';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Preview = ({ route }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { imageSource, bikeName, bikeDesc, bikePrice, bikeId, id } = route.params;

    const handleReserveBTN = () => {
        // This function will be executed if the user is logged in
        navigation.navigate('Reserve', {
            gotId: id,
            gotBikeId:  bikeId,
            gotBikeName: bikeName,
            gotBikeDesc: bikeDesc,
            gotBikePrice: bikePrice,
            gotImageSource:  imageSource,
        })
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
                <View style={styles.bikeInfoCon}>
                    <ImageBackground source={{ uri: imageSource }} style={styles.imgStyle} />
                    <View style={styles.bikeInfo}>
                        <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 10, fontWeight: 'bold' }}>{bikeName}</Text>
                        <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 6}}>Bike ID : {bikeId}</Text>
                        <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8, marginTop: GDim.height * 0.03, fontWeight: 'bold' }}>Description</Text>
                        <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8, }}>{bikeDesc}</Text>
                        <View style={styles.prCon}>
                            <View>
                                <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8 }}>Price(&#8369;): </Text>
                                <Text style={{ fontFamily: 'js-reg', fontSize: GDim.scale * 8 }}>{bikePrice} per hour</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.btnReserve} onPress={handleReserveBTN}>
                                    <Text style={[{ fontFamily: 'js-reg', fontSize: GDim.scale * 10, color: 'white' }]} >Reserve</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Preview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bikeInfoCon: {
        flex: 1,
        position: 'relative'
    },
    imgStyle: {
        width: GDim.width,
        height: GDim.height * 0.325
    },
    bikeInfo: {
        flex: 1,
        backgroundColor: '#D6D6CA',
        width: GDim.width,
        height: GDim.height * 0.55,
        elevation: 50,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: GDim.scale * 10
    },
    btnReserve: {
        width: GDim.width * 0.5,
        height: GDim.height * 0.050,
        backgroundColor: '#355E3B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: GDim.scale * 4
    },
    prCon:{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: GDim.width,
        padding: GDim.scale * 10,
        bottom: 0

    }
})
