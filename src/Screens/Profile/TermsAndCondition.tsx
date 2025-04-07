import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import BackButton from '../../Components/BackButton/BackButton';

const TermsAndCondition = () => {
  return (
    <View style={styles.wrapper}>
      <BackButton title='Terms & Condition' />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}  showsVerticalScrollIndicator={false} >
        <Text style={styles.title}>Terms and Conditions - InstaScan</Text>
        <Text style={styles.date}>Effective Date: 6/04/2025</Text>

        <Text style={styles.sectionTitle}>1. Use of InstaScan</Text>
        <Text style={styles.paragraph}>
          InstaScan is a utility app that helps users scan and organize documents using image processing and OCR (text extraction) technology. You agree to use the app only for lawful purposes.
        </Text>

        <Text style={styles.sectionTitle}>2. Privacy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. We do not store or share your scanned documents without your permission. By using the app, you agree to the terms of our privacy policy.
        </Text>

        <Text style={styles.sectionTitle}>3. Accounts and Security</Text>
        <Text style={styles.paragraph}>
          If the app requires account creation, you are responsible for maintaining the confidentiality of your account and password. You agree to take full responsibility for any activity under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. User Content</Text>
        <Text style={styles.paragraph}>
          You retain ownership of any content you scan using InstaScan. We do not claim any rights over your data.
        </Text>

        <Text style={styles.sectionTitle}>5. Prohibited Use</Text>
        <Text style={styles.paragraph}>
          You agree not to:
          {'\n'}- Use the app for illegal or harmful purposes
          {'\n'}- Upload any content that violates laws or third-party rights
          {'\n'}- Attempt to hack or disrupt the app’s functionality
        </Text>

        <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All rights to the app’s design, code, and branding are owned by the developers of InstaScan. You may not copy, reuse, or distribute any part of the app without permission.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to the App</Text>
        <Text style={styles.paragraph}>
          We may update or remove features at any time. We are not responsible if the app becomes unavailable temporarily or permanently.
        </Text>

        <Text style={styles.sectionTitle}>8. Termination</Text>
        <Text style={styles.paragraph}>
          We reserve the right to suspend or terminate access if you violate these terms.
        </Text>

        <Text style={styles.sectionTitle}>9. Disclaimer</Text>
        <Text style={styles.paragraph}>
          InstaScan is provided “as is” without warranties of any kind. We are not liable for any loss or damage caused by using the app.
        </Text>

        <Text style={styles.sectionTitle}>10. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms are governed by the laws of India. Any disputes will be resolved in the appropriate courts of that region.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact</Text>
        <Text style={styles.paragraph}>
          If you have any questions, please contact us at rohitsharma2k3@gmail.com.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // IMPORTANT: allows the ScrollView to take full height
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});

export default TermsAndCondition;
