import React from "react";
import {
  card,
  cardTitle,
  bodyText,
  mutedText,
  smallText,
  divider,
  primaryBtn,
  secondaryBtn,
  pendingBadge,
  acceptedBadge,
  completedBadge,
  cancelledBadge,
} from "../../common";

const RequestCard = ({ request, role, orgId, onCancel, onAccept, onComplete }) => {
  const {
    _id,
    patientName,
    bloodGroup,
    unitsRequired,
    hospitalName,
    contactNumber,
    urgencyLevel,
    status,
    address,
    district,
    state,
    createdAt,
    acceptedBy,
  } = request;

  // Status badge selection
  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case "Pending":
        return <span className={pendingBadge}>Pending</span>;
      case "Accepted":
        return <span className={acceptedBadge}>Accepted</span>;
      case "Completed":
        return <span className={completedBadge}>Completed</span>;
      case "Cancelled":
        return <span className={cancelledBadge}>Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{statusVal}</span>;
    }
  };

  // Urgency indicator color
  const getUrgencyColor = (level) => {
    switch (level) {
      case "Critical":
        return "text-red-700 font-bold bg-red-50 border-red-200";
      case "High":
        return "text-orange-700 font-semibold bg-orange-50 border-orange-200";
      case "Medium":
        return "text-yellow-700 font-medium bg-yellow-50 border-yellow-200";
      default:
        return "text-blue-700 font-normal bg-blue-50 border-blue-200";
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className={card}>
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <span className={`inline-block px-2.5 py-0.5 mb-1.5 text-xs rounded-full border ${getUrgencyColor(urgencyLevel)}`}>
            {urgencyLevel} Urgency
          </span>
          <h3 className={cardTitle}>{patientName}</h3>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {getStatusBadge(status)}
          <span className="text-[11px] text-gray-400">{formattedDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">Blood Group</p>
          <p className="text-lg font-bold text-red-700">{bloodGroup}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Units Required</p>
          <p className="text-lg font-bold text-gray-800">{unitsRequired} units</p>
        </div>
      </div>

      <div className={`${divider} my-3`}></div>

      <div className="text-sm text-gray-700 flex flex-col gap-1.5">
        <p>🏥 <strong>Hospital:</strong> {hospitalName}</p>
        <p>📍 <strong>Location:</strong> {address}, {district}, {state}</p>
        <p>📞 <strong>Contact:</strong> {contactNumber}</p>
      </div>

      {/* Conditional actions */}
      {(onCancel || onAccept || onComplete) && (
        <>
          <div className={`${divider} my-3`}></div>
          <div className="flex justify-end gap-2.5">
            {role === "USER" && status === "Pending" && onCancel && (
              <button
                onClick={() => onCancel(_id)}
                className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-semibold border border-red-200 cursor-pointer"
              >
                Cancel Request
              </button>
            )}

            {role === "ORG" && status === "Pending" && onAccept && (
              <button
                onClick={() => onAccept(_id)}
                className="px-4 py-2 bg-red-700 text-white hover:bg-red-800 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Accept Request
              </button>
            )}

            {role === "ORG" && status === "Accepted" && acceptedBy === orgId && onComplete && (
              <button
                onClick={() => onComplete(_id)}
                className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Complete Request
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestCard;
