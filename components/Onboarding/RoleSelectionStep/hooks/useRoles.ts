import { useMutation, useQuery } from '@apollo/client/react';
import { gql } from '../../../../__generated__';
import { UserRole } from '../../../../__generated__/graphql';

export const CREATE_NEW_ROLE = gql(`
  mutation CreateNewRole($roleName: UserRole!) {
    createRole(name: $roleName) {
      id
      name
      createdAt
    }
  }
`);

export const GET_ROLES = gql(`
  query GetRoles {
    roles {
      id
      name
    }
  }
`);

interface UseRolesProps {
    onSelect?: (role: UserRole) => void;
}

export const useRoles = ({ onSelect }: UseRolesProps = {}) => {
    const { data: rolesData, loading: loadingRoles } = useQuery(GET_ROLES);
    const [createRole, { loading: isCreating, error }] = useMutation(CREATE_NEW_ROLE);

    const handleRoleSelect = async (role: UserRole) => {
        onSelect?.(role);
        try {
            await createRole({
                variables: {
                    roleName: role,
                },
            });
        } catch (err) {
            console.error('Failed to save role:', err);
        }
    };

    return {
        roles: rolesData?.roles || [],
        handleRoleSelect,
        loading: loadingRoles || isCreating,
        error,
    };
};
