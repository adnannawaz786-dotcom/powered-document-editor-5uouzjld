// Document management utilities
const STORAGE_KEY = 'powered_documents';

// Get document by ID
export const getDocument = (id) => {
  try {
    const documents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return documents[id] || null;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

// Save document to localStorage
export const saveDocument = (id, document) => {
  try {
    const documents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    documents[id] = {
      ...document,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: document.createdAt || new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    return true;
  } catch (error) {
    console.error('Error saving document:', error);
    return false;
  }
};

// Format document content for display
export const formatDocument = (document) => {
  if (!document || !document.content) {
    return {
      title: 'Untitled Document',
      content: [],
      wordCount: 0,
      lastModified: null
    };
  }

  const wordCount = document.content
    .filter(block => block.type === 'paragraph' || block.type === 'heading')
    .reduce((count, block) => {
      const words = block.content?.split(/\s+/).filter(word => word.length > 0) || [];
      return count + words.length;
    }, 0);

  return {
    title: document.title || 'Untitled Document',
    content: document.content,
    wordCount,
    lastModified: document.updatedAt ? new Date(document.updatedAt) : null,
    createdAt: document.createdAt ? new Date(document.createdAt) : null
  };
};

// Get all documents
export const getAllDocuments = () => {
  try {
    const documents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return Object.values(documents).sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  } catch (error) {
    console.error('Error getting all documents:', error);
    return [];
  }
};

// Delete document
export const deleteDocument = (id) => {
  try {
    const documents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete documents[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

// Create new document
export const createNewDocument = () => {
  const id = Date.now().toString();
  const newDocument = {
    id,
    title: 'Untitled Document',
    content: [
      {
        id: '1',
        type: 'heading',
        level: 1,
        content: 'Untitled Document'
      },
      {
        id: '2',
        type: 'paragraph',
        content: ''
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  saveDocument(id, newDocument);
  return newDocument;
};

// Block manipulation utilities
export const createBlock = (type = 'paragraph', content = '') => {
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    type,
    content,
    createdAt: new Date().toISOString()
  };
};

export const insertBlock = (document, afterBlockId, newBlock) => {
  const content = [...document.content];
  const index = content.findIndex(block => block.id === afterBlockId);
  
  if (index !== -1) {
    content.splice(index + 1, 0, newBlock);
  } else {
    content.push(newBlock);
  }

  return {
    ...document,
    content,
    updatedAt: new Date().toISOString()
  };
};

export const updateBlock = (document, blockId, updates) => {
  const content = document.content.map(block => 
    block.id === blockId 
      ? { ...block, ...updates, updatedAt: new Date().toISOString() }
      : block
  );

  return {
    ...document,
    content,
    updatedAt: new Date().toISOString()
  };
};

export const deleteBlock = (document, blockId) => {
  const content = document.content.filter(block => block.id !== blockId);

  return {
    ...document,
    content,
    updatedAt: new Date().toISOString()
  };
};

// Text formatting utilities
export const getBlockTypeFromText = (text) => {
  if (text.startsWith('# ')) return { type: 'heading', level: 1, content: text.slice(2) };
  if (text.startsWith('## ')) return { type: 'heading', level: 2, content: text.slice(3) };
  if (text.startsWith('### ')) return { type: 'heading', level: 3, content: text.slice(4) };
  if (text.startsWith('- ') || text.startsWith('* ')) return { type: 'bullet', content: text.slice(2) };
  if (text.match(/^\d+\. /)) return { type: 'numbered', content: text.replace(/^\d+\. /, '') };
  if (text.startsWith('> ')) return { type: 'quote', content: text.slice(2) };
  if (text.startsWith('```')) return { type: 'code', content: text.slice(3) };
  
  return { type: 'paragraph', content: text };
};

// Search and filter utilities
export const searchDocuments = (query) => {
  const documents = getAllDocuments();
  const lowercaseQuery = query.toLowerCase();

  return documents.filter(doc => {
    // Search in title
    if (doc.title.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }

    // Search in content
    return doc.content.some(block => 
      block.content && block.content.toLowerCase().includes(lowercaseQuery)
    );
  });
};

// Export utilities
export const exportToMarkdown = (document) => {
  let markdown = '';

  document.content.forEach(block => {
    switch (block.type) {
      case 'heading':
        markdown += '#'.repeat(block.level || 1) + ' ' + block.content + '\n\n';
        break;
      case 'paragraph':
        markdown += block.content + '\n\n';
        break;
      case 'bullet':
        markdown += '- ' + block.content + '\n';
        break;
      case 'numbered':
        markdown += '1. ' + block.content + '\n';
        break;
      case 'quote':
        markdown += '> ' + block.content + '\n\n';
        break;
      case 'code':
        markdown += '```\n' + block.content + '\n```\n\n';
        break;
      default:
        markdown += block.content + '\n\n';
    }
  });

  return markdown.trim();
};