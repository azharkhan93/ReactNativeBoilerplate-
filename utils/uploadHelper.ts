import { GRAPHQL_API_URL } from './api';
import { getAuthToken } from './store/authStore';

export interface UploadResponse {
  url: string;
  public_id: string;
  format: string;
  bytes: number;
}

export const uploadAssetToCloudinary = async (
  uri: string,
  fileName: string = 'upload.jpg',
  mimeType: string = 'image/jpeg',
): Promise<UploadResponse> => {
  const operations = JSON.stringify({
    query: `
      mutation UploadImage($file: Upload!) {
        uploadImage(file: $file) {
          url
          public_id
          format
          bytes
        }
      }
    `,
    variables: {
      file: null,
    },
  });

  const map = JSON.stringify({
    '0': ['variables.file'],
  });

  const formData = new FormData();
  formData.append('operations', operations);
  formData.append('map', map);

  formData.append('0', {
    uri,
    name: fileName,
    type: mimeType,
  } as unknown as Blob);

  const token = await getAuthToken().catch(() => null);
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'apollo-require-preflight': 'true',
    'x-apollo-operation-name': 'UploadImage',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    body: formData,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload request failed with status ${response.status}: ${errorText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message);
  }

  return json.data.uploadImage;
};
