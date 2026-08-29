import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function App() {
  const [role, setRole] = useState(null);

  // WELCOME SCREEN - Choose Role
  if (!role) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Prof</Text>
        <Text style={styles.subtitle}>Campus Connect</Text>
        <Text style={styles.desc}>Where Lecturers and Students Connect</Text>

        <View style={styles.cardBox}>
          <TouchableOpacity style={[styles.card, styles.lecturerCard]} onPress={() => setRole('lecturer')}>
            <Text style={styles.cardEmoji}>👨‍🏫</Text>
            <Text style={styles.cardTitle}>I am a Lecturer</Text>
            <Text style={styles.cardDesc}>Create courses, post assignments, track students</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.studentCard]} onPress={() => setRole('student')}>
            <Text style={styles.cardEmoji}>👨‍🎓</Text>
            <Text style={styles.cardTitle}>I am a Student</Text>
            <Text style={styles.cardDesc}>Join courses, view tasks, submit work</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Built on mobile by Vincent Okafi</Text>
      </View>
    );
  }

  // LECTURER DASHBOARD
  if (role === 'lecturer') {
    return (
      <ScrollView style={styles.dashboard}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Lecturer Dashboard</Text>
          <TouchableOpacity onPress={() => setRole(null)}><Text style={styles.logout}>Switch Role</Text></TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Courses</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>42</Text><Text style={styles.statLabel}>Students</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>5</Text><Text style={styles.statLabel}>Pending</Text></View>
        </View>

        <Text style={styles.sectionTitle}>My Courses</Text>
        <View style={styles.listItem}><Text style={styles.listTitle}>CSC 201 - Intro to Programming</Text><Text style={styles.listSub}>28 students • 2 assignments</Text></View>
        <View style={styles.listItem}><Text style={styles.listTitle}>CSC 305 - Data Structures</Text><Text style={styles.listSub}>14 students • 1 assignment</Text></View>

        <TouchableOpacity style={styles.mainBtn}><Text style={styles.mainBtnText}>+ Create New Course</Text></TouchableOpacity>
        <TouchableOpacity style={styles.mainBtnSecondary}><Text style={styles.mainBtnSecondaryText}>Post Assignment</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  // STUDENT DASHBOARD
  return (
    <ScrollView style={styles.dashboard}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Dashboard</Text>
        <TouchableOpacity onPress={() => setRole(null)}><Text style={styles.logout}>Switch Role</Text></TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}><Text style={styles.statNum}>2</Text><Text style={styles.statLabel}>My Courses</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Tasks Due</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>4.2</Text><Text style={styles.statLabel}>GPA</Text></View>
      </View>

      <Text style={styles.sectionTitle}>My Enrolled Courses</Text>
      <View style={styles.listItem}><Text style={styles.listTitle}>CSC 201 - Intro to Programming</Text><Text style={styles.listSub}>Prof. Okafi • Assignment due tomorrow</Text></View>
      <View style={styles.listItem}><Text style={styles.listTitle}>MTH 101 - Calculus I</Text><Text style={styles.listSub}>Prof. Johnson • No pending tasks</Text></View>

      <TouchableOpacity style={styles.mainBtn}><Text style={styles.mainBtnText}>+ Join Course with Code</Text></TouchableOpacity>
      <TouchableOpacity style={styles.mainBtnSecondary}><Text style={styles.mainBtnSecondaryText}>View All Assignments</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9ff', alignItems: 'center', paddingTop: 80, paddingHorizontal: 20 },
  title: { fontSize: 48, fontWeight: 'bold', color: '#1a1aff' },
  subtitle: { fontSize: 22, fontWeight: '600', marginTop: -5 },
  desc: { fontSize: 14, color: '#666', marginTop: 8, marginBottom: 30 },
  cardBox: { width: '100%', gap: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, borderWidth: 2 },
  lecturerCard: { borderColor: '#1a1aff' },
  studentCard: { borderColor: '#00c26a' },
  cardEmoji: { fontSize: 32 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  cardDesc: { fontSize: 13, color: '#666', marginTop: 4 },
  footer: { marginTop: 40, fontSize: 12, color: '#999' },
  dashboard: { flex: 1, backgroundColor: '#f8f9ff', paddingHorizontal: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  logout: { color: '#1a1aff', fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  stat: { backgroundColor: 'white', width: '31%', borderRadius: 12, padding: 14, alignItems: 'center', elevation: 2 },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#1a1aff' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
  listItem: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 10 },
  listTitle: { fontWeight: '600', fontSize: 14 },
  listSub: { fontSize: 12, color: '#666', marginTop: 4 },
  mainBtn: { backgroundColor: '#1a1aff', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 },
  mainBtnText: { color: 'white', fontWeight: 'bold' },
  mainBtnSecondary: { backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#ddd' },
  mainBtnSecondaryText: { fontWeight: '600' }
});
