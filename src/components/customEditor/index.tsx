import { useState, useEffect } from "react";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from "@wangeditor/editor";

interface CustomEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: "zh-CN" | "en";
}

const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
  i18nChangeLanguage("zh-CN");
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // 编辑器内容
  const [html, setHtml] = useState<string>("");

  const triggerChange = (changedValue: string) => {
    onChange?.(html || value || changedValue);
  };

  const onEditorChange = (editor: IDomEditor) => {
    const newNumber = editor.getHtml();
    setHtml(newNumber);
    triggerChange(newNumber);
  };
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
  };
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: "1px solid #d9d9d9", zIndex: 100 }}
    >
      <div className="relative overflow-hidden">
        <div
          className="w-full absolute h-0 z-50"
          style={{ borderTop: "1px solid #d9d9d9", top: "40px" }}
        ></div>
        <div
          className="w-full absolute h-0 z-50"
          style={{ borderTop: "1px solid #d9d9d9", top: "80px" }}
        ></div>
        <div
          className="w-full absolute h-0 z-50"
          style={{ borderTop: "1px solid #d9d9d9", top: "120px" }}
        ></div>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{
            borderBottom: "1px solid #d9d9d9",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
      <Editor
        defaultConfig={editorConfig}
        value={value || html}
        onCreated={setEditor}
        onChange={onEditorChange}
        mode="default"
        style={{ height: "300px", overflowY: "hidden" }}
      />
    </div>
  );
};

export default CustomEditor;
