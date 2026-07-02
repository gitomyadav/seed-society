import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [classes, setClasses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // ── Fetch all data from Supabase ──
  const fetchAll = useCallback(async () => {
    setDataLoading(true);
    const [
      classesRes,
      materialsRes,
      studentsRes,
      teachersRes,
      coursesRes,
      noticesRes,
    ] = await Promise.all([
      supabase.from('classes').select('*').order('created_at', { ascending: false }),
      supabase.from('materials').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }),
      supabase.from('teachers').select('*').order('created_at', { ascending: false }),
      supabase.from('courses').select('*').order('created_at', { ascending: false }),
      supabase.from('notices').select('*').order('created_at', { ascending: false }),
    ]);

    if (classesRes.data) setClasses(classesRes.data);
    if (materialsRes.data) setMaterials(materialsRes.data);
    if (studentsRes.data) setStudents(studentsRes.data);
    if (teachersRes.data) setTeachers(teachersRes.data);
    if (coursesRes.data) setCourses(coursesRes.data);
    if (noticesRes.data) setNotices(noticesRes.data);

    setDataLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── CLASS actions ──
  const addClass = async (newClass) => {
    const { data, error } = await supabase.from('classes').insert({
      subject: newClass.subject,
      topic: newClass.topic,
      teacher: newClass.teacher,
      date: newClass.date,
      time: newClass.time,
      meeting_id: newClass.meetingId || newClass.meeting_id,
      password: newClass.password,
      join_url: newClass.joinUrl || newClass.join_url,
      status: newClass.status || 'scheduled',
    }).select().single();
    if (data && !error) {
      setClasses(prev => [data, ...prev]);
    }
    return data;
  };

  const updateClass = async (id, fields) => {
    const updates = {};
    if (fields.status !== undefined) updates.status = fields.status;
    if (fields.topic !== undefined) updates.topic = fields.topic;
    if (fields.teacher !== undefined) updates.teacher = fields.teacher;
    if (fields.meeting_id !== undefined) updates.meeting_id = fields.meeting_id;
    if (fields.password !== undefined) updates.password = fields.password;
    if (fields.join_url !== undefined) updates.join_url = fields.join_url;

    const { error } = await supabase.from('classes').update(updates).eq('id', id);
    if (!error) {
      setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    }
  };

  const deleteClass = async (id) => {
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (!error) {
      setClasses(prev => prev.filter(c => c.id !== id));
    }
  };

  // ── MATERIAL actions ──
  const addMaterial = async (newMat) => {
    const { data, error } = await supabase.from('materials').insert({
      title: newMat.title,
      subject: newMat.subject,
      type: newMat.type || 'Notes',
      grade: parseInt(newMat.grade) || 12,
      chapters: newMat.chapters?.toString() || '1',
      file_size: newMat.fileSize || newMat.file_size || newMat.size || 'Google Drive',
      format: newMat.format || 'Drive Link',
      downloads: 0,
      file_url: newMat.drive_url || newMat.file_url || newMat.url || null,
      drive_url: newMat.drive_url || newMat.file_url || newMat.url || null,
    }).select().single();
    if (data && !error) {
      setMaterials(prev => [data, ...prev]);
    }
    return data;
  };

  const deleteMaterial = async (id) => {
    const { error } = await supabase.from('materials').delete().eq('id', id);
    if (!error) {
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  // ── STUDENT actions ──
  const deleteStudent = async (id) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const toggleStudentStatus = async (id, newStatus) => {
    const student = students.find(s => s.id === id);
    const status = newStatus || (student?.status === 'active' ? 'suspended' : 'active');
    const { error } = await supabase.from('profiles').update({ status }).eq('id', id);
    if (!error) {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    }
  };

  const approveStudent = async (id) => {
    return toggleStudentStatus(id, 'active');
  };

  // ── TEACHER actions ──
  const addTeacher = async (newTch) => {
    const avatar = newTch.name
      ? newTch.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'TC';
    const { data, error } = await supabase.from('teachers').insert({
      name: newTch.name,
      email: newTch.email,
      subject: newTch.subject,
      assigned_subjects: newTch.assignedSubjects || [newTch.subject],
      qualification: newTch.qualification,
      bio: newTch.bio,
      avatar,
    }).select().single();
    if (data && !error) {
      setTeachers(prev => [data, ...prev]);
    }
    return data;
  };

  const deleteTeacher = async (id) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (!error) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
  };

  const assignSubjectToTeacher = async (id, subjectToAdd) => {
    const teacher = teachers.find(t => t.id === id);
    if (!teacher || teacher.assigned_subjects?.includes(subjectToAdd)) return;
    const updated = [...(teacher.assigned_subjects || []), subjectToAdd];
    const { error } = await supabase.from('teachers').update({
      assigned_subjects: updated,
    }).eq('id', id);
    if (!error) {
      setTeachers(prev => prev.map(t =>
        t.id === id ? { ...t, assigned_subjects: updated } : t
      ));
    }
  };

  // ── COURSE actions ──
  const addCourse = async (newCourse) => {
    const { data, error } = await supabase.from('courses').insert({
      title: newCourse.title,
      subject: newCourse.subject,
      grade: parseInt(newCourse.grade) || 12,
      stream: newCourse.stream || 'Science',
      teacher_name: newCourse.teacher_name || newCourse.teacher,
      lessons_count: parseInt(newCourse.lessonsCount || newCourse.lessons_count) || 0,
      enrolled_count: 0,
      description: newCourse.description,
    }).select().single();
    if (data && !error) {
      setCourses(prev => [data, ...prev]);
    }
    return data;
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // ── NOTICE actions ──
  const addNotice = async (newNotice) => {
    const { data, error } = await supabase.from('notices').insert({
      title: newNotice.title,
      category: newNotice.category || 'General',
      priority: newNotice.priority || 'General',
      content: newNotice.content,
    }).select().single();
    if (data && !error) {
      setNotices(prev => [data, ...prev]);
    }
    return data;
  };

  const deleteNotice = async (id) => {
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (!error) {
      setNotices(prev => prev.filter(n => n.id !== id));
    }
  };

  // ── ENROLLMENT actions ──
  const enrollInCourse = async (studentId, courseId) => {
    const { error } = await supabase.from('enrollments').insert({
      student_id: studentId,
      course_id: courseId,
    });
    if (!error) {
      // Increment enrolled_count
      const course = courses.find(c => c.id === courseId);
      if (course) {
        await supabase.from('courses').update({
          enrolled_count: (course.enrolled_count || 0) + 1,
        }).eq('id', courseId);
        setCourses(prev => prev.map(c =>
          c.id === courseId ? { ...c, enrolled_count: (c.enrolled_count || 0) + 1 } : c
        ));
      }
    }
    return { success: !error };
  };

  const unenrollFromCourse = async (studentId, courseId) => {
    const { error } = await supabase.from('enrollments').delete().eq('student_id', studentId).eq('course_id', courseId);
    if (!error) {
      const course = courses.find(c => c.id === courseId);
      if (course && course.enrolled_count > 0) {
        await supabase.from('courses').update({
          enrolled_count: course.enrolled_count - 1,
        }).eq('id', courseId);
        setCourses(prev => prev.map(c =>
          c.id === courseId ? { ...c, enrolled_count: Math.max(0, (c.enrolled_count || 1) - 1) } : c
        ));
      }
    }
    return { success: !error };
  };

  const getStudentEnrollments = async (studentId) => {
    const { data } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('student_id', studentId);
    return data?.map(e => e.course_id) || [];
  };

  const updateStudent = async (studentId, updates) => {
    const { error } = await supabase.from('profiles').update(updates).eq('id', studentId);
    if (!error) {
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...updates } : s));
    }
    return { success: !error };
  };

  return (
    <DataContext.Provider
      value={{
        classes, addClass, updateClass, deleteClass,
        materials, addMaterial, deleteMaterial,
        students, deleteStudent, toggleStudentStatus, approveStudent, updateStudent,
        teachers, addTeacher, deleteTeacher, assignSubjectToTeacher,
        courses, addCourse, deleteCourse,
        notices, addNotice, deleteNotice,
        enrollInCourse, unenrollFromCourse, getStudentEnrollments,
        dataLoading, refreshData: fetchAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
