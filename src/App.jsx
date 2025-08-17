import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Editor from './pages/Editor.jsx'
import DocumentList from './components/DocumentList.jsx'
import { FileText, Home } from 'lucide-react'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-semibold text-gray-900">DocEditor</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  Documents
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<DocumentList />} />
            <Route path="/editor/:id" element={<Editor />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App