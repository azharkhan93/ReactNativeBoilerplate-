import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography, Button } from '../../theme';
import { Plus, Edit2, Trash2, Clock, MapPin, DollarSign } from 'lucide-react-native';
import { MOCK_SERVICES } from '../VendorProfileScreen/constants';
import { ServiceManagement } from '../ServiceManagement';

export const ManageServices: React.FC = () => {
    const [showAddService, setShowAddService] = useState(false);

    return (
        <View className="flex-1 bg-gray-950">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5 py-6 pb-12">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Typography variant="h3" className="text-xl mb-1">Your Services</Typography>
                            <Typography variant="body" >Manage your service offerings</Typography>
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowAddService(true)}
                            className="bg-primary-600/10 px-4 py-2.5 rounded-full flex-row items-center border border-primary-500/20"
                        >
                            <Plus size={16} color="#3b82f6" />
                            <Typography className="text-primary-500 font-body-semibold ml-2">Add New</Typography>
                        </TouchableOpacity>
                    </View>

                    {MOCK_SERVICES.map((service, index) => (
                        <View key={service.id || index.toString()} className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5">
                            <View className="flex-row justify-between items-start mb-3">
                                <Typography variant="subheading" className="flex-1 mr-4">{service.name}</Typography>
                                <View className="bg-green-500/10 px-3 py-1 rounded-full flex-row items-center border border-green-500/20">
                                    <DollarSign size={14} color="#22c55e" />
                                    <Typography className="text-green-500 font-body-bold">{service.price}</Typography>
                                </View>
                            </View>

                            <Typography variant="body" className="text-gray-400 mb-5 leading-5">{service.description}</Typography>

                            <View className="flex-row items-center justify-center mb-5 bg-gray-950/70 py-4 px-4 rounded-2xl border border-gray-800/50 w-full overflow-hidden">
                                <View className="flex-row items-center flex-shrink mr-8">
                                    <View className="w-9 h-9 rounded-full bg-blue-500/10 items-center justify-center mr-3">
                                        <Clock size={16} color="#3b82f6" />
                                    </View>
                                    <Typography variant="body" className="text-gray-300 font-body-medium flex-shrink" numberOfLines={1}>{service.duration}</Typography>
                                </View>
                                <View className="flex-row items-center flex-shrink">
                                    <View className="w-9 h-9 rounded-full bg-purple-500/10 items-center justify-center mr-3">
                                        <MapPin size={16} color="#3b82f6" />
                                    </View>
                                    <Typography variant="body" className="text-gray-300 font-body-medium flex-shrink" numberOfLines={1}>{service.location}</Typography>
                                </View>
                            </View>

                            <View className="flex-row justify-between gap-3">
                                <Button variant="outlined" size="sm"  onPress={() => console.log('Edit', service.id)}>
                                    Edit Service
                                </Button>
                                <TouchableOpacity
                                    className="bg-red-500/10 w-[52px] rounded-2xl items-center justify-center border border-red-500/20"
                                    onPress={() => console.log('Delete', service.id)}
                                >
                                    <Trash2 size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <Button variant="primary" className="mt-2" onPress={() => setShowAddService(true)}>
                        Add New Service
                    </Button>
                </View>
            </ScrollView>

            <ServiceManagement
                visible={showAddService}
                onClose={() => setShowAddService(false)}
                onSave={(data) => {
                    console.log('Saved service:', data);
                    setShowAddService(false);
                }}
            />
        </View>
    );
};
