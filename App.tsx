import { View, Text, Button, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification from "react-native-push-notification";
import NetInfo from "@react-native-community/netinfo"

export default function App() {

  const createChannels=()=>{
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  useEffect(()=>{
     createChannels()
  },[])

  const handleNotification=()=>{

    PushNotification.localNotification({
      channelId:"channel-id",
      title:"You clicked on test",
      message:"Test",
    })
  }

  const setTimeNotification=()=>{
    PushNotification.localNotificationSchedule({
      channelId:"channel-id",
      title:"Alarm",
      message:"It's time to work!",
      date: new Date(Date.now()+5*1000),
      allowWhileIdle:true
    })
  }
  return (
    <View>
      <NetInformation/>
    <Button 
    onPress={()=>{handleNotification()}}
    title="Test" />
<Text> {'\n'}</Text>
    <Button onPress={setTimeNotification} title="set time"/>
  
    </View>
  )
}

const NetInformation=()=>{
const [netInfo, setNetInfo]=useState({})
console.log(netInfo)
useEffect(()=>{
const data=NetInfo.addEventListener((state)=>{
  setNetInfo(state)
})
return()=>{
  data()
}
},[NetInfo])


// if(netInfo.isConnected ==="false"){
//   PushNotification.localNotification({
//     channelId:"channel-id",
//     title:"Internet Disconnected",
//     message:"Your Net is Disconnected!",
//   })
// }else if(netInfo.isConnected ==="true"){
//   PushNotification.localNotification({
//     channelId:"channel-id",
//     title:"Internet Connected",
//     message:"Your Net is connected!",
//   })
// }
  return(
    <View style={{marginVertical:50,alignItems:"center"}}>
     <Text style={styles.textTitle}>Connectivity: {netInfo?.isConnected?"Connected":"Disconnected"}</Text>
     <Text style={styles.textTitle}>Connected Type: {netInfo?.type}</Text>
     <Text style={styles.textTitle}>IP Address: {netInfo?.details?.ipAddress}</Text>
     <Text style={styles.textTitle}>Frequency: {netInfo?.details?.frequency}</Text>

    </View>
  )
}

const styles=StyleSheet.create({
  textTitle:{
fontSize:20,
lineHeight:40,
fontWeight:"600"
  },
  btn:{
    margin:50
  }
})