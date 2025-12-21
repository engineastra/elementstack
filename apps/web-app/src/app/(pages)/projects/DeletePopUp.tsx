'use client';
import { oxanium } from '@web-app/constants/Common';

const DeletePopUp = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div
      className={`flex flex-col ${oxanium.variable} w-[90vw] lg:max-w-[250px] gap-3 items-center`}
    >
      <p className="oxanium-font text-primary text-[24px]">Confirm Deletion</p>
      <button
        className="w-full oxanium-font py-2 px-5 text-[14px] project-grad rounded-full text-white font-medium border-none"
        onClick={onConfirm}
      >
        Delete
      </button>
      <button
        className="w-full oxanium-font py-2 px-5 text-[14px] theme-grad rounded-full text-black font-medium border-none"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeletePopUp;
