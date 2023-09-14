import React from "react";
import "./generation-list.css";
import formatGeneration from "../utils/format-generation";
import Pokemon from "../models/pokemon";

interface GenerationListProps {
  generations: { [key: string]: Pokemon[] };
}

const GenerationList: React.FC<GenerationListProps> = ({ generations }) => {
  return (
    <div className="generations-links">
      <div className="row">
        {Object.keys(generations).map((generation) => (
          <div key={generation} className="col s12 m6 l2">
            <a href={`#generation-${generation}`} id="generation-link">
              {formatGeneration(Number(generation))}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationList;
