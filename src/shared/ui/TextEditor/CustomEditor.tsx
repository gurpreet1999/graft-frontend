import { Editor } from "slate";

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks?.bold;
  },

  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks?.italic;
  },

  isStrikeThoughtMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks?.strike;
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleStrikeThoughtMark(editor: Editor) {
    const isActive = CustomEditor.isStrikeThoughtMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "strike");
    } else {
      Editor.addMark(editor, "strike", true);
    }
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
};

export const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
