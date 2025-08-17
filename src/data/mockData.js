// Mock documents data
export const mockDocuments = [
  {
    id: '1',
    title: 'Getting Started Guide',
    content: [
      {
        id: 'block-1',
        type: 'heading',
        content: 'Welcome to Your Document Editor',
        level: 1
      },
      {
        id: 'block-2',
        type: 'paragraph',
        content: 'This is a powerful AI-powered document editor that helps you create and edit documents with intelligent assistance.'
      },
      {
        id: 'block-3',
        type: 'heading',
        content: 'Key Features',
        level: 2
      },
      {
        id: 'block-4',
        type: 'bullet-list',
        content: 'Real-time AI assistance\nSmart content suggestions\nCollaborative editing\nRich text formatting'
      },
      {
        id: 'block-5',
        type: 'paragraph',
        content: 'Start typing anywhere to begin creating your document. The AI sidebar will provide contextual help and suggestions as you work.'
      }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:45:00Z',
    isStarred: true
  },
  {
    id: '2',
    title: 'Project Planning Template',
    content: [
      {
        id: 'block-6',
        type: 'heading',
        content: 'Project Overview',
        level: 1
      },
      {
        id: 'block-7',
        type: 'paragraph',
        content: 'Define your project goals, timeline, and key deliverables in this comprehensive planning template.'
      },
      {
        id: 'block-8',
        type: 'heading',
        content: 'Objectives',
        level: 2
      },
      {
        id: 'block-9',
        type: 'numbered-list',
        content: 'Identify project scope and requirements\nEstablish timeline and milestones\nAllocate resources and responsibilities\nDefine success metrics'
      },
      {
        id: 'block-10',
        type: 'heading',
        content: 'Timeline',
        level: 2
      },
      {
        id: 'block-11',
        type: 'paragraph',
        content: 'Phase 1: Research and Planning (Weeks 1-2)\nPhase 2: Development (Weeks 3-8)\nPhase 3: Testing and Refinement (Weeks 9-10)\nPhase 4: Launch (Week 11)'
      }
    ],
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-16T11:20:00Z',
    isStarred: false
  },
  {
    id: '3',
    title: 'Meeting Notes - Q1 Review',
    content: [
      {
        id: 'block-12',
        type: 'heading',
        content: 'Q1 Review Meeting',
        level: 1
      },
      {
        id: 'block-13',
        type: 'paragraph',
        content: 'Date: January 16, 2024\nAttendees: Sarah, Mike, Alex, Jennifer\nDuration: 2 hours'
      },
      {
        id: 'block-14',
        type: 'heading',
        content: 'Key Discussions',
        level: 2
      },
      {
        id: 'block-15',
        type: 'bullet-list',
        content: 'Revenue targets exceeded by 15%\nCustomer satisfaction scores improved\nNew product launch delayed to Q2\nTeam expansion approved for engineering'
      },
      {
        id: 'block-16',
        type: 'heading',
        content: 'Action Items',
        level: 2
      },
      {
        id: 'block-17',
        type: 'numbered-list',
        content: 'Sarah to finalize Q2 budget proposal\nMike to coordinate with design team\nAlex to prepare customer feedback report\nJennifer to schedule follow-up meeting'
      }
    ],
    createdAt: '2024-01-16T15:30:00Z',
    updatedAt: '2024-01-16T16:45:00Z',
    isStarred: true
  },
  {
    id: '4',
    title: 'Untitled Document',
    content: [
      {
        id: 'block-18',
        type: 'paragraph',
        content: 'Start writing your thoughts here...'
      }
    ],
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T08:00:00Z',
    isStarred: false
  }
];

// Mock AI responses and suggestions
export const mockAIResponses = [
  {
    id: 'ai-1',
    type: 'suggestion',
    title: 'Content Enhancement',
    content: 'I can help you expand this section with more detailed examples and supporting information.',
    context: 'paragraph',
    actions: ['Expand', 'Add Examples', 'Improve Clarity']
  },
  {
    id: 'ai-2',
    type: 'grammar',
    title: 'Grammar Check',
    content: 'Consider revising this sentence for better readability and flow.',
    context: 'sentence',
    actions: ['Fix Grammar', 'Improve Tone', 'Simplify']
  },
  {
    id: 'ai-3',
    type: 'structure',
    title: 'Document Structure',
    content: 'This section might work better as a bulleted list for improved readability.',
    context: 'block',
    actions: ['Convert to List', 'Add Headings', 'Reorganize']
  },
  {
    id: 'ai-4',
    type: 'completion',
    title: 'Smart Completion',
    content: 'Based on your writing pattern, here are some suggested continuations for this paragraph.',
    context: 'writing',
    actions: ['Accept Suggestion', 'Generate Alternative', 'Continue Writing']
  },
  {
    id: 'ai-5',
    type: 'research',
    title: 'Research Assistant',
    content: 'I found some relevant information that might support your argument in this section.',
    context: 'topic',
    actions: ['Add Citation', 'Include Facts', 'Verify Information']
  }
];

// Mock AI chat conversations
export const mockAIConversations = [
  {
    id: 'conv-1',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Can you help me improve the introduction of this document?',
        timestamp: '2024-01-17T10:15:00Z'
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'I\'d be happy to help improve your introduction! I can see you\'re working on a project planning document. Here are a few suggestions:\n\n1. Start with a compelling hook that explains why this project matters\n2. Clearly state the main objective in the first paragraph\n3. Provide a brief overview of what readers can expect\n\nWould you like me to help you rewrite any specific part?',
        timestamp: '2024-01-17T10:15:30Z'
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Yes, please help me rewrite the first paragraph to be more engaging.',
        timestamp: '2024-01-17T10:16:00Z'
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'Here\'s a more engaging version of your first paragraph:\n\n"Every successful project begins with a clear vision and a solid plan. This comprehensive planning template will guide you through the essential steps of transforming your ideas into actionable strategies, ensuring your project not only meets its goals but exceeds expectations."\n\nThis revision:\n- Opens with a universal truth about projects\n- Positions your template as the solution\n- Creates anticipation for positive outcomes\n\nWould you like me to adjust the tone or focus on any particular aspect?',
        timestamp: '2024-01-17T10:16:45Z'
      }
    ]
  }
];

// Mock document templates
export const mockTemplates = [
  {
    id: 'template-1',
    name: 'Meeting Notes',
    description: 'Structure your meeting notes with agenda, discussions, and action items',
    category: 'productivity',
    content: [
      {
        id: 'temp-block-1',
        type: 'heading',
        content: 'Meeting Title',
        level: 1
      },
      {
        id: 'temp-block-2',
        type: 'paragraph',
        content: 'Date: \nAttendees: \nDuration: '
      },
      {
        id: 'temp-block-3',
        type: 'heading',
        content: 'Agenda',
        level: 2
      },
      {
        id: 'temp-block-4',
        type: 'numbered-list',
        content: 'Item 1\nItem 2\nItem 3'
      },
      {
        id: 'temp-block-5',
        type: 'heading',
        content: 'Action Items',
        level: 2
      },
      {
        id: 'temp-block-6',
        type: 'bullet-list',
        content: 'Action item with owner and deadline'
      }
    ]
  },
  {
    id: 'template-2',
    name: 'Project Proposal',
    description: 'Present your project ideas with clear objectives and timeline',
    category: 'business',
    content: [
      {
        id: 'temp-block-7',
        type: 'heading',
        content: 'Project Proposal',
        level: 1
      },
      {
        id: 'temp-block-8',
        type: 'heading',
        content: 'Executive Summary',
        level: 2
      },
      {
        id: 'temp-block-9',
        type: 'paragraph',
        content: 'Brief overview of the project and its expected impact...'
      },
      {
        id: 'temp-block-10',
        type: 'heading',
        content: 'Objectives',
        level: 2
      },
      {
        id: 'temp-block-11',
        type: 'bullet-list',
        content: 'Primary objective\nSecondary objectives\nSuccess metrics'
      }
    ]
  },
  {
    id: 'template-3',
    name: 'Research Notes',
    description: 'Organize your research findings and references',
    category: 'academic',
    content: [
      {
        id: 'temp-block-12',
        type: 'heading',
        content: 'Research Topic',
        level: 1
      },
      {
        id: 'temp-block-13',
        type: 'heading',
        content: 'Key Findings',
        level: 2
      },
      {
        id: 'temp-block-14',
        type: 'bullet-list',
        content: 'Finding 1 with source\nFinding 2 with source\nFinding 3 with source'
      },
      {
        id: 'temp-block-15',
        type: 'heading',
        content: 'References',
        level: 2
      },
      {
        id: 'temp-block-16',
        type: 'numbered-list',
        content: 'Reference 1\nReference 2\nReference 3'
      }
    ]
  }
];