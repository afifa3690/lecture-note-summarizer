const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api';

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers: any = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const fetchDocuments = async () => {
  const res = await fetch(`${API_BASE}/documents`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
};

export const fetchDocumentById = async (id: string) => {
  const res = await fetch(`${API_BASE}/documents/${id}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch document');
  return res.json();
};

export const uploadFile = async (file: File) => {
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
      headers: getHeaders(true),
      body: formData,
    });
    
    const data = await res.json().catch(() => ({ error: "Failed to parse JSON response from server." }));
    if (!res.ok || !data.success) {
      throw new Error(data.error || data.message || 'Failed to upload file due to a server error.');
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error or backend unavailable.');
  }
};

export const uploadUrl = async (url: string) => {
  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: 'POST',
    headers: getHeaders(),
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
    headers: getHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to get answer');
  }
  return res.json();
};

export const fetchCurrentUser = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
  return res.json();
};

export const loginUser = async (credentials: any) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  } catch (error: any) {
    throw new Error('Could not connect to the server. Please ensure the backend is running.');
  }
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');
  return data;
};

export const registerUser = async (userData: any) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  } catch (error: any) {
    throw new Error('Could not connect to the server. Please ensure the backend is running.');
  }
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Registration failed');
  return data;
};
