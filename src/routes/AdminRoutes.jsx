import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../admin/AdminLayout';
import Dashboard from '../admin/Dashboard';
import Login from '../admin/Login';

// Placeholders for components we'll build next
import SettingsAdmin from '../admin/SettingsAdmin';
import ServicesAdmin from '../admin/ServicesAdmin';
import TestimonialsAdmin from '../admin/TestimonialsAdmin';
import GalleryAdmin from '../admin/GalleryAdmin';
import LeadsAdmin from '../admin/LeadsAdmin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      
      {/* Protected Routes wrapped in Layout */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<LeadsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        {/* Default redirect to dashboard */}
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
