import React from "react";
import { createPortal } from "react-dom";

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     onConfirm,
                                                     title,
                                                     description,
                                                     confirmText = "Confirm",
                                                     cancelText = "Cancel",
                                                 }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                {description && (
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                )}

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AlertDialog;
