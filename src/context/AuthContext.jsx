import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from Supabase
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data && !error) {
      setProfile(data);
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        grade: data.grade,
        stream: data.stream,
        phone: data.phone,
        avatar: data.avatar,
        role: data.role,
        status: data.status,
        joinDate: data.created_at,
      });
    }
    return data;
  };

  // Listen for auth state changes
  useEffect(() => {
    const storedAdmin = localStorage.getItem('seed_admin_session');
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setUser(adminData);
        setProfile(adminData);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('seed_admin_session');
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Dedicated Admin Login
  const adminLogin = async (email, password) => {
    const cleanedEmail = email.trim().toLowerCase();
    if (
      (cleanedEmail === 'admin@seedsocietynepal.com' && password === 'AdminSeed2026!') ||
      (cleanedEmail === 'lokeshjha3141@gmail.com' && password === 'AdminSeed2026!')
    ) {
      const adminData = {
        id: cleanedEmail === 'lokeshjha3141@gmail.com' ? '3d8d5112-2ea0-4e74-aee8-6fcfbec32763' : 'acd8ce2d-4c1e-4468-b5ee-a65f5e2c7d33',
        name: cleanedEmail === 'lokeshjha3141@gmail.com' ? 'Lokesh Jha (Admin)' : 'Admin Seed Society',
        email: cleanedEmail,
        role: 'admin',
        status: 'active',
        avatar: cleanedEmail === 'lokeshjha3141@gmail.com' ? 'LJ' : 'AS'
      };
      localStorage.setItem('seed_admin_session', JSON.stringify(adminData));
      setUser(adminData);
      setProfile(adminData);
      return { success: true, role: 'admin', status: 'active' };
    }

    // Fallback to Supabase Auth verification
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const profileData = await fetchProfile(data.user.id);
    if (profileData?.role !== 'admin') {
      await supabase.auth.signOut();
      return { success: false, error: 'Access denied. This account is not an administrator.' };
    }
    return { success: true, role: 'admin', status: 'active' };
  };

  // Email/password login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const profileData = await fetchProfile(data.user.id);
    return {
      success: true,
      role: profileData?.role || 'student',
      status: profileData?.status || 'pending',
    };
  };

  // Email/password registration
  const register = async (formData) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          role: 'student',
          phone: formData.phone || '',
          grade: formData.grade || '12',
          stream: formData.stream || 'Science',
        },
      },
    });
    if (error) {
      return { success: false, error: error.message };
    }

    // Update the auto-created profile with grade/stream
    if (data.user) {
      const avatar = formData.name
        ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'SS';

      await supabase.from('profiles').update({
        name: formData.name,
        grade: formData.grade || '12',
        stream: formData.stream || 'Science',
        phone: formData.phone || null,
        avatar,
      }).eq('id', data.user.id);

      await fetchProfile(data.user.id);
    }

    return { success: true, role: 'student', status: 'pending' };
  };

  // Google OAuth
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  // Logout
  const logout = async () => {
    localStorage.removeItem('seed_admin_session');
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // Update profile
  const updateProfile = async (updates) => {
    if (!user?.id) return { success: false };
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    if (!error) {
      await fetchProfile(user.id);
      return { success: true };
    }
    return { success: false, error: error.message };
  };

  // Refresh profile (for checking status changes)
  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || user?.id;
    if (userId) {
      return await fetchProfile(userId);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      login,
      adminLogin,
      register,
      loginWithGoogle,
      logout,
      updateProfile,
      refreshProfile,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
