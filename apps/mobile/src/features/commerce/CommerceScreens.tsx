import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Check,
  ChevronRight,
  LockKeyhole,
  ShieldCheck,
  Tag,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookCover,
  Chip,
  Page,
  PrimaryButton,
  SecondaryButton,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

export function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const [payment, setPayment] = useState('Chapa');
  const [promoApplied, setPromoApplied] = useState(false);
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 28 }}>
      <BackHeader title="Checkout" />
      <AppText variant="title" weight="700" style={{ letterSpacing: -0.6 }}>
        One more step
      </AppText>
      <AppText color={colors.body} style={{ marginTop: 4, marginBottom: 20 }}>
        Your library will update once payment is verified.
      </AppText>
      <View style={styles.orderRow}>
        <BookCover
          title="Riyad as-Salihin"
          author="Imam al-Nawawi"
          index={1}
          width={65}
          height={96}
        />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <AppText weight="700">Riyad as-Salihin</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Ebook · Amharic edition
          </AppText>
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginTop: 7 }}
          >
            Personal reading license
          </AppText>
        </View>
        <AppText weight="700">180 ETB</AppText>
      </View>
      <TouchableOpacity
        onPress={() => setPromoApplied(!promoApplied)}
        style={styles.promoRow}
      >
        <View style={styles.promoIcon}>
          <Tag size={17} color={colors.blueDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText weight="600">
            {promoApplied
              ? 'NEJASHI15 applied'
              : 'Add a promo or referral code'}
          </AppText>
          <AppText
            variant="caption"
            color={promoApplied ? colors.mintInk : colors.body}
            style={{ marginTop: 2 }}
          >
            {promoApplied
              ? 'You saved 27 ETB'
              : 'Have a creator code? Enter it here.'}
          </AppText>
        </View>
        {promoApplied ? (
          <Check size={18} color={colors.mintInk} />
        ) : (
          <ChevronRight size={17} color={colors.muted} />
        )}
      </TouchableOpacity>
      <AppText
        variant="subheading"
        weight="700"
        style={{ marginTop: 25, marginBottom: 11 }}
      >
        Payment method
      </AppText>
      <TouchableOpacity
        onPress={() => setPayment('Chapa')}
        style={[
          styles.paymentRow,
          payment === 'Chapa' && styles.paymentSelected,
        ]}
      >
        <View style={styles.chapaMark}>
          <AppText variant="caption" weight="700" color={colors.blueDeep}>
            C
          </AppText>
        </View>
        <View style={{ flex: 1 }}>
          <AppText weight="700">Pay with Chapa</AppText>
          <AppText variant="caption" color={colors.body}>
            Telebirr, cards and local options
          </AppText>
        </View>
        <View style={styles.radio}>
          {payment === 'Chapa' ? <View style={styles.radioDot} /> : null}
        </View>
      </TouchableOpacity>
      <View style={styles.totalBox}>
        <View style={styles.totalLine}>
          <AppText color={colors.body}>Subtotal</AppText>
          <AppText>180 ETB</AppText>
        </View>
        {promoApplied ? (
          <View style={styles.totalLine}>
            <AppText color={colors.body}>Referral discount</AppText>
            <AppText color={colors.mintInk}>−27 ETB</AppText>
          </View>
        ) : null}
        <View style={[styles.totalLine, styles.totalFinal]}>
          <AppText weight="700">Total</AppText>
          <AppText variant="heading" weight="700">
            {promoApplied ? '153' : '180'} ETB
          </AppText>
        </View>
      </View>
      <View style={styles.secureNote}>
        <LockKeyhole size={15} color={colors.mintInk} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 8 }}
        >
          Payment is securely completed with Chapa. Nejashi never stores your
          card details.
        </AppText>
      </View>
      <PrimaryButton
        title={`Continue to payment · ${promoApplied ? '153' : '180'} ETB`}
        onPress={() => navigation.navigate('PurchaseSuccess')}
        style={{ marginTop: 18 }}
      />
      <AppText
        variant="caption"
        color={colors.muted}
        style={{ textAlign: 'center', marginTop: 12 }}
      >
        By continuing, you agree to the Terms of Sale.
      </AppText>
    </Page>
  );
}

export function PurchaseSuccessScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={styles.successPage}>
      <BackHeader title="Purchase complete" />
      <View style={styles.successContent}>
        <View style={styles.successIcon}>
          <ShieldCheck size={36} color={colors.mintInk} strokeWidth={1.7} />
        </View>
        <AppText
          variant="title"
          weight="700"
          style={{ textAlign: 'center', marginTop: 21, letterSpacing: -0.5 }}
        >
          It’s in your library
        </AppText>
        <AppText
          color={colors.body}
          style={{ textAlign: 'center', marginTop: 9, lineHeight: 22 }}
        >
          Riyad as-Salihin · Amharic Ebook
        </AppText>
        <AppText
          variant="caption"
          color={colors.muted}
          style={{ textAlign: 'center', marginTop: 7 }}
        >
          Your payment is verified and your reading license is ready.
        </AppText>
      </View>
      <PrimaryButton
        title="Start reading"
        onPress={() => navigation.navigate('Reader')}
      />
      <SecondaryButton
        title="Go to my library"
        onPress={() => navigation.navigate('Tabs', { screen: 'Library' })}
        style={{ marginTop: 10 }}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  promoRow: {
    minHeight: 68,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSubtle,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 11,
  },
  promoIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentRow: {
    minHeight: 68,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  paymentSelected: {
    borderColor: colors.blue,
    backgroundColor: colors.blueSoft,
  },
  chapaMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.blueDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.blueDeep,
  },
  totalBox: {
    marginTop: 23,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingVertical: 13,
    gap: 10,
  },
  totalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalFinal: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: colors.line,
  },
  secureNote: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  successPage: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  successContent: { alignItems: 'center', marginBottom: 'auto', marginTop: 72 },
  successIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
