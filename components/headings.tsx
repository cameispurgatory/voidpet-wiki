function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

export function H2(props: { children: any }) {
  const anchor = getAnchor(props.children);
  const link = `#${anchor}`;
  return (
    <h2 id={anchor} className="group -translate-x-6 font-bold">
      <a href={link} className="!no-underline relative font-bold">
        <span className="opacity-0 group-hover:opacity-100 transition duration-300 font-bold">#</span> {props.children}
      </a>
      
    </h2>
  );
};

export function H3(props: { children: any }) {
  const anchor = getAnchor(props.children);
  const link = `#${anchor}`;
  return (
    <h3 id={anchor} className="group -translate-x-6">
      <a href={link} className="!no-underline relative font-bold">
        <span className="opacity-0 group-hover:opacity-100 transition duration-300 font-bold">#</span> {props.children}
      </a>
      
    </h3>
  );
};
