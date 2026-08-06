import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
import { FilterModal } from '@/components/FilterModal';
import { OnboardingScreen } from '@/screens/OnboardingScreen/OnboardingScreen';
import { PhoneVerificationModal } from '@/components/Verification/PhoneVerificationModal';
import { TabBarHeightContext } from '@/utils/tabBar.constants';
import { useAppNavigator } from './useAppNavigator';
import { ScreenRenderer } from './components/ScreenRenderer';
import { VendorSearchResultsOverlay } from './components/VendorSearchResultsOverlay';

export const AppNavigator: React.FC = () => {
  const {
    activeTab,
    selectedVendorId,
    userRole,
    showOnboarding,
    searchValue,
    showPhoneModal,
    userLocation,
    trackingParams,
    isFilterModalOpen,
    activeFilters,
    searchData,
    tabBarHeight,
    avatarUrl,
    tabs,
    showTopBar,
    showTabBar,
    setUserLocation,
    setIsFilterModalOpen,
    setActiveFilters,
    setShowPhoneModal,
    handleRequestAuth,
    handleNavigate,
    handleOnboardingFinish,
    handleLogout,
    handlePhoneSuccess,
    handleSearch,
  } = useAppNavigator();

  const handleProfilePress = useCallback(() => {
    handleNavigate('profile');
  }, [handleNavigate]);

  const handleOpenFilterModal = useCallback(() => {
    setIsFilterModalOpen(true);
  }, [setIsFilterModalOpen]);

  const handleCloseFilterModal = useCallback(() => {
    setIsFilterModalOpen(false);
  }, [setIsFilterModalOpen]);

  const handleApplyFilters = useCallback(
    (filters: typeof activeFilters) => {
      setActiveFilters(filters);
      setIsFilterModalOpen(false);
    },
    [setActiveFilters, setIsFilterModalOpen],
  );

  const handleClosePhoneModal = useCallback(() => {
    setShowPhoneModal(false);
  }, [setShowPhoneModal]);

  const handleSelectSearchResultVendor = useCallback(
    (vendorId: string) => {
      handleNavigate('vendorDetails', { vendorId });
    },
    [handleNavigate],
  );

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={handleOnboardingFinish}
        onLocationSelect={setUserLocation}
      />
    );
  }

  const vendorsList = searchData?.searchVendors ?? [];

  return (
    <TabBarHeightContext.Provider value={tabBarHeight}>
      <View className="flex-1 bg-[#F1F6FD]">
        {showTopBar && (
          <TopBar
            placeholder="Search services..."
            avatarUrl={avatarUrl}
            onProfilePress={handleProfilePress}
            onFilterPress={handleOpenFilterModal}
            searchValue={searchValue}
            onSearch={handleSearch}
            location={userLocation.address}
          />
        )}

        <View className="flex-1 bg-[#F1F6FD]">
          <ScreenRenderer
            activeTab={activeTab}
            userRole={userRole}
            userLocation={userLocation}
            selectedVendorId={selectedVendorId}
            trackingParams={trackingParams}
            activeFilters={activeFilters}
            searchValue={searchValue}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onRequestAuth={handleRequestAuth}
            setActiveFilters={setActiveFilters}
          />
        </View>

        <VendorSearchResultsOverlay
          vendors={vendorsList}
          onSelectVendor={handleSelectSearchResultVendor}
        />

        {showTabBar && (
          <BottomTabNavigator
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={handleNavigate}
          />
        )}

        <FilterModal
          visible={isFilterModalOpen}
          currentFilters={activeFilters}
          onClose={handleCloseFilterModal}
          onApply={handleApplyFilters}
        />

        <PhoneVerificationModal
          visible={showPhoneModal}
          role={userRole}
          onClose={handleClosePhoneModal}
          onSuccess={handlePhoneSuccess}
        />
      </View>
    </TabBarHeightContext.Provider>
  );
};
