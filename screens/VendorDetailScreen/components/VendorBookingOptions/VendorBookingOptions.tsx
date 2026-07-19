import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, Wrench } from 'lucide-react-native';


import { Typography } from '@/components/theme/Typography';
import { VendorCalendar } from '@/components/Vendor/Calendar';

export interface BookingOptionItem {
  id: string;
  name: string;
  icon: any;
}

export interface WashTypeItem {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export interface VendorBookingOptionsProps {
  vendorId: string;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string) => void;
  selectedWashType: string | null;
  setSelectedWashType: (type: string) => void;
  selectedLocation: 'doorstep' | 'workshop' | null;
  setSelectedLocation: (loc: 'doorstep' | 'workshop') => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  priceMatrix: Record<string, Record<string, number>>;
  vehicleCategories: BookingOptionItem[];
  washTypes: WashTypeItem[];
}

export const VendorBookingOptions: React.FC<VendorBookingOptionsProps> = ({
  vendorId,
  selectedCategory,
  setSelectedCategory,
  selectedWashType,
  setSelectedWashType,
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  priceMatrix,
  vehicleCategories,
  washTypes,
}) => {
  return (
    <View className="mt-8 border-t border-blue-200/30 pt-6">
      <Typography
        variant="subheading"
        className="text-slate-900 font-body-semibold mb-1"
      >
        Customize Your Booking
      </Typography>
      <Typography variant="body-sm" className="text-slate-500 mb-5 font-body">
        Select vehicle size and service preferences for instant pricing
      </Typography>

      {/* 1. Vehicle Size / Category Selector */}
      <View className="mb-6">
        <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
          1. Select Vehicle Size
        </Typography>
        <View className="flex-row flex-wrap gap-2.5">
          {vehicleCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComp = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat.id)}
                className={`flex-row items-center px-4 py-3 rounded-2xl border ${
                  isSelected
                    ? 'bg-primary-500/10 border-primary-500'
                    : 'bg-white border-slate-200/60'
                }`}
              >
                <IconComp size={15} color={isSelected ? '#3b82f6' : '#64748b'} />
                <Typography
                  className={`font-body-bold ml-2 text-sm ${
                    isSelected ? 'text-primary-600' : 'text-slate-800'
                  }`}
                >
                  {cat.name}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 2. Service/Wash Type Selector */}
      <View className="mb-6">
        <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
          2. Select Wash Type
        </Typography>
        <View className="flex-col gap-3">
          {washTypes.map((type) => {
            const isSelected = selectedWashType === type.id;
            const pricePreview = selectedCategory
              ? priceMatrix[selectedCategory]?.[type.id]
              : null;

            return (
              <TouchableOpacity
                key={type.id}
                activeOpacity={0.7}
                onPress={() => setSelectedWashType(type.id)}
                className={`p-4 rounded-2xl border flex-row justify-between items-center ${
                  isSelected
                    ? 'bg-primary-500/10 border-primary-500'
                    : 'bg-white border-slate-200/60'
                }`}
              >
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center flex-wrap">
                    <Typography
                      className={`font-body-bold text-sm ${
                        isSelected ? 'text-primary-600' : 'text-slate-900'
                      }`}
                    >
                      {type.name}
                    </Typography>
                    <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
                    <Typography variant="body-sm" className="text-slate-500 font-body-medium">
                      {type.duration}
                    </Typography>
                  </View>
                  <Typography variant="body-sm" className="text-slate-600 mt-1 font-body">
                    {type.description}
                  </Typography>
                </View>
                <View className="items-end">
                  {pricePreview ? (
                    <Typography className="text-primary-600 font-body-bold text-base">
                      ₹{pricePreview}
                    </Typography>
                  ) : (
                    <Typography variant="body-sm" className="text-slate-400 font-body">
                      Select Size
                    </Typography>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 3. Location Selector */}
      <View className="mb-4">
        <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
          3. Choose Service Location
        </Typography>
        <View className="flex-row gap-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedLocation('doorstep')}
            className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
              selectedLocation === 'doorstep'
                ? 'bg-primary-500/10 border-primary-500'
                : 'bg-white border-slate-200/60 shadow-sm shadow-slate-100'
            }`}
          >
            <Home size={18} color={selectedLocation === 'doorstep' ? '#3b82f6' : '#64748b'} />
            <Typography
              className={`font-body-bold mt-2 text-sm text-center ${
                selectedLocation === 'doorstep' ? 'text-primary-600' : 'text-slate-800'
              }`}
            >
              At Home (Doorstep)
            </Typography>
            <Typography variant="body-sm" className="text-primary-600 mt-1 text-[11px] font-body-medium text-center">
              +₹99 Travel Fee
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedLocation('workshop')}
            className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
              selectedLocation === 'workshop'
                ? 'bg-primary-500/10 border-primary-500'
                : 'bg-white border-slate-200/60 shadow-sm shadow-slate-100'
            }`}
          >
            <Wrench size={18} color={selectedLocation === 'workshop' ? '#3b82f6' : '#64748b'} />
            <Typography
              className={`font-body-bold mt-2 text-sm text-center ${
                selectedLocation === 'workshop' ? 'text-primary-600' : 'text-slate-800'
              }`}
            >
              At Center (Workshop)
            </Typography>
            <Typography variant="body-sm" className="text-green-600 mt-1 text-[11px] font-body-medium text-center">
              No Surcharge
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Select Booking Date */}
      <View className="mb-4 mt-6">
        <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
          4. Select Booking Date
        </Typography>
        <VendorCalendar
          vendorProfileId={vendorId}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>
    </View>
  );
};
