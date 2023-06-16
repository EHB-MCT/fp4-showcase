import React from "react";

const WithdrawParticipationModal = ({
  handleWithdrawModalClose,
  handleConfirmWithdrawButtonClick,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-slate-900 p-4 rounded shadow-lg relative z-10 w-1/3">
        <div className="flex justify-end">
          <button className="text-white" onClick={handleWithdrawModalClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-xl mb-4">Remove Participation</h2>
        <p className="mb-4">
          Are you sure you do not want to participate for this award anymore?
          This means that your project will be removed from the list of
          projects for this award.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handleWithdrawModalClose}
          >
            Cancel
          </button>
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded"
            onClick={handleConfirmWithdrawButtonClick}
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawParticipationModal;
