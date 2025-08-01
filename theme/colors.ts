export const colors = {
  // Primary colors - Vita's signature purple and gold theme
  primary: '#8B5CF6', // Vibrant purple
  primaryDark: '#7C3AED',
  primaryLight: '#A78BFA',
  
  // Background colors - Deep cosmic theme
  background: '#1a1a2e', // Deep cosmic blue
  surface: '#16213e', // Darker cosmic blue
  card: '#0f3460', // Deep ocean blue
  
  // Text colors
  text: '#FFFFFF', // Pure white
  textSecondary: '#E2E8F0',
  textMuted: '#94A3B8',
  
  // Accent colors - Gold and rose
  accent: '#F59E0B', // Gold
  accentLight: '#FBBF24',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Gradient colors - Vita's signature gradients
  gradientStart: '#8B5CF6',
  gradientEnd: '#F59E0B',
  
  // Border colors
  border: '#374151',
  borderLight: '#4B5563',
  
  // Overlay colors
  overlay: 'rgba(26, 26, 46, 0.5)',
  overlayDark: 'rgba(26, 26, 46, 0.8)',
};

export const gradients = {
  primary: [colors.gradientStart, colors.gradientEnd],
  surface: [colors.surface, colors.card],
  accent: [colors.accent, colors.accentLight],
}; 