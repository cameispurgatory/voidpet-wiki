function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}
const H2 = (props: { children: any }) => {
  const anchor = getAnchor(props.children);
  const link = `#${anchor}`;
  return (
    <h2 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {props.children}
    </h2>
  );
};
export default H2;