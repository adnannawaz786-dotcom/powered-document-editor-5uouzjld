import { useState, useEffect } from 'react'
import EditorComponents from '../components/EditorComponents.jsx'
import AISidebar from '../components/AISidebar.jsx'
import { getDocument, saveDocument } from '../utils/editorUtils.js'
import { motion, AnimatePresence } from 'framer-motion'
import { PanelRightOpen, PanelRightClose, Save, FileText, Sparkles } from 'lucide-react'

export default function Editor() {
  const [document, setDocument] = useState(null)
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [selectedBlock, setSelectedBlock] = useState(null)

  useEffect(() => {
    // Load document on component mount
    const loadDocument = async () => {
      try {
        const doc = await getDocument('current')
        setDocument(doc)
      } catch (error) {
        console.error('Failed to load document:', error)
        // Initialize with empty document
        setDocument({
          id: 'new-doc',
          title: 'Untitled Document',
          blocks: [
            {
              id: 'block-1',
              type: 'heading',
              content: 'Welcome to your document',
              level: 1
            },
            {
              id: 'block-2',
              type: 'paragraph',
              content: 'Start writing here...'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
    }

    loadDocument()
  }, [])

  const handleSave = async () => {
    if (!document) return
    
    setIsSaving(true)
    try {
      await saveDocument(document)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save document:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDocumentChange = (updatedDocument) => {
    setDocument(updatedDocument)
    // Auto-save after changes
    setTimeout(() => {
      handleSave()
    }, 1000)
  }

  const toggleAISidebar = () => {
    setIsAISidebarOpen(!isAISidebarOpen)
  }

  const handleBlockSelect = (blockId) => {
    setSelectedBlock(blockId)
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-slate-600">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading document...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-lg font-semibold text-slate-900">
                  {document.title}
                </h1>
              </div>
              {lastSaved && (
                <span className="text-sm text-slate-500">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAISidebar}
                className={`inline-flex items-center px-3 py-2 border border-slate-300 text-sm leading-4 font-medium rounded-md transition-colors ${
                  isAISidebarOpen
                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assistant
                {isAISidebarOpen ? (
                  <PanelRightClose className="h-4 w-4 ml-2" />
                ) : (
                  <PanelRightOpen className="h-4 w-4 ml-2" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex">
        {/* Editor Area */}
        <motion.main 
          layout
          className={`flex-1 transition-all duration-300 ${
            isAISidebarOpen ? 'mr-96' : 'mr-0'
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[600px]"
            >
              <EditorComponents
                document={document}
                onDocumentChange={handleDocumentChange}
                selectedBlock={selectedBlock}
                onBlockSelect={handleBlockSelect}
              />
            </motion.div>
          </div>
        </motion.main>

        {/* AI Sidebar */}
        <AnimatePresence>
          {isAISidebarOpen && (
            <motion.aside
              initial={{ x: 384, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 384, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-16 bottom-0 w-96 bg-white/95 backdrop-blur-sm border-l border-slate-200 z-30"
            >
              <AISidebar
                document={document}
                selectedBlock={selectedBlock}
                onDocumentChange={handleDocumentChange}
                onClose={() => setIsAISidebarOpen(false)}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isAISidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAISidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  )
}