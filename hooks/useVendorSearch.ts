import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useDebounce } from './useDebounce';
import { QuerySearchVendorsArgs, VendorProfileType } from '../__generated__/graphql';

// GraphQL query for searching vendors
export const SEARCH_VENDORS = gql`
  query SearchVendors($query: String!) {
    searchVendors(query: $query) {
      id
      businessName
      description
    }
  }
`;

export function useVendorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce<string>(searchTerm, 300);

  // Uses global Apollo Client defaultOptions (cache-first & MMKV persistence)
  const [executeSearch, { data, loading, error }] = useLazyQuery<
    { searchVendors: VendorProfileType[] },
    QuerySearchVendorsArgs
  >(SEARCH_VENDORS);

  useEffect(() => {
    if (debouncedTerm) {
      executeSearch({ variables: { query: debouncedTerm } });
    }
  }, [debouncedTerm, executeSearch]);

  return { executeSearch, data, loading, error, setSearchTerm };
}
