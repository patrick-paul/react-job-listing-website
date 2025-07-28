import React from "react";
import { toast, type ToastContentProps } from "react-toastify";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface ConfirmationToastProps {
  message?: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  title?: string;
}

const showConfirmationToast = ({
  message = "This action cannot be undone. Are you sure you want to proceed?",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  title = "Confirm Action",
}: ConfirmationToastProps) => {
  toast(
    ({ closeToast }: ToastContentProps) => (
      <div className="relative bg-white border-l-4 border-red-500 shadow-lg rounded-lg overflow-hidden">
        {/* Header with icon and close button */}
        <div className="flex items-start justify-between p-4 pb-2">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          </div>
          <button
            onClick={closeToast}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 p-4 pt-3 bg-gray-50">
          <button
            onClick={closeToast}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeToast();
              toast.success(
                <div className="flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Item deleted successfully</span>
                </div>
              );
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      className: "!bg-transparent !p-0 !shadow-none",
      position: "top-center",
    }
  );
};

export default showConfirmationToast;
