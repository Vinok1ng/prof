import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [role, setRole] = useState(null);
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

  const handleCreateCourse = () => {
    if (!newCode || !newTitle) {
      Alert.alert('Error', 'Please enter course code and title');
      return;
    }
    const newCourse = {
      id: Date.now().toString(),
      code: newCode,
      title: newTitle,
      students: 0,
      assignments: 0,
    };
    setCourses([...courses, newCourse]);
    setNewCode('');
    setNewTitle('');
    setShowCreate(false);
    Alert.alert('Success', `Course ${newCode} created!`);
  };

  const handlePostAssignment = () => {
    Alert.alert('Post Assignment', 'Assignment posted to all students in your courses! (Feature ready for backend)');
  };

  const handleJoinCourse = (course) => {
    if (myCourses.find(c => c.id === course.id)) {
      Alert.alert('Already joined', 'You already joined this course');
      return;
    }
    setMyCourses([...myCourses, { ...course, lecturer: 'Dr. Vincent Okafi' }]);
    Alert.alert('Joined!', `You joined ${course.code}`);
  };

  // HOME SCREEN
  if (!role) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#f8f9ff" />
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
            <Text style={styles.cardEmoji}>🎓</Text>
            <Text style={styles.cardTitle}>I am a Student</Text>
            <Text style={styles.cardDesc}>Join courses, view tasks, submit work</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Built by Vincent Okafi</Text>
      </View>
    );
  }

  // DASHBOARD
  const displayCourses = isLecturer ? courses : myCourses;

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{isLecturer ? 'Lecturer Dashboard' : 'Student Dashboard'}</Text>
          <TouchableOpacity onPress={() => setRole(null)}><Text style={styles.logout}>Switch Role</Text></TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? courses.length : myCourses.length}</Text><Text style={styles.statLabel}>Courses</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '42' : '3'}</Text><Text style={styles.statLabel}>{isLecturer ? 'Students' : 'Pending'}</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>{isLecturer ? '5' : '4.2'}</Text><Text style={styles.statLabel}>{isLecturer ? 'Pending' : 'GPA'}</Text></View>
        </View>

        <Text style={styles.sectionTitle}>{isLecturer ? 'My Courses' : 'My Enrolled Courses'}</Text>

        {displayCourses.map((c) => (
          <View key={c.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{c.code} - {c.title}</Text>
            <Text style={styles.courseMeta}>{isLecturer ? `${c.students} students • ${c.assignments} assignments` : `Lecturer: ${c.lecturer || 'Dr. Okafi'}`}</Text>
            {!isLecturer && (
              <TouchableOpacity style={styles.joinBtn} onPress={() => Alert.alert('Course', `${c.code}: View assignments`)}>
                <Text style={styles.joinText}>View</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {isLecturer ? (
          <>
            {showCreate && (
              <View style={styles.createBox}>
                <Text style={styles.createTitle}>Create New Course</Text>
                <TextInput style={styles.input} placeholder="Course Code e.g. CSC 401" value={newCode} onChangeText={setNewCode} />
                <TextInput style={styles.input} placeholder="Course Title e.g. AI" value={newTitle} onChangeText={setNewTitle} />
                <TouchableOpacity style={styles.createBtn} onPress={handleCreateCourse}><Text style={styles.createBtnText}>Create Course</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowCreate(false)}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
              </View>
            )}

            {!showCreate && (
              <>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowCreate(true)}><Text style={styles.primaryBtnText}>+ Create New Course</Text></TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handlePostAssignment}><Text style={styles.secondaryBtnText}>Post Assignment</Text></TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Available Courses</Text>
            {courses.filter(c => !myCourses.find(mc => mc.id === c.id)).map((c) => (
              <View key={c.id} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{c.code} - {c.title}</Text>
                <Text style={styles.courseMeta}>{c.students} students</Text>
                <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoinCourse(c)}><Text style={styles.joinText}>+ Join</Text></TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9ff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 55, fontWeight: 'bold', color: '#1a2bff', marginTop: 40 },
  subtitle: { fontSize: 26, fontWeight: 'bold', color: '#111' },
  desc: { fontSize: 14, color: 'gray', marginTop: 5, marginBottom: 30 },
  cardBox: { width: '100%', gap: 15 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 18, borderWidth: 2, elevation: 3 },
  lecturerCard: { borderColor: '#1a2bff' },
  studentCard: { borderColor: '#00a652' },
  cardEmoji: { fontSize: 32 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  cardDesc: { color: 'gray', marginTop: 4 },
  footer: { marginTop: 40, color: 'gray' },
  safe: { flex: 1, backgroundColor: '#f8f9ff', paddingTop: 50 },
  dashboardContent: { padding: 18, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  logout: { color: '#1a2bff', fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  stat: { flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 15, alignItems: 'center', elevation: 2 },
  statNum: { fontSize: 22, fontWeight: 'bold', color: '#1a2bff' },
  statLabel: { color: 'gray', fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
  courseCard: { backgroundColor: 'white', padding: 15, borderRadius: 14, marginBottom: 10, elevation: 1 },
  courseTitle: { fontWeight: 'bold', fontSize: 15 },
  courseMeta: { color: 'gray', fontSize: 12, marginTop: 4 },
  primaryBtn: { backgroundColor: '#1a2bff', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20 },
  primaryBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { backgroundColor: 'white', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#ddd' },
  secondaryBtnText: { fontWeight: 'bold' },
  createBox: { backgroundColor: 'white', padding: 15, borderRadius: 14, marginTop: 15 },
  createTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
  createBtn: { backgroundColor: '#1a2bff', padding: 12, borderRadius: 10, alignItems: 'center' },
  createBtnText: { color: 'white', fontWeight: 'bold' },
  cancel: { textAlign: 'center', marginTop: 10, color: 'gray' },
  joinBtn: { marginTop: 10, backgroundColor: '#eef0ff', padding: 8, borderRadius: 8, alignSelf: 'flex-start' },
  joinText: { color: '#1a2bff', fontWeight: 'bold' }
});
