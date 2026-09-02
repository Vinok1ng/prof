import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [role, setRole] = useState(null);
  const [school, setSchool] = useState('');
  const [tempSchool, setTempSchool] = useState('');
  const [schoolSet, setSchoolSet] = useState(false);

  const [courses, setCourses] = useState([
    { id: '1', code: 'CSC 201', title: 'Intro to Programming', students: 28, assignments: 2 },
    { id: '2', code: 'CSC 305', title: 'Data Structures', students: 14, assignments: 1 },
  ]);
  const [myCourses, setMyCourses] = useState([
    { id: '1', code: 'CSC 201', title: 'Intro to Programming', lecturer: 'Dr. Okafi' }
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const isLecturer = role === 'lecturer';

  const handleSetSchool = () => {
    if (!tempSchool.trim()) {
      Alert.alert('Enter School Name', 'Please enter your school name');
      return;
    }
    setSchool(tempSchool.trim());
    setSchoolSet(true);
  };

  const handleCreateCourse = () => {
    if (!newCode || !newTitle) {
      Alert.alert('Error', 'Enter code and title');
      return;
    }
    const newCourse = { id: Date.now().toString(), code: newCode.toUpperCase(), title: newTitle, students: 0, assignments: 0 };
    setCourses([newCourse, ...courses]);
    setNewCode(''); setNewTitle(''); setShowCreate(false);
    Alert.alert('Success!', `${newCourse.code} created for ${school}`);
  };

  const handleJoinCourse = (course) => {
    if (myCourses.find(c => c.id === course.id)) {
      Alert.alert('Already joined');
      return;
    }
    setMyCourses([...myCourses, course]);
    Alert.alert('Joined!', `You joined ${course.code} at ${school}`);
  };

  // STEP 0: UNIVERSAL SCHOOL SETUP
  if (!schoolSet) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.logoBadge}><Text style={styles.logoText}>P</Text></View>
        <Text style={styles.title}>Prof</Text>
        <Text style={styles.subtitle}>Campus Connect</Text>
        <Text style={styles.desc}>Universal Platform for ALL Schools in Nigeria</Text>

        <View style={styles.setupBox}>
          <Text style={styles.setupTitle}>🏫 What is your school?</Text>
          <Text style={styles.setupDesc}>This app works for ANY school. Enter your school name once.</Text>
          <TextInput 
            style={styles.schoolInput} 
            placeholder="e.g. Federal Polytechnic Bauchi" 
            value={tempSchool} 
            onChangeText={setTempSchool
