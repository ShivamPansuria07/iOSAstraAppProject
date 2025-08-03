export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Paywall: undefined;
  AuthOnboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  MainTabs: undefined;
  Chat: { feature?: string };
  Settings: undefined;
  History: undefined;
  RatingModal: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chat: undefined;
  People: undefined;
  Profile: undefined;
  Settings: undefined;
  History: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatScreen: { conversationId?: string };
  NewChat: undefined;
}; 