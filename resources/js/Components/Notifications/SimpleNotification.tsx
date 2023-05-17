import React, {forwardRef} from "react";
import {CheckCircleIcon, XCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";

type SimpleNotificationProps = {
    dismiss(): void,
    type: 'success' | 'error',
    title: string,
    description: string,
}

const SimpleNotification = forwardRef<unknown, SimpleNotificationProps>((props, ref) => {
    return (
        <div ref={ref} className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        { props.type === 'success' && (
                            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                        ) }
                        { props.type === 'error' && (
                            <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                        ) }
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{ props.title }</p>
                        <p className="mt-1 text-sm text-gray-500">{ props.description }</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => props.dismiss()}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SimpleNotification;
