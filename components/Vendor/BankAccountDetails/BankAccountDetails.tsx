import React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Typography, Button } from '../../theme';
import { Landmark, Pencil, Trash2, ShieldCheck, Cpu } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBankAccountDetails, BankFormData } from './hooks/useBankAccountDetails';
import { BankDetailsForm } from './BankDetailsForm';

const BankDetailsCard: React.FC<{ profile: BankFormData }> = ({ profile }) => {
  const lastFour = profile.accountNumber ? profile.accountNumber.slice(-4) : '••••';

  return (
    <View className="w-full items-center my-4">
      {/* Premium Revamped Bank Card */}
      <View className="w-full max-w-[340px] aspect-[1.586/1] bg-slate-900 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden shadow-2xl justify-between">
        {/* Subtle Background Glows */}
        <View className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        <View className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />

        {/* Top-Right Bank Name Corner Accent */}
        <View className="absolute top-0 right-0 w-24 h-24 bg-indigo-950/40 rounded-bl-full items-end justify-start pt-5 pr-6">
          <Typography className="text-gray-400 font-body-bold text-xs tracking-widest uppercase">
            {profile.bankName || 'BANK'}
          </Typography>
        </View>

        {/* Card Header: Chip & Landmark Icon */}
        <View className="flex-row items-center">
          {/* Holographic Chip Emblem */}
          <View className="w-9 h-7 bg-amber-500/20 border border-amber-500/35 rounded-md items-center justify-center mr-3 relative overflow-hidden">
            <View className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 to-transparent" />
            <Cpu size={16} color="#f59e0b" />
          </View>
          <Landmark size={18} color="#94a3b8" />
        </View>

        {/* Card Number: Masked Account Number */}
        <View className="justify-center items-center my-2">
          <Typography className="text-white text-base tracking-[3px] font-body-bold">
            {`••••  ••••  ••••  ${lastFour}`}
          </Typography>
        </View>

        {/* Card Footer: Holder Name & IFSC */}
        <View className="flex-row justify-between items-end">
          <View className="flex-1 mr-4">
            <Typography className="text-[9px] text-gray-500 font-body-semibold uppercase tracking-wider mb-0.5">
              Cardholder Name
            </Typography>
            <Typography numberOfLines={1} className="text-white text-xs font-body-bold uppercase tracking-widest">
              {profile.accountHolder || '—'}
            </Typography>
          </View>
          <View className="items-end">
            <Typography className="text-[9px] text-gray-500 font-body-semibold uppercase tracking-wider mb-0.5">
              IFSC Code
            </Typography>
            <Typography className="text-white text-xs font-body-bold tracking-wider uppercase">
              {profile.ifscCode || '—'}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export const BankAccountDetails: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    profile,
    loading,
    isModalOpen,
    editingProfile,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveProfile,
    handleDeleteProfile,
  } = useBankAccountDetails();

  if (loading && !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-notchLight p-10 min-h-[300px]">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography className="text-slate-400 mt-4 font-body">Loading Bank Details...</Typography>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-notchLight"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 20,
        }}
      >
        <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-4 mt-4 mb-6 flex-row items-center">
          <ShieldCheck size={20} color="#3b82f6" />
          <Typography variant="body" className="ml-3 flex-1 leading-5 text-slate-500">
            Your banking data is encrypted and processed via secure RBI-compliant gateways.
          </Typography>
        </View>

        {!profile ? (
          <View className="py-8 items-center">
            <Landmark size={40} color="#3b82f6" className="opacity-80" />
            <Typography variant="subheading" className="text-slate-900 mt-4 mb-2 text-center">
              Set Up Your Bank Account
            </Typography>
            <Typography variant="body-sm" className="text-slate-500 text-center mb-6 leading-5">
              Configure your bank details to receive secure, direct payouts from completed detailing services.
            </Typography>
            <Button variant="primary" onPress={handleOpenAddModal}>
              Add Bank Details →
            </Button>
          </View>
        ) : (
          <>
            {/* Header row with Edit and Delete actions ABOVE the details view */}
            <View className="flex-row items-center justify-between mb-2">
              <Typography variant="subheading" className="text-slate-900 font-body-bold">
                Saved Bank Details
              </Typography>
              <View className="flex-row items-center gap-2.5">
                <TouchableOpacity
                  onPress={handleOpenEditModal}
                  className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2"
                  activeOpacity={0.7}
                >
                  <Pencil size={13} color="#3b82f6" />
                  <Typography variant="body-sm" className="text-primary-400 font-body-semibold ml-1.5">Edit</Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDeleteProfile}
                  disabled={loading}
                  className="flex-row items-center bg-red-500/10 border border-red-500/25 rounded-xl px-3.5 py-2"
                  activeOpacity={0.7}
                >
                  <Trash2 size={13} color="#ef4444" />
                  <Typography variant="body-sm" className="text-red-400 font-body-semibold ml-1.5">Delete</Typography>
                </TouchableOpacity>
              </View>
            </View>

            {/* Premium Revamped Bank Card Details View */}
            <BankDetailsCard profile={profile} />
          </>
        )}
      </ScrollView>

      <BankDetailsForm
        visible={isModalOpen}
        initialProfile={editingProfile}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        loading={loading}
      />
    </>
  );
};
