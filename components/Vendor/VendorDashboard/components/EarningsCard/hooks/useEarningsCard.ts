import { useState, useCallback } from 'react';

export const useEarningsCard = () => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const handleOpenHistory = useCallback(() => {
    setIsHistoryVisible(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setIsHistoryVisible(false);
  }, []);

  return {
    isHistoryVisible,
    handleOpenHistory,
    handleCloseHistory,
  };
};
