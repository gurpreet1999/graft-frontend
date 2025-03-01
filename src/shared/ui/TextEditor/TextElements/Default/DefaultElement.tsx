export const DefaultElement = (props: any) => {
  return <span {...props.attributes}>{props.children}</span>;
};
