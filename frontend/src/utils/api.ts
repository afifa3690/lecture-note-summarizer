const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api';

export const fetchDocuments = async () => {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
};

export const fetchDocumentById = async (id: string) => {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  if (!res.ok) throw new Error('Failed to fetch document');
  return res.json();
};

export const uploadFile = async (file: File) => {
  console.log(`\n--- [Network] Upload Request Started ---`);
  console.log(`[Network] Selected filename: ${file.name}`);
  console.log(`[Network] File Size: ${(file.size / 1024).toFixed(2)} KB`);
  console.log(`[Network] API URL Used: ${API_BASE}/documents/upload`);
  
  const formData = new FormData();
  formData.append('file', file);
  let sourceType = 'document';
  if (file.type === 'application/pdf') sourceType = 'pdf';
  else if (file.type.includes('presentation') || file.name.endsWith('.pptx')) sourceType = 'pptx';
  else if (file.type.includes('text/plain')) sourceType = 'text/plain';

  formData.append('sourceType', sourceType);
  formData.append('title', file.name);

  try {
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: formData,
    });
    
    console.log(`[Network] Response Status: ${res.status} ${res.statusText}`);
    const data = await res.json().catch(() => ({ error: "Failed to parse JSON response from server." }));
    console.log(`[Network] Response Body:`, data);
    
    if (!res.ok || !data.success) {
      console.error(`[Network] Server returned an error:`, data.error);
      throw new Error(data.error || data.message || 'Failed to upload file due to a server error.');
    }
    
    console.log(`--- [Network] Upload Request Succeeded ---\n`);
    return data;
  } catch (error: any) {
    console.error(`[Network] Upload explicitly failed:`, error.message);
    throw new Error(error.message || 'Network error or backend unavailable. Is the server running?');
  }
};

export const uploadUrl = async (url: string) => {
  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sourceType: url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'url',
      sourceUrl: url,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to process URL');
  }
  return res.json();
};

export const askQuestion = async (docId: string, message: string) => {
  const res = await fetch(`${API_BASE}/documents/${docId}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to get answer');
  }
  return res.json();
};
