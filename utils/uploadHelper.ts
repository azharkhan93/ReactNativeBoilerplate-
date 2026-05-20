import { GRAPHQL_API_URL } from './api';

export interface UploadResponse {
  url: string;
  public_id: string;
  format: string;
  bytes: number;
}


export const uploadAssetToCloudinary = async (
  uri: string,
  fileName: string = 'upload.jpg',
  mimeType: string = 'image/jpeg'
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
  
  // Format the file object for React Native Form Data
  formData.append('0', {
    uri,
    name: fileName,
    type: mimeType,
  } as any);

  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'apollo-require-preflight': 'true',
      'x-apollo-operation-name': 'UploadImage',
      // DO NOT set Content-Type — fetch sets it automatically with correct multipart boundary
    },
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
