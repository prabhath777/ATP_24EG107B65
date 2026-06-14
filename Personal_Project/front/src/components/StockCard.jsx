import React from "react";
import {
  card,
  cardTitle,
  mutedText,
  stockGrid,
  stockPill,
  stockLabel,
  stockValue,
  divider,
} from "../../common";

const bloodGroupMap = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

const StockCard = ({ org }) => {
  const stock = org.stock || {};
  
  return (
    <div className={card}>
      <div className="flex flex-col gap-1 mb-4">
        <h3 className={cardTitle}>{org.orgName}</h3>
        <p className={mutedText}>
          📍 {org.district}, {org.state}
        </p>
      </div>

      <div className={`${divider} my-3`}></div>

      <div className={stockGrid}>
        {Object.entries(bloodGroupMap).map(([key, label]) => {
          const count = stock[key] || 0;
          return (
            <div key={key} className={stockPill}>
              <span className={stockLabel}>{label}</span>
              <span className={`${stockValue} ${count > 0 ? "text-red-700" : "text-gray-400 font-normal"}`}>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockCard;
