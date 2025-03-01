export const ItalicElement = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontStyle: props.leaf.italic ? "italic" : "normal" }}
    >
      {props.children}
    </span>
  );
};
