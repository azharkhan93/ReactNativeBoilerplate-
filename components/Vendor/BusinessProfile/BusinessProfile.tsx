import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { Clock, ChevronRight, Globe } from 'lucide-react-native';

export const BusinessProfile: React.FC = () => {
    const [radius, setRadius] = useState('5km');

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 py-4 gap-8 pb-12">




                <View>
                    <View className="mb-6">
                        <Typography variant='subheading' className="mb-2">
                            Business Information
                        </Typography>
                        <Typography variant="body" className=" leading-5">
                            Provide your legal registration details as they appear on your documents.
                        </Typography>
                    </View>

                    <View>
                        <FormInput
                            label="Legal Business Name"
                            placeholder="e.g. Shiny Wheels LLC"
                        />

                        <FormInput
                            label="Business Registration Number"
                            placeholder="Tax ID or Registration No."
                        />

                        <FormInput
                            label="Business Address"
                            placeholder="Enter full street address"
                            multiline
                            textAlignVertical="top"
                            inputClassName="min-h-[100px]"
                        />
                    </View>
                </View>


                <View className="gap-4">
                    <View>
                        <Typography className="text-white text-xl font-heading-bold mb-1">
                            Service Area
                        </Typography>
                        <Typography variant="body-sm" className="text-gray-500">
                            Set your mobile service coverage radius.
                        </Typography>
                    </View>

                    <View className="flex-row gap-3">
                        {['5km', '10km', '25km'].map((val) => (
                            <TouchableOpacity
                                key={val}
                                onPress={() => setRadius(val)}
                                className={`flex-1 py-3 rounded-2xl items-center border ${radius === val
                                    ? 'bg-primary-600/10 border-primary-600'
                                    : 'bg-gray-900 border-gray-800'
                                    }`}
                            >
                                <Typography className={radius === val ? 'text-primary-500' : 'text-gray-400'}>
                                    {val}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 h-48">
                        {/* Map Placeholder Image */}
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800' }}
                            className="w-full h-full opacity-50"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 items-center justify-center">
                            <TouchableOpacity className="bg-white/10 px-4 py-2.5 rounded-full flex-row items-center blur-md border border-white/20">
                                <Globe size={14} color="white" />
                                <Typography className="text-white font-body-semibold ml-2 text-xs">LIVE PREVIEW</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Operating Hours Row */}
                <TouchableOpacity className="bg-gray-900 border border-gray-800 rounded-3xl px-5 py-5 flex-row items-center">
                    <View className="w-12 h-12 bg-blue-500/10 rounded-full items-center justify-center mr-4">
                        <Clock size={24} color="#3b82f6" />
                    </View>
                    <View className="flex-1">
                        <Typography variant='body'>Operating Hours</Typography>
                        <Typography variant="body" >Mon - Fri, 08:00 AM - 06:00 PM</Typography>
                    </View>
                    <ChevronRight size={20} color="#4b5563" />
                </TouchableOpacity>


                <Button variant='primary'>
                    Continue →
                </Button>
            </View>
        </ScrollView>
    );
};
