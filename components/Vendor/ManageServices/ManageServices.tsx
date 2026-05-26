import React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Typography, Button } from '../../theme';
import { Plus, Trash2, Clock, MapPin, IndianRupee } from 'lucide-react-native';
import { ServiceManagement } from '../ServiceManagement';
import { useManageServices } from './hooks/useManageServices';
import { SERVICE_CATEGORIES } from '@/utils/constants';

export const ManageServices: React.FC = () => {
    const {
        services,
        loading,
        isModalOpen,
        editingService,
        handleOpenAddModal,
        handleOpenEditModal,
        handleCloseModal,
        handleSaveService,
        handleDeleteService,
    } = useManageServices();

    if (loading && services.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-[#EEF4FC] p-10 min-h-[300px]">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Typography className="text-slate-400 mt-4 font-body">Loading Services...</Typography>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#EEF4FC]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5 py-6 pb-12">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Typography variant="h3" className="text-xl mb-1 text-slate-900">Your Services</Typography>
                            <Typography variant="body" className="text-slate-500">Manage your service offerings</Typography>
                        </View>
                        <TouchableOpacity
                            onPress={handleOpenAddModal}
                            className="bg-primary-600/10 px-4 py-2.5 rounded-full flex-row items-center border border-primary-500/20"
                        >
                            <Plus size={16} color="#3b82f6" />
                            <Typography className="text-primary-500 font-body-semibold ml-2">Add New</Typography>
                        </TouchableOpacity>
                    </View>

                    {services.length === 0 ? (
                        <View className="bg-white border border-slate-200 rounded-3xl p-8 items-center justify-center mb-6">
                            <Typography className="text-slate-400 text-center font-body mb-4">No services defined yet.</Typography>
                            <Button variant="outlined" size="sm" onPress={handleOpenAddModal}>Create First Service</Button>
                        </View>
                    ) : (
                        services.map((service, index) => {
                            const matchedCategory = SERVICE_CATEGORIES.find(c => c.id === service.categoryId);
                            return (
                                <View key={service.id || index.toString()} className="bg-white border border-slate-200 rounded-3xl p-5 mb-5">
                                    <View className="flex-row justify-between items-start mb-3">
                                        <View className="flex-1 mr-4">
                                            <Typography variant="subheading" className="text-slate-900 mb-1">{service.name}</Typography>
                                            {matchedCategory && (
                                                <View className="flex-row mt-1">
                                                    <View className="bg-primary-500/10 px-2.5 py-0.5 rounded-full border border-primary-500/20">
                                                        <Typography className="text-primary-500 text-xs font-body-semibold">
                                                            {matchedCategory.name}
                                                        </Typography>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                        <View className="bg-green-500/10 px-3 py-1 rounded-full flex-row items-center border border-green-500/20">
                                            <IndianRupee size={14} color="#22c55e" />
                                            <Typography className="text-green-500 font-body-bold ml-1">{service.price}</Typography>
                                        </View>
                                    </View>

                                    <Typography variant="body" className="text-slate-500 mb-5 leading-5">{service.description}</Typography>

                                    <View className="flex-row items-center justify-center mb-5 bg-[#F1F6FD] py-4 px-4 rounded-2xl border border-slate-200 w-full overflow-hidden">
                                        <View className="flex-row items-center flex-shrink mr-8">
                                            <View className="w-9 h-9 rounded-full bg-blue-500/10 items-center justify-center mr-3">
                                                <Clock size={16} color="#3b82f6" />
                                            </View>
                                            <Typography variant="body" className="text-slate-700 font-body-medium flex-shrink" numberOfLines={1}>{service.duration}</Typography>
                                        </View>
                                        <View className="flex-row items-center flex-shrink">
                                            <View className="w-9 h-9 rounded-full bg-purple-500/10 items-center justify-center mr-3">
                                                <MapPin size={16} color="#3b82f6" />
                                            </View>
                                            <Typography variant="body" className="text-slate-700 font-body-medium flex-shrink" numberOfLines={1}>{service.location}</Typography>
                                        </View>
                                    </View>

                                    <View className="flex-row justify-between gap-3">
                                        <Button variant="outlined" size="sm" onPress={() => handleOpenEditModal(service)}>
                                            Edit Service
                                        </Button>
                                        <TouchableOpacity
                                            className="bg-red-500/10 w-[52px] rounded-2xl items-center justify-center border border-red-500/20"
                                            onPress={() => service.id && handleDeleteService(service.id)}
                                        >
                                            <Trash2 size={20} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>

            <ServiceManagement
                visible={isModalOpen}
                initialService={editingService}
                onClose={handleCloseModal}
                onSave={handleSaveService}
            />
        </View>
    );
};
