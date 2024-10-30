import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons as MIcon } from '@expo/vector-icons'
import { useMyTheme } from '@/hooks/useMyTheme';
import { useLock } from '@/context/lockContex';

import GDim from '@/hooks/useDimension'

const Lock = () => {
  const myTheme = useMyTheme();
  const {isLock, setIsLock} = useLock();

  const  handleLock = () => {
    setIsLock(!isLock);
  }


  return (
    <View style={styles.mainCon}>
      <TouchableOpacity onPress={handleLock}>
        {
          isLock 
          ? (
              <View style={styles.lockCon}>
                <MIcon name='lock-outline' size={GDim.scale * 90} color={myTheme.primary} />
                <Text style={{fontFamily:'js-reg', fontSize:GDim.scale*10, textAlign:'center'}}>The bicycle is locked</Text>
                <Text style={{fontFamily:'js-reg', fontSize:GDim.scale*13, textAlign:'center'}}>TAP THE LOCK ICON TO UNLOCK</Text>
              </View>
            )
          : (
              <View style={styles.lockCon}>
                <MIcon name='lock-open' size={GDim.scale * 90} color={myTheme.primary} />
                <Text style={{fontFamily:'js-reg', fontSize:GDim.scale*10, textAlign:'center'}}>The bicycle is now unlocked</Text>
                <Text style={{fontFamily:'js-reg', fontSize:GDim.scale*13, textAlign:'center'}}>TAP THE LOCK ICON TO LOCK</Text>
              </View>
            )
        }
        
      </TouchableOpacity>
    </View>
  )
}

export default Lock

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#D6D6CA',
    height: GDim.height * 0.1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})