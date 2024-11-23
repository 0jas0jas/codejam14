import React from "react";

interface ResultProps {
  result: { codeResult: { code: string } }; // The detected barcode result
}

const Result: React.FC<ResultProps> = ({ result }) => {
  return (
    <li>
      Detected Code: <strong>{result.codeResult.code}</strong>
    </li>
  );
};

export default Result;
