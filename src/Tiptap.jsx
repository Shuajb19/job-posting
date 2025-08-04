import { TextStyleKit } from '@tiptap/extension-text-style'
import { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
  } from "lucide-react";
import './app/styles/tiptap.scss'
import {Toggle} from "@radix-ui/react-toggle";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const extensions = [TextStyleKit, StarterKit.configure({
    bulletList: {
        HTMLAttributes: {
            class: "list-disc ml-3",
        }
    },
    orderedList: {
        HTMLAttributes: {
            class: "list-decimal ml-3"
        }
    }
}), TextAlign.configure({
    types: ["heading", "paragraph"]
}), Highlight.configure({
    HTMLAttributes: {
        class: 'hover:bg-red-500'
    }
})]

function MenuBar({ editor }) {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })

    const Options = [
        {
          icon: <Heading1 className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          preesed: editor.isActive("heading", { level: 1 }),
        },
        {
          icon: <Heading2 className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          preesed: editor.isActive("heading", { level: 2 }),
        },
        {
          icon: <Heading3 className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          preesed: editor.isActive("heading", { level: 3 }),
        },
        {
          icon: <Bold className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleBold().run(),
          preesed: editor.isActive("bold"),
        },
        {
          icon: <Italic className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          preesed: editor.isActive("italic"),
        },
        {
          icon: <Strikethrough className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleStrike().run(),
          preesed: editor.isActive("strike"),
        },
        {
          icon: <AlignLeft className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
          preesed: editor.isActive({ textAlign: "left" }),
        },
        {
          icon: <AlignCenter className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
          preesed: editor.isActive({ textAlign: "center" }),
        },
        {
          icon: <AlignRight className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
          preesed: editor.isActive({ textAlign: "right" }),
        },
        {
          icon: <List className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          preesed: editor.isActive("bulletList"),
        },
        {
          icon: <ListOrdered className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          preesed: editor.isActive("orderedList"),
        },
        {
          icon: <Highlighter className="size-4 cursor-pointer" />,
          onClick: () => editor.chain().focus().toggleHighlight().run(),
          preesed: editor.isActive("highlight"),
        },
      ];

    return (
        <div className="border border-slate-400 rounded-md p-1 mb-1 bg-gray-800 space-x-2 z-50">
        {Options.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.preesed}
            onPressedChange={option.onClick}
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
    )
}

const Tiptap = ({ value, onChange, placeholder, className }) => {
    const editor = useEditor({
        extensions,
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange && onChange(editor.getHTML());
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [editor, value]);

    return (
        <div className={className}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap