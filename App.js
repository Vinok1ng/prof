import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Alert, TextInput, Modal } from 'react-native';

export default function App() {
  const [role, setRole] = useState(null);
  const [courses, setCourses] = useState([
    { id: '1', code: 'CSC 201', title: 'Intro to Programming', students: 28, tasks: 2, lecturer: 'Prof. Okafi' },
    { id: '2', code: 'CSC 305', title: 'Data Structures', students: 14, tasks: 1, lecturer: 'Prof. Okafi' },
  ]);
  const [myCourses, setMyCourses] = useState([
    { id: '1', code: 'CSC 201', title: 'Intro to Programming', lecturer: 'Prof. Okafi', due: 'Assignment due tomorrow' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateCourse = () => {
    if (!newCourseCode || !newCourseTitle) {
      Alert.alert('Error', 'Please fill course code and title');
      return;
    }
    const newCourse = {
      id: Date.now().toString(),
      code: newCourseCode,
      title: newCourseTitle,
      students: 0,
      tasks: 0,
      lecturer: 'Prof. Okafi'
    };
    setCourses([...courses, newCourse]);
    setNewCourseCode('');
    setNewCourseTitle('');
    setModalVisible(false);
    Alert.alert('Success', `${newCourseCode} created!`);
  };

  const handleJoinCourse = () => {
    if (!joinCode) {
      Alert.alert('Error', 'Enter course code');
      return;
    }
    const found = courses.find(c => c.code.toLowerCase() === joinCode.toLowerCase());
    if (!found) {
      Alert.alert('Not found', 'Course code not found');
      return;
    }
    if (myCourses.find(c => c.id === found.id)) {
      Alert.alert('Already joined', 'You already joined this course');
      return;
    }
    setMyCourses([...myCourses, { ...found, due: 'No pending tasks' }]);
    setJoinCode('');
    setModalVisible(false);
    Alert.alert('Joined!', `You joined ${found.code}`);
  };

  // WELCOME SCREEN
  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9ff" />
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

        <Text style={styles.footer}>Built by Vincent Okafi</Text>
      </SafeAreaView>
    );
  }

  // DASHBOARDS
  const isLecturer = role === 'lecturer';
  const displayCourses = isLecturer ? courses : myCourses;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{isLecturer ? 'Lecturer Dashboard' : 'Student Dashboard'}</Text>
          <TouchableOpacity onPress={() => setRole(null)}><Text style={styles.logout}>Switch Role</Text></TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? courses.length : myCourses.length}</Text><Text style={styles.statLabel}>{isLecturer ? 'Courses' : 'My Courses'}</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '42' : '3'}</Text><Text style={styles.statLabel}>{isLecturer ? 'Students' : 'Tasks Due'}</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '5' : '4.2'}</Text><Text style={styles.statLabel}>{isLecturer ? 'Pending' : 'GPA'}</Text></View>
        </View>

        <Text style={styles.sectionTitle}>{isLecturer ? 'My Courses' : 'My Enrolled Courses'}</Text>
        {displayCourses.map((c) => (
          <View key={c.id} style={styles.listItem}>
            <Text style={styles.listTitle}>{c.code} - {c.title}</Text>
            <Text style={styles.listSub}>{isLecturer ? `${c.students} students • ${c.tasks} assignments` : `${c.lecturer} • ${c.due}`}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.mainBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.mainBtnText}>{isLecturer ? '+ Create New Course' : '+ Join Course with Code'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtnSecondary} onPress={() => Alert.alert('Assignments', 'Assignment list coming next')}>
          <Text style={styles.mainBtnSecondaryText}>{isLecturer ? 'Post Assignment' : 'View All Assignments'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CREATE / JOIN MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{isLecturer ? 'Create New Course' : 'Join Course'}</Text>
            
            {isLecturer ? (
              <>
                <TextInput style={styles.input} placeholder="Course Code e.g CSC 401" value={newCourseCode} onChangeText={setNewCourseCode} />
                <TextInput style={styles.input} placeholder="Course Title e.g Operating Systems" value={newCourseTitle} onChangeText={setNewCourseTitle} />
                <TouchableOpacity style={styles.mainBtn} onPress={handleCreateCourse}><Text style={styles.mainBtnText}>Create Course</Text></TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput style={styles.input} placeholder="Enter Course Code e.g CSC 201" value={joinCode} onChangeText={setJoinCode} autoCapitalize="characters" />
                <TouchableOpacity style={styles.mainBtn} onPress={handleJoinCourse}><Text style={styles.mainBtnText}>Join Now</Text></TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9ff' },
  container: { flex: 1, backgroundColor: '#f8f9ff', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 48, fontWeight: 'bold', color: '#1a1aff' },
  subtitle: { fontSize: 22, fontWeight: '600', marginTop: -5, color: '#111' },
  desc: { fontSize: 14, color: '#666', marginTop: 8, marginBottom: 30 },
  cardBox: { width: '100%' },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, borderWidth: 2, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  lecturerCard: { borderColor: '#1a1aff' },
  studentCard: { borderColor: '#00c26a' },
  cardEmoji: { fontSize: 32 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 8, color: '#111' },
  cardDesc: { fontSize: 13, color: '#666', marginTop: 4 },
  footer: { marginTop: 30, fontSize: 12, color: '#999' },
  dashboardContent: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  logout: { color: '#1a1aff', fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  stat: { backgroundColor: 'white', width: '31%', borderRadius: 12, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#1a1aff' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 10, color: '#111' },
  listItem: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, shadowOffset: { width: 0, height: 1 }, elevation: 1 },
  listTitle: { fontWeight: '600', fontSize: 14, color: '#111' },
  listSub: { fontSize: 12, color: '#666', marginTop: 4 },
  mainBtn: { backgroundColor: '#1a1aff', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 },
  mainBtnText: { color: 'white', fontWeight: 'bold' },
  mainBtnSecondary: { backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#ddd' },
  mainBtnSecondaryText: { fontWeight: '600', color: '#111' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 12, fontSize: 14 },
  cancelBtn: { alignItems: 'center', marginTop: 14, padding: 10 },
  cancelText: { color: '#666', fontWeight: '600' }
});
