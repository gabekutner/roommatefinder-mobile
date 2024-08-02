type SeparateIdentifiersProps = {
  input1: string;
  input2: string;
  input3: string;
};

const formatIdentifier = (identifier: string, separateIdentifiers: SeparateIdentifiersProps) => {
  if (identifier === "") {
    return `${separateIdentifiers.input1}${separateIdentifiers.input2}${separateIdentifiers.input3}`;
  } else {
    return identifier;
  };
};

export default formatIdentifier;