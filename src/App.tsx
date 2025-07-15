import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Meetups from './pages/Meetups';
import MeetupDetails from './pages/MeetupDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import ModuleView from './pages/ModuleView';
import MyLearning from './pages/MyLearning';
import CourseApplication from './pages/CourseApplication';
import AdminDashboard from './pages/admin/AdminDashboard';
import ModuleEditor from './pages/admin/ModuleEditor';
import CourseDetailsAdmin from './pages/admin/crm/CourseDetails';
import UpdatePassword from './pages/UpdatePassword';
import ApplicationDetails from './pages/admin/ApplicationDetails';
import BuyTokens from './pages/BuyTokens';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="pt-16 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/buy-tokens" element={
                <ProtectedRoute>
                  <BuyTokens />
                </ProtectedRoute>
              } />
              <Route path="/my-learning" element={
                <ProtectedRoute>
                  <MyLearning />
                </ProtectedRoute>
              } />
              <Route path="/meetups" element={<Meetups />} />
              <Route path="/meetups/:id" element={<MeetupDetails />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/courses/:courseId/apply" element={
                <ProtectedRoute>
                  <CourseApplication />
                </ProtectedRoute>
              } />
              <Route path="/courses/:courseId/modules/:moduleId" element={
                <ProtectedRoute>
                  <ModuleView />
                </ProtectedRoute>
              } />
              <Route path="/admin/*" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:courseId/modules/new" element={
                <ProtectedRoute adminOnly>
                  <ModuleEditor />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:courseId/modules/:moduleId" element={
                <ProtectedRoute adminOnly>
                  <ModuleEditor />
                </ProtectedRoute>
              } />
              <Route path="/admin/applications/:id" element={
                <ProtectedRoute adminOnly>
                  <ApplicationDetails />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:id/details" element={
                <ProtectedRoute adminOnly>
                  <CourseDetailsAdmin />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
