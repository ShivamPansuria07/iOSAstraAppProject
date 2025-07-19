export const colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  
  // Background colors
  background: '#0F0F23', // Dark blue-black
  surface: '#1A1A2E', // Slightly lighter dark
  card: '#16213E', // Card background
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  
  // Accent colors
  accent: '#F59E0B', // Amber
  accentLight: '#FBBF24',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Gradient colors
  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
  
  // Border colors
  border: '#27272A',
  borderLight: '#3F3F46',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
};

export const gradients = {
  primary: [colors.gradientStart, colors.gradientEnd],
  surface: [colors.surface, colors.card],
  accent: [colors.accent, colors.accentLight],
}; 