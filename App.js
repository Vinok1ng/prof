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

  if (!schoolSet) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.logoBadge}><Text style={styles.logoText}>P</Text></View>
        <Text style={styles.title}>Prof</Text>
        <Text style={styles.subtitle}>Campus Connect</Text>
        <Text style={styles.desc}>Universal Platform for ANY School Worldwide 🌍</Text>
        <View style={styles.setupBox}>
          <Text style={styles.setupTitle}>🏫 What is your school?</Text>
          <Text style={styles.setupDesc}>Works for ANY school in the WORLD. Enter your school name once.</Text>
          <TextInput style={styles.schoolInput} placeholder="e.g. Harvard, Oxford, Unizik..." value={tempSchool} onChangeText={setTempSchool} placeholderTextColor="#999" />
          <Text style={styles.examples}>🌍 Harvard, Oxford, MIT, Unizik, ABU, UniLag, Toronto...</Text>
          <TouchableOpacity style={styles.setupBtn} onPress={handleSetSchool}>
            <Text style={styles.setupBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Built by Vincent Okafi • Worldwide • Global Campus App 🌍</Text>
      </View>
    );
  }

  if (!role) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => setSchoolSet(false)} style={styles.schoolChip}>
          <Text style={styles.schoolChipText}>🏫 {school} • Change</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Prof</Text>
        <Text style={styles.subtitle}>Campus Connect</Text>
        <Text style={styles.desc}>{school} • Worldwide</Text>
        <View style={styles.cardBox}>
          <TouchableOpacity style={[styles.card, styles.lecturerCard]} onPress={() => setRole('lecturer')}>
            <Text style={styles.cardEmoji}>👨‍🏫</Text>
            <Text style={styles.cardTitle}>Lecturer</Text>
            <Text style={styles.cardDesc}>Create courses, post assignments for {school}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, styles.studentCard]} onPress={() => setRole('student')}>
            <Text style={styles.cardEmoji}>🎓</Text>
            <Text style={styles.cardTitle}>Student</Text>
            <Text style={styles.cardDesc}>Join courses at {school}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Worldwide • Any School • Any Department • Global 🌍</Text>
      </View>
    );
  }

  const displayCourses = isLecturer ? courses : myCourses;

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={styles.headerTitle}>{isLecturer ? 'Lecturer' : 'Student'} Dashboard</Text><Text style={styles.headerSub}>{school} 🌍 Worldwide</Text></View>
          <View style={{gap:6}}>
            <TouchableOpacity onPress={() => setRole(null)}><Text style={styles.logout}>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setSchoolSet(false)}><Text style={[styles.logout, {fontSize:10}]}>Change School</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>{displayCourses.length}</Text><Text style={styles.statLabel}>Courses</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '42' : myCourses.length}</Text><Text style={styles.statLabel}>{isLecturer ? 'Students' : 'Joined'}</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '5' : '3.8'}</Text><Text style={styles.statLabel}>{isLecturer ? 'Pending' : 'GPA'}</Text></View>
        </View>
        <Text style={styles.sectionTitle}>My Courses - {school}</Text>
        {displayCourses.map((c) => (
          <View key={c.id} style={styles.courseCard}>
            <Text style={styles.courseCode}>{c.code}</Text>
            <Text style={styles.courseTitle}>{c.title}</Text>
            <Text style={styles.courseMeta}>{isLecturer ? `${c.students} students` : school}</Text>
          </View>
        ))}
        {isLecturer ? (
          <>
            {showCreate ? (
              <View style={styles.createBox}>
                <TextInput style={styles.input} placeholder="Course Code" value={newCode} onChangeText={setNewCode} />
                <TextInput style={styles.input} placeholder="Course Title" value={newTitle} onChangeText={setNewTitle} />
                <TouchableOpacity style={styles.createBtn} onPress={handleCreateCourse}><Text style={styles.createBtnText}>Create for {school}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowCreate(false)}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
              </View>
            ) : (
              <>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowCreate(true)}><Text style={styles.primaryBtnText}>+ Create New Course</Text></TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => Alert.alert('Posted to', school)}><Text style={styles.secondaryBtnText}>Post Assignment</Text></TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, {marginTop:20}]}>Available at {school}</Text>
            {courses.filter(c => !myCourses.find(mc => mc.id === c.id)).map((c) => (
              <View key={c.id} style={styles.courseCard}>
                <Text style={styles.courseCode}>{c.code}</Text>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoinCourse(c)}><Text style={styles.joinText}>+ Join</Text></TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <Text style={styles.bottomFooter}>Prof • Universal Campus Connect • {school} • Worldwide 🌍</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logoBadge: { width: 60, height: 60, backgroundColor: '#1a2bff', borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: 'white', fontWeight: 'bold', fontSize: 28 },
  title: { fontSize: 55, fontWeight: '900', color: '#1a2bff', marginTop: 10 },
  subtitle: { fontSize: 20, fontWeight: '800' },
  desc: { fontSize: 12, color: '#555', marginTop: 5, marginBottom: 20, textAlign: 'center' },
  setupBox: { backgroundColor: 'white', width: '100%', padding: 20, borderRadius: 20, elevation: 5, marginTop: 10 },
  setupTitle: { fontWeight: 'bold', fontSize: 18 },
  setupDesc: { color: '#666', fontSize: 13, marginTop: 6 },
  schoolInput: { borderWidth: 2, borderColor: '#1a2bff', borderRadius: 12, padding: 14, marginTop: 15, fontSize: 16, backgroundColor: '#f8f9ff' },
  examples: { fontSize: 11, color: '#999', marginTop: 8 },
  setupBtn: { backgroundColor: '#1a2bff', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  setupBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 20, color: '#888', fontSize: 11, textAlign: 'center' },
  schoolChip: { backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  schoolChipText: { fontSize: 11, fontWeight: 'bold', color: '#1a2bff' },
  cardBox: { width: '100%', gap: 12, marginTop: 10 },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 18, borderWidth: 2, elevation: 3 },
  lecturerCard: { borderColor: '#1a2bff' },
  studentCard: { borderColor: '#059669' },
  cardEmoji: { fontSize: 28 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 6 },
  cardDesc: { color: '#666', fontSize: 12, marginTop: 4 },
  safe: { flex: 1, backgroundColor: '#f5f7ff', paddingTop: 40 },
  dashboardContent: { padding: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSub: { fontSize: 11, color: '#1a2bff', fontWeight: 'bold' },
  logout: { color: '#1a2bff', fontWeight: 'bold', fontSize: 12 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  stat: { flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '900', color: '#1a2bff' },
  statLabel: { fontSize: 11, color: '#777', marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 8 },
  courseCard: { backgroundColor: 'white', padding: 12, borderRadius: 12, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: '#1a2bff' },
  courseCode: { fontWeight: '900', color: '#1a2bff', fontSize: 11 },
  courseTitle: { fontWeight: 'bold', fontSize: 13, marginTop: 3 },
  courseMeta: { color: '#888', fontSize: 11, marginTop: 3 },
  primaryBtn: { backgroundColor: '#1a2bff', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: 'white', fontWeight: 'bold' },
  secondaryBtn: { backgroundColor: 'white', padding: 13, borderRadius: 12, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#ddd' },
  secondaryBtnText: { fontWeight: 'bold', fontSize: 13 },
  createBox: { backgroundColor: 'white', padding: 14, borderRadius: 14, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 11, marginBottom: 8 },
  createBtn: { backgroundColor: '#1a2bff', padding: 12, borderRadius: 10, alignItems: 'center' },
  createBtnText: { color: 'white', fontWeight: 'bold' },
  cancel: { textAlign: 'center', marginTop: 10, color: '#888' },
  joinBtn: { marginTop: 8, backgroundColor: '#eef0ff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
  joinText: { color: '#1a2bff', fontWeight: 'bold', fontSize: 11 },
  bottomFooter: { textAlign: 'center', marginTop: 25, color: '#aaa', fontSize: 10 }
});
