import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from './SearchBar';
import { MenuIcon } from './MenuIcon';
import { Typography, IconButton, Container } from '../theme';

export interface TopBarProps {
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onProfilePress?: () => void;
  onMenuPress?: () => void;
  placeholder?: string;
  searchValue?: string;
  showMenu?: boolean;
  title?: string;
}

// Cart related props - commented out for future use
// onCartPress?: () => void;
// showCart?: boolean;
// cartCount?: number;

/**
 * Modern E-commerce Top Bar Component
 * Features: Search bar, Profile icon, Optional menu, Safe area support
 */
export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onSearchFocus,
  onProfilePress,
  onMenuPress,
  placeholder = 'Search products...',
  searchValue,
  showMenu = false,
  title,
}) => {
  const insets = useSafeAreaInsets();

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/813c963d-cb9f-4e88-b367-04be8f5be650',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TopBar.tsx:38',message:'TopBar safe area padding',data:{paddingTop:insets.top,insets},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return (
    <View
      className="bg-white border-b border-gray-200"
      style={{ paddingTop: insets.top }}
    >
      <Container variant="between" className="px-4 py-3">
        {showMenu && <MenuIcon onPress={onMenuPress} />}
        
        <View className="flex-1 mx-2">
          {title ? (
            <Typography variant="h3">{title}</Typography>
          ) : (
            <SearchBar
              placeholder={placeholder}
              value={searchValue}
              onSearch={onSearch}
              onFocus={onSearchFocus}
            />
          )}
        </View>

        <Container variant="row">
          {/* Cart Icon - commented out for future use */}
          {/* {showCart && <CartIcon onPress={onCartPress} count={cartCount} />} */}
          
          <IconButton variant="circular" onPress={onProfilePress}>
            <Typography className="text-xl">👤</Typography>
          </IconButton>
        </Container>
      </Container>
    </View>
  );
};

