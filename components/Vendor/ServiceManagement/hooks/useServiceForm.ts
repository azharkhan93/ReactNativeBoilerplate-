import { useState, useEffect, useCallback, useMemo } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';

export interface ServiceData {
    id?: string;
    name: string;
    price: number;
    duration: string;
    location: string;
    description: string;
    images?: string[];
    categoryId?: string;
    availableAtHome?: boolean;
    availableAtCenter?: boolean;
    pricings?: Array<{ categoryId: string; price: number }>;
}

interface UseServiceFormProps {
    initialService: ServiceData | null | undefined;
    visible: boolean;
    onSave: (service: any) => void;
}

export const useServiceForm = ({ initialService, visible, onSave }: UseServiceFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '299',
        duration: '',
        location: '',
        description: '',
        availableAtHome: true,
        availableAtCenter: true,
    });

    const [categoryPrices, setCategoryPrices] = useState({
        hatchback: '',
        sedan: '',
        suv: '',
        luxury: '',
    });

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageSuccess = useCallback((url: string | null) => {
        setImageUrl(url);
    }, []);

    const { triggerUpload: handleImageUpload, uploading } = useImageUpload({
        fileName: 'service_image.jpg',
        onSuccess: handleImageSuccess,
    });

    // Sync form data with initialService when editing
    useEffect(() => {
        if (initialService) {
            setFormData({
                name: initialService.name,
                price: initialService.price.toString(),
                duration: initialService.duration,
                location: initialService.location,
                description: initialService.description,
                availableAtHome: initialService.availableAtHome ?? true,
                availableAtCenter: initialService.availableAtCenter ?? true,
            });
            setImageUrl(initialService.images?.[0] || null);

            // Populate category pricing inputs with dynamic mapping
            const prices = { hatchback: '', sedan: '', suv: '', luxury: '' };
            (initialService.pricings || []).forEach(({ categoryId, price }) => {
                const key = categoryId.replace('category-', '') as keyof typeof prices;
                if (key in prices) prices[key] = price.toString();
            });
            setCategoryPrices(prices);
        } else {
            setFormData({
                name: '',
                price: '299',
                duration: '',
                location: '',
                description: '',
                availableAtHome: true,
                availableAtCenter: true,
            });
            setImageUrl(null);
            setCategoryPrices({ hatchback: '', sedan: '', suv: '', luxury: '' });
        }
    }, [initialService, visible]);

    // Handlers
    const handleNameChange = useCallback((text: string) => {
        setFormData(prev => ({ ...prev, name: text }));
    }, []);

    const handleDurationChange = useCallback((text: string) => {
        setFormData(prev => ({ ...prev, duration: text }));
    }, []);

    const handleLocationChange = useCallback((text: string) => {
        setFormData(prev => ({ ...prev, location: text }));
    }, []);

    const handleDescriptionChange = useCallback((text: string) => {
        setFormData(prev => ({ ...prev, description: text }));
    }, []);

    const handleToggleHome = useCallback(() => {
        setFormData(prev => ({ ...prev, availableAtHome: !prev.availableAtHome }));
    }, []);

    const handleToggleCenter = useCallback(() => {
        setFormData(prev => ({ ...prev, availableAtCenter: !prev.availableAtCenter }));
    }, []);

    const handlePriceChange = useCallback((category: 'hatchback' | 'sedan' | 'suv' | 'luxury', value: string) => {
        setCategoryPrices(prev => ({ ...prev, [category]: value }));
    }, []);

    const handleSave = useCallback(() => {
        const pricings = Object.entries(categoryPrices)
            .map(([cat, val]) => ({
                categoryId: `category-${cat}`,
                price: parseFloat(val) || 0,
            }))
            .filter(p => p.price > 0);

        onSave({
            ...formData,
            price: parseFloat(formData.price) || parseFloat(categoryPrices.hatchback) || 299,
            pricings,
            images: imageUrl ? [imageUrl] : [],
        });
    }, [formData, categoryPrices, imageUrl, onSave]);

    const isEditMode = !!initialService;
    
    const isSaveEnabled = useMemo(() => !!(
        formData.name &&
        formData.duration &&
        Object.values(categoryPrices).some(val => !!val)
    ), [formData.name, formData.duration, categoryPrices]);

    const bottomSheetTitle = useMemo(() => (
        isEditMode ? 'Edit Car Wash Service' : 'Add Car Wash Service'
    ), [isEditMode]);

    const buttonLabel = useMemo(() => (
        isEditMode ? 'Save Changes' : 'Add Service'
    ), [isEditMode]);

    const buttonVariant = useMemo(() => (
        isSaveEnabled ? 'primary' : 'disabled'
    ), [isSaveEnabled]);

    return {
        formData,
        categoryPrices,
        imageUrl,
        uploading,
        handleImageUpload,
        handleNameChange,
        handleDurationChange,
        handleLocationChange,
        handleDescriptionChange,
        handleToggleHome,
        handleToggleCenter,
        handlePriceChange,
        handleSave,
        isEditMode,
        isSaveEnabled,
        bottomSheetTitle,
        buttonLabel,
        buttonVariant,
    };
};
