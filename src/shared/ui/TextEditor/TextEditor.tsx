import React, { useCallback, useEffect, useState } from "react";
import { createEditor, Descendant, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import {
  BoldElement,
  DefaultElement,
  ItalicElement,
  StrikeThroughElement,
} from "./TextElements";
import { CustomEditor, initialValue } from "./CustomEditor";
import style from "./TextEditor.module.css";
import boldIcon from "assets/images/text-editor/Bold.svg";
import italicIcon from "assets/images/text-editor/Italic.svg";
import strikeIcon from "assets/images/text-editor/Strikethrough.svg";
import classNames from "classnames";

interface ITextEditor {
  label: string;
  labelIcon: string;
  setValue: (value: string) => void;
  messageText?: Descendant[];
  messageError?: string;
}

export const serializeNodes = (node: any) => {
  const children = node.map((child: any) => Node.string(child as Node));

  switch (node.type) {
    case "bold":
      return <BoldElement>{children}</BoldElement>;
    case "italic":
      return <ItalicElement>{children}</ItalicElement>;
    case "strike":
      return <StrikeThroughElement>{children}</StrikeThroughElement>;
    case "paragraph":
      return `<p>${children}</p>`;
    default:
      return children;
  }
};

export const TextEditor = ({
  label,
  labelIcon,
  setValue,
  messageError,
}: ITextEditor) => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "bold":
        return <BoldElement {...props} />;
      case "italic":
        return <ItalicElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    if (props.leaf.bold) {
      return <BoldElement {...props} />;
    }
    if (props.leaf.italic) {
      return <ItalicElement {...props} />;
    }
    if (props.leaf.strike) {
      return <StrikeThroughElement {...props} />;
    }
    return <DefaultElement {...props} />;
  }, []);

  const [currentButton, setCurrentButton] = useState("");

  useEffect(() => {
    if (CustomEditor.isBoldMarkActive(editor)) {
      setCurrentButton("bold");
      return;
    }
    if (CustomEditor.isItalicMarkActive(editor)) {
      setCurrentButton("italic");
      return;
    }
    if (CustomEditor.isStrikeThoughtMarkActive(editor)) {
      setCurrentButton("strike");
      return;
    }
    setCurrentButton("");
  }, [editor.children, editor]);

  return (
    <div className={style.container}>
      {(label || labelIcon) && (
        <div className={style.label__container}>
          {labelIcon && <img src={labelIcon} alt="Icon" />}
          {label && <label className={style.label}>{label}</label>}
        </div>
      )}
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            setValue(JSON.stringify(value));
          }
        }}
      >
        {messageError && <p className={style.error__message}>{messageError}</p>}
        <div
          className={classNames(
            style.editor__container,
            messageError && style.error
          )}
        >
          <Editable
            placeholder="Enter"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className={style.editor}
            spellCheck
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }
              switch (event.key) {
                case "b": {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;
                }
                case "i": {
                  event.preventDefault();
                  CustomEditor.toggleItalicMark(editor);
                  break;
                }
                case "u": {
                  event.preventDefault();
                  CustomEditor.toggleStrikeThoughtMark(editor);
                  break;
                }
              }
            }}
          />
        </div>
        <div className={style.editor__buttons}>
          <button
            className={classNames(
              style.editor__button,
              currentButton === "bold" && style.active
            )}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            <img src={boldIcon} alt="bold" />
          </button>
          <button
            className={classNames(
              style.editor__button,
              currentButton === "italic" && style.active
            )}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleItalicMark(editor);
            }}
          >
            <img src={italicIcon} alt="italic" />
          </button>
          <button
            className={classNames(
              style.editor__button,
              currentButton === "strike" && style.active
            )}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleStrikeThoughtMark(editor);
            }}
          >
            <img src={strikeIcon} alt="strike" />
          </button>
        </div>
      </Slate>
    </div>
  );
};
