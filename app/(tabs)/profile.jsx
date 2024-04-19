import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../../util/Kinde'
import services from '../../util/services'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router=useRouter()
  const [name, setName] = useState('')
  const [pic, setPic] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const handleLogout=async()=>{
    const log=await client.logout();
    if(log){
      await services.storeData('login','false');
      router.replace('/login')
    }
  }
  const getDetails = async () => {
    const user = await client.getUserDetails()
    setName(user.given_name)
    setEmail(user.email)
    setLname(user.family_name)
    setPic(user.picture)
  }

  useEffect(() => {
    getDetails()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, {name}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={pic?{ uri: pic}:{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuz0uUf33Ud5u8ITHK6tlCmyNy8JRW4tiLNw&s"} } style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name} {lname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={()=>{handleLogout()}} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          BudgetPlanner is a versatile mobile application designed to streamline personal finance management. It offers intuitive features for tracking expenses, setting budgets, and analyzing spending patterns, empowering users to make informed financial decisions. With its user-friendly interface and comprehensive tools, BudgetPlanner helps individuals effectively manage their finances on the go.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    height: 60,
    backgroundColor: '#8B42FC',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  email: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  logoutButton: {
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '60%',
    marginLeft: '20%',
    marginTop: 25,
    borderRadius: 25,
  },
  logoutButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'justify',
  },
})
