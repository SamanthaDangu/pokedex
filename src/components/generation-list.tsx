import React from "react";
import "./generation-list.css"
import formatGeneration from "../utils/format-generation";
import Pokemon from "../models/pokemon";

interface GenerationListProps {
  generations: { [key: string]: Pokemon[] };
}

const GenerationList: React.FC<GenerationListProps> = ({ generations }) => {
  return (
    <div className="generations-links">
      {Object.keys(generations).map((generation) => (
        <a key={generation} href={`#generation-${generation}`} id="generation-link">
          {formatGeneration(Number(generation))}
        </a>
      ))}
    </div>
  );
};

export default GenerationList;
