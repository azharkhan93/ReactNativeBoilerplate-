import { BusinessProfileFormData } from '../../hooks/useBusinessProfile';

export interface BusinessDetailsProps {
  readonly profile: BusinessProfileFormData;
  readonly onEditPress: () => void;
  readonly onDeletePress: () => void;
  readonly loading: boolean;
}
