import React from "react";
import {
  centerCard,
  centerName,
  centerMeta,
  divider,
  smallText,
  mutedText,
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

const CenterCard = ({ org }) => {
  const stock = org.stock || {};
  
  // Calculate total units in stock
  const totalUnits = Object.values(stock).reduce((sum, val) => sum + (val || 0), 0);

  // Filter blood groups that have stock > 0
  const activeStock = Object.entries(bloodGroupMap)
    .filter(([key]) => stock[key] > 0)
    .map(([key, label]) => `${label}: ${stock[key]}`);

  return (
    <div className={centerCard}>
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-full border border-red-100">
            {org.type || "Blood Center"}
          </span>
          <h3 className={centerName}>{org.orgName}</h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-gray-500">Stock Status</span>
          <p className="text-sm font-medium text-red-700">{totalUnits} units total</p>
        </div>
      </div>

      <div className={centerMeta}>
        <p className="mb-1">📍 <strong>Address:</strong> {org.address}, {org.district}, {org.state}</p>
        <p className="mb-1">📞 <strong>Phone:</strong> {org.phone}</p>
        {org.pocName && (
          <p className={smallText}>
            👤 <strong>POC:</strong> {org.pocName} ({org.pocPhone})
          </p>
        )}
      </div>

      <div className={divider}></div>

      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">Available Stock Summary:</p>
        {activeStock.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(bloodGroupMap).map(([key, label]) => {
              const count = stock[key] || 0;
              if (count === 0) return null;
              return (
                <span
                  key={key}
                  className="px-2.5 py-1 text-xs bg-red-50 text-red-700 rounded-lg border border-red-100 font-medium"
                >
                  {label} ({count})
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No blood stock currently available</p>
        )}
      </div>
    </div>
  );
};

export default CenterCard;
