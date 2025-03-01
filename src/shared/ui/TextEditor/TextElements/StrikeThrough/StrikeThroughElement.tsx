export const StrikeThroughElement = (props: any) => {
  return (
    <span
      style={{
        textDecoration: props.leaf.strike ? "line-through" : "none",
      }}
      {...props.attributes}
    >
      {props.children}
    </span>
  );
};
