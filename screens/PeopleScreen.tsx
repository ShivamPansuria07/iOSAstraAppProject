import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PeopleScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
        <Text style={styles.title}>People in your life</Text>
        <Text style={styles.subtitle}>People will be added automatically as you talk about them in chat</Text>

        {/* New Person Card */}
        <View style={styles.newPersonCardWrap}>
          <TouchableOpacity style={styles.newPersonCard} activeOpacity={0.85}>
            <View style={styles.plusBox}>
              <Text style={styles.plus}>+</Text>
            </View>
            <View style={styles.verticalDivider} />
            <Text style={styles.newPersonText}>New Person</Text>
          </TouchableOpacity>
        </View>

        {/* You Card */}
        <LinearGradient
          colors={["#c471f5", "#fa71cd"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.youCardGradient}
        >
          <View style={styles.youCard}>
            <View style={styles.youIconWrap}>
              <Text style={styles.youIcon}>🪞</Text>
            </View>
            <View style={styles.youInfo}>
              <Text style={styles.youName}>You</Text>
              <Text style={styles.youSign}>⚙ Aquarius</Text>
          </View>
          </View>
        </LinearGradient>

        {/* Sign Out & Delete Account Buttons */}
        <View style={styles.actionsWrap}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { borderColor: '#ff4d4d' }] }>
            <Text style={[styles.actionText, { color: '#ff4d4d' }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
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
  newPersonCardWrap: {
    marginBottom: 22,
    alignItems: 'center',
  },
  newPersonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
    width: width - 36,
    height: 64,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  plusBox: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -2,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  newPersonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 24,
  },
  youCardGradient: {
    borderRadius: 18,
    marginBottom: 22,
    width: width - 36,
    alignSelf: 'center',
  },
  youCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.65)',
    overflow: 'hidden',
  },
  youIconWrap: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  youIcon: {
    fontSize: 32,
  },
  youInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 18,
  },
  youName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  youSign: {
    color: '#b0b0b0',
    fontSize: 16,
    fontWeight: '500',
  },
  actionsWrap: {
    marginTop: 32,
    alignItems: 'center',
  },
  actionBtn: {
    width: width - 36,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 