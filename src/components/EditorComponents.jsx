import React, { useState } from 'react';
import { formatDocument } from '../utils/editorUtils.js';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Link, Image, Plus, GripVertical, Trash2, Copy } from 'lucide-react';

const Toolbar = ({ onAction, activeFormats = [] }) => {
  const toolbarItems = [
    { icon: Bold, action: 'bold', tooltip: 'Bold' },
    { icon: Italic, action: 'italic', tooltip: 'Italic' },
    { icon: Underline, action: 'underline', tooltip: 'Underline' },
    { icon: AlignLeft, action: 'align-left', tooltip: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', tooltip: 'Align Center' },
    { icon: AlignRight, action: 'align-right', tooltip: 'Align Right' },
    { icon: List, action: 'bullet-list', tooltip: 'Bullet List' },
    { icon: ListOrdered, action: 'numbered-list', tooltip: 'Numbered List' },
    { icon: Quote, action: 'quote', tooltip: 'Quote' },
    { icon: Code, action: 'code', tooltip: 'Code Block' },
    { icon: Link, action: 'link', tooltip: 'Insert Link' },
    { icon: Image, action: 'image', tooltip: 'Insert Image' },
  ];

  return (
    <motion.div 
      className="flex items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-sm mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {toolbarItems.map(({ icon: Icon, action, tooltip }) => (
        <motion.button
          key={action}
          onClick={() => onAction(action)}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            activeFormats.includes(action) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={tooltip}
        >
          <Icon size={16} />
        </motion.button>
      ))}
    </motion.div>
  );
};

const BlockControls = ({ onAction, position = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const blockTypes = [
    { label: 'Text', action: 'text', icon: '¶' },
    { label: 'Heading 1', action: 'h1', icon: 'H1' },
    { label: 'Heading 2', action: 'h2', icon: 'H2' },
    { label: 'Heading 3', action: 'h3', icon: 'H3' },
    { label: 'Quote', action: 'quote', icon: '"' },
    { label: 'Code', action: 'code', icon: '</>' },
    { label: 'Bullet List', action: 'bullet-list', icon: '•' },
    { label: 'Numbered List', action: 'numbered-list', icon: '1.' },
  ];

  return (
    <div className="relative">
      <motion.div
        className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ position: 'absolute', left: position === 'left' ? '-60px' : 'auto', right: position === 'right' ? '-60px' : 'auto', top: '0' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        >
          <Plus size={16} />
        </button>
        <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-grab">
          <GripVertical size={16} />
        </button>
        <button
          onClick={() => onAction('duplicate')}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={() => onAction('delete')}
          className="p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </motion.div>

      {isOpen && (
        <motion.div
          className="absolute left-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-48 z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {blockTypes.map(({ label, action, icon }) => (
            <button
              key={action}
              onClick={() => {
                onAction(action);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded text-sm"
            >
              <span className="w-6 text-center font-mono text-xs">{icon}</span>
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const ContentBlock = ({ 
  type = 'paragraph', 
  content = '', 
  placeholder = 'Start typing...', 
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  isActive = false,
  blockId
}) => {
  const [localContent, setLocalContent] = useState(content);
  const [isFocused, setIsFocused] = useState(false);

  const handleContentChange = (e) => {
    const newContent = e.target.value || e.target.textContent;
    setLocalContent(newContent);
    if (onChange) {
      onChange(newContent, blockId);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e, blockId);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e, blockId);
  };

  const handleKeyDown = (e) => {
    if (onKeyDown) onKeyDown(e, blockId);
  };

  const handleBlockAction = (action) => {
    console.log(`Block action: ${action} for block ${blockId}`);
    // Handle block-specific actions
  };

  const getBlockElement = () => {
    const baseClasses = "w-full outline-none resize-none bg-transparent";
    const focusClasses = "focus:ring-0 focus:border-transparent";
    
    switch (type) {
      case 'h1':
        return (
          <input
            type="text"
            value={localContent}
            onChange={handleContentChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${baseClasses} ${focusClasses} text-3xl font-bold text-gray-900 py-2`}
          />
        );
      
      case 'h2':
        return (
          <input
            type="text"
            value={localContent}
            onChange={handleContentChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${baseClasses} ${focusClasses} text-2xl font-semibold text-gray-900 py-2`}
          />
        );
      
      case 'h3':
        return (
          <input
            type="text"
            value={localContent}
            onChange={handleContentChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${baseClasses} ${focusClasses} text-xl font-medium text-gray-900 py-1`}
          />
        );
      
      case 'quote':
        return (
          <div className="border-l-4 border-gray-300 pl-4">
            <textarea
              value={localContent}
              onChange={handleContentChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${baseClasses} ${focusClasses} text-gray-700 italic leading-relaxed min-h-[2rem]`}
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      
      case 'code':
        return (
          <div className="bg-gray-100 rounded-md p-4 font-mono">
            <textarea
              value={localContent}
              onChange={handleContentChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${baseClasses} ${focusClasses} text-sm bg-transparent font-mono text-gray-800 min-h-[2rem]`}
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      
      case 'bullet-list':
        return (
          <div className="flex items-start gap-3">
            <span className="text-gray-400 mt-1">•</span>
            <textarea
              value={localContent}
              onChange={handleContentChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${baseClasses} ${focusClasses} text-gray-900 leading-relaxed min-h-[1.5rem] flex-1`}
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      
      case 'numbered-list':
        return (
          <div className="flex items-start gap-3">
            <span className="text-gray-400 mt-1">1.</span>
            <textarea
              value={localContent}
              onChange={handleContentChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${baseClasses} ${focusClasses} text-gray-900 leading-relaxed min-h-[1.5rem] flex-1`}
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      
      default:
        return (
          <textarea
            value={localContent}
            onChange={handleContentChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${baseClasses} ${focusClasses} text-gray-900 leading-relaxed min-h-[1.5rem]`}
            rows={1}
            style={{ height: 'auto' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        );
    }
  };

  return (
    <motion.div
      className={`relative group py-1 ${isActive ? 'ring-2 ring-blue-200 rounded' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <BlockControls onAction={handleBlockAction} />
      {getBlockElement()}
    </motion.div>
  );
};

const EditorComponents = {
  Toolbar,
  ContentBlock,
  BlockControls
};

export default EditorComponents;
export { Toolbar, ContentBlock, BlockControls };