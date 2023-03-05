const TextWithTooltip = ({ text, maxChars }) => {
  return (
    <span title={text?.length > maxChars ? text : null}>
      {text?.length > maxChars ? text.slice(0, maxChars) + "..." : text}
    </span>
  );
};

export default TextWithTooltip;
