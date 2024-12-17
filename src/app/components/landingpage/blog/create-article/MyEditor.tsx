import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "@/app/components/landingpage/blog/create-article/myeditor.css";

interface MyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Link.configure({ openOnClick: true }),
      BulletList,
      OrderedList,
      ListItem,
      Paragraph,
      Text,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      console.log("Contenido HTML generado:", html); 
      onChange(html);
    },
  });
  
  if (!editor) {
    return <p>Cargando editor...</p>;
  }


  return (
    <div className="editor-container">
      {/* Toolbar personalizada */}
      <div className="toolbar">
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="toolbar-button"
        >
          Bold
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="toolbar-button"
        >
          Italic
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="toolbar-button"
        >
          Strikethrough
        </button>
        <button
         type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="toolbar-button"
        >
          H1
        </button>
        <button
         type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="toolbar-button"
        >
          H2
        </button>
        <button
         type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="toolbar-button"
        >
          H3
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="toolbar-button"
        >
          Bullet List
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="toolbar-button"
        >
          Ordered List
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="toolbar-button"
        >
          Paragraph
        </button>
        <button
         type="button"
          onClick={() => {
            const url = prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="toolbar-button"
        >
          Link
        </button>
        <button
         type="button"
          onClick={() => {
            const url = prompt("Enter the image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="toolbar-button"
        >
          Image
        </button>
      </div>

      {/* Contenido del Editor */}
      <EditorContent editor={editor} className="content prose p-4 border rounded" />
    </div>
  );
};

export default MyEditor;
