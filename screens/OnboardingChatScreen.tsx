import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';
import ChatMessage from '../components/ChatMessage';
import { ChatMessage as ChatMessageType } from '../services/openai';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import DateTimePicker from '@react-native-community/datetimepicker';

type OnboardingChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OnboardingChat'>;

interface OnboardingStep {
  id: string;
  message: string;
  type: 'question' | 'response' | 'info';
  inputType?: 'text' | 'date' | 'time' | 'city' | 'confirm';
  placeholder?: string;
  options?: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    message: "Welcome to Astra! Let's get you set up. To start, what's your first name?",
    type: 'question',
    inputType: 'text',
    placeholder: 'Enter your first name'
  },
  {
    id: 'name_response',
    message: "shivam, what a lovely name!",
    type: 'response'
  },
  {
    id: 'birthday_question',
    message: "Now, when's your birthday?",
    type: 'question',
    inputType: 'date'
  },
  {
    id: 'birthday_response',
    message: "Ah, a Pisces - brilliant!",
    type: 'response'
  },
  {
    id: 'birth_time_question',
    message: "Now, do you know the exact time you were born?",
    type: 'question',
    inputType: 'time'
  },
  {
    id: 'birth_time_response',
    message: "Perfect! That helps with your astrological chart.",
    type: 'response'
  },
  {
    id: 'birth_city_question',
    message: "Last question! Do you know what city you were born in?",
    type: 'question',
    inputType: 'city',
    placeholder: 'Enter your birth city'
  },
  {
    id: 'completion',
    message: "Great, that's all the information I need!",
    type: 'response'
  },
  {
    id: 'archiving',
    message: "Archiving this chat...",
    type: 'info'
  }
];

export default function OnboardingChatScreen() {
  const navigation = useNavigation<OnboardingChatScreenNavigationProp>();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [userData, setUserData] = useState({
    name: '',
    birthday: '',
    birthTime: '',
    birthCity: ''
  });
  
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start with welcome message
    addMessage('assistant', onboardingSteps[0].message);
  }, []);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessageType = {
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleInput = (text: string) => {
    setUserInput(text);
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const currentStepData = onboardingSteps[currentStep];
    addMessage('user', userInput);

    // Store user data based on current step
    switch (currentStepData.id) {
      case 'welcome':
        setUserData(prev => ({ ...prev, name: userInput }));
        break;
      case 'birth_city_question':
        setUserData(prev => ({ ...prev, birthCity: userInput }));
        break;
    }

    setUserInput('');
    proceedToNextStep();
  };

  const handleDateConfirm = () => {
    const formattedDate = selectedDate.toDateString();
    setUserData(prev => ({ ...prev, birthday: formattedDate }));
    addMessage('user', formattedDate);
    setShowDatePicker(false);
    proceedToNextStep();
  };

  const handleTimeConfirm = () => {
    const formattedTime = selectedTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    setUserData(prev => ({ ...prev, birthTime: formattedTime }));
    addMessage('user', formattedTime);
    setShowTimePicker(false);
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    const nextStepIndex = currentStep + 1;
    
    if (nextStepIndex < onboardingSteps.length) {
      setCurrentStep(nextStepIndex);
      const nextStep = onboardingSteps[nextStepIndex];
      
      // Add AI response
      if (nextStep.type === 'response' || nextStep.type === 'info') {
        addMessage('assistant', nextStep.message);
        
        // If this is the last step, navigate after a delay
        if (nextStep.id === 'archiving') {
          setTimeout(() => {
            navigation.navigate('Home' as never);
          }, 2000);
        } else {
          // Continue to next question
          setTimeout(() => {
            const nextQuestionIndex = nextStepIndex + 1;
            if (nextQuestionIndex < onboardingSteps.length) {
              setCurrentStep(nextQuestionIndex);
              addMessage('assistant', onboardingSteps[nextQuestionIndex].message);
            }
          }, 1000);
        }
      }
    }
  };

  const renderInputSection = () => {
    const currentStepData = onboardingSteps[currentStep];
    
    if (currentStepData.type !== 'question') return null;

    switch (currentStepData.inputType) {
      case 'text':
      case 'city':
        return (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={userInput}
              onChangeText={handleInput}
              placeholder={currentStepData.placeholder}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity 
              style={[styles.sendButton, !userInput.trim() && styles.sendButtonDisabled]} 
              onPress={handleSend}
              disabled={!userInput.trim()}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );

      case 'date':
        return (
          <View style={styles.datePickerContainer}>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerButtonText}>Select Birthday</Text>
              <Ionicons name="calendar" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );

      case 'time':
        return (
          <View style={styles.datePickerContainer}>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.datePickerButtonText}>Select Birth Time</Text>
              <Ionicons name="time" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#1a1a1a', '#2d1b69']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Get set up</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </ScrollView>

        {/* Input Section */}
        {renderInputSection()}

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={(event, date) => date && setSelectedDate(date)}
                style={styles.picker}
              />
              <View style={styles.pickerButtons}>
                <TouchableOpacity 
                  style={styles.pickerButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.pickerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerButton, styles.pickerButtonConfirm]}
                  onPress={handleDateConfirm}
                >
                  <Text style={styles.pickerButtonText}>Confirm Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {showTimePicker && (
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={(event, time) => time && setSelectedTime(time)}
                style={styles.picker}
              />
              <View style={styles.pickerButtons}>
                <TouchableOpacity 
                  style={styles.pickerButton}
                  onPress={() => setShowTimePicker(false)}
                >
                  <Text style={styles.pickerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pickerButton, styles.pickerButtonConfirm]}
                  onPress={handleTimeConfirm}
                >
                  <Text style={styles.pickerButtonText}>Confirm Time</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  datePickerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  datePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  pickerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  picker: {
    backgroundColor: 'transparent',
  },
  pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pickerButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pickerButtonConfirm: {
    backgroundColor: '#8B5CF6',
  },
  pickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 