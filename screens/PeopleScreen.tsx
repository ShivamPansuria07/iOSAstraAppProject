import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PeopleScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>People in your life</Text>
        <Text style={styles.subtitle}>People will be added automatically as you talk about them in chat</Text>

        <TouchableOpacity style={styles.newPersonCard} activeOpacity={0.85}>
          <View style={styles.plusContainer}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.newPersonText}>New Person</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#e96443", "#904e95"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.youCardGradient}
        >
          <View style={styles.youCard}>
            <View style={styles.youEmojiContainer}>
              <Text style={styles.youEmoji}>🪞</Text>
            </View>
            <View>
              <Text style={styles.youName}>You</Text>
              <Text style={styles.youSign}>⚙ Aquarius</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 18,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 28,
  },
  newPersonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  plusContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  plus: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -2,
  },
  newPersonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  youCardGradient: {
    borderRadius: 18,
    marginBottom: 12,
  },
  youCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  youEmojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  youEmoji: {
    fontSize: 22,
  },
  youName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  youSign: {
    color: 'white',
    fontSize: 15,
    marginTop: 2,
    opacity: 0.8,
  },
}); 