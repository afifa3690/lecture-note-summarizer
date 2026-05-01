const API_BASE = 'http://localhost:3000/api';

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
  const formData = new FormData();
  formData.append('file', file);
  let sourceType = 'document';
  if (file.type === 'application/pdf') sourceType = 'pdf';
  else if (file.type.includes('presentation') || file.name.endsWith('.pptx')) sourceType = 'pptx';
  else if (file.type.includes('text/plain')) sourceType = 'text/plain';

  formData.append('sourceType', sourceType);
  formData.append('title', file.name);

  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to upload file');
  }
  return res.json();
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
