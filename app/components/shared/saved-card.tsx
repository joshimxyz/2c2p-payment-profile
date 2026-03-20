"use client";

import { Card } from "@/app/context/AuthContext";

interface SavedCardProps {
  card: Card;
  isManageMode: boolean;
  isSelectedForPayment: boolean;
  isSelectedForDelete: boolean;
  onCardClick: (id: number) => void;
  onCvvChange?: (cvv: string) => void;
}

const SavedCard = ({
  card,
  onCardClick,
  isSelectedForPayment,
  isSelectedForDelete,
  isManageMode,
  onCvvChange
}: SavedCardProps) => {
  const activeBorder = isSelectedForPayment || isSelectedForDelete
    ? 'border-saved-card-active-border'
    : "border-gray-200";

  return (
    <div
      onClick={() => onCardClick(card.id)}
      className={`border items-stretch ${activeBorder} rounded-lg flex items-center cursor-pointer relative overflow-hidden flex-shrink-0`}
    >
      <div className="flex-1 w-3/4 md:w-2/3 flex-row flex items-center gap-[6px] px-3 py-3">
        <div>
          <div className="flex bg-blue-100 h-9 max-w-12 py-1 rounded">
            <svg
              height="28"
              fill="none"
              viewBox="0 0 58 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_813_9408)">
                <path
                  d="M24.2256 12.517L19.3815 24.1058H16.2211L13.8373 14.8581C13.6926 14.2885 13.5676 14.0798 13.1266 13.8398C12.408 13.4489 11.2213 13.0822 10.1782 12.8543L10.2491 12.5175H15.3366C15.9851 12.5175 16.568 12.9504 16.7152 13.6991L17.9742 20.4043L21.0856 12.5166H24.2268L24.2256 12.517ZM36.6086 20.3221C36.6213 17.2635 32.3906 17.0952 32.4197 15.7286C32.4288 15.3128 32.8244 14.8707 33.6879 14.7579C34.1163 14.7016 35.2967 14.6587 36.6364 15.2765L37.1615 12.819C36.4421 12.5571 35.5165 12.3052 34.3649 12.3052C31.4098 12.3052 29.3301 13.8804 29.3125 16.136C29.2932 17.8043 30.7964 18.7353 31.9297 19.2897C33.095 19.8574 33.486 20.2222 33.4816 20.73C33.4733 21.5074 32.5521 21.8508 31.6913 21.8641C30.1882 21.8873 29.3166 21.4564 28.6215 21.1324L28.0796 23.6712C28.7781 23.9926 30.0675 24.2729 31.4044 24.287C34.5455 24.287 36.5999 22.7313 36.6096 20.3221M44.4131 24.1058H47.1782L44.7632 12.517H42.2114C41.9388 12.5146 41.6719 12.5944 41.4451 12.746C41.2183 12.8976 41.0422 13.114 40.9395 13.3672L36.4531 24.1058H39.5925L40.2153 22.3748H44.0512L44.4131 24.1058ZM41.0771 19.9996L42.6508 15.6485L43.5565 19.9996H41.0771ZM28.4974 12.517L26.0251 24.1058H23.0355L25.5087 12.517H28.4974Z"
                  fill="#1434CB"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_813_9408">
                  <rect
                    width="37"
                    height="11.9819"
                    fill="white"
                    transform="translate(10.1772 12.3052)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-saved-card-name-fg text-xs font-semibold truncate">
            {card.name}
          </p>
          <p className="text-saved-card-number-fg text-[10px]">{card.number}</p>
          <p className="text-saved-card-bank-fg text-[8px] flex gap-1 flex-row">
            {card.bank} <span className="text-saved-card-expiry-fg">Expires --/--</span>
          </p>
        </div>
      </div>

      <div className="flex items-center">
        {isManageMode ? (
          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors mr-3 ${isSelectedForDelete ? "bg-[#0088FF] border-[#0088FF]" : "bg-white border-gray-300"}`}>
            {isSelectedForDelete && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        ) : (
          isSelectedForPayment && (
            <div className="self-stretch flex items-center px-2 transition-opacity border-l border-saved-card-active-border bg-white">
              <input
                maxLength={3}
                type="password"
                placeholder="CVC/CVV"
                onClick={(e) => e.stopPropagation()}
                className="w-12 text-gray-900 text-[9px] outline-none bg-transparent placeholder:text-gray-400 font-medium"
                onChange={(e) => onCvvChange && onCvvChange(e.target.value)}
      
              />
              <svg
                width="25"
                height="20"
                fill="none"
                viewBox="0 0 23 15"
                className="shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.31366 2.06738H17.2703C18.3571 2.06738 19.2382 2.95348 19.2382 4.04654V12.7549C19.2382 13.8479 18.3571 14.734 17.2703 14.734H2.31366C1.22679 14.7341 0.345703 13.848 0.345703 12.7549V4.04657C0.345703 2.95348 1.22679 2.06738 2.31366 2.06738Z"
                  fill="#DDDDDD"
                ></path>
                <path
                  d="M19.2383 4.44238H0.345703V7.60904H19.2383V4.44238Z"
                  fill="#B4B4B4"
                ></path>
                <path
                  d="M6.24938 10.7761H3.10064C2.88326 10.7761 2.70703 10.5988 2.70703 10.3802C2.70703 10.1616 2.88326 9.98438 3.10064 9.98438H6.24938C6.46676 9.98438 6.64299 10.1616 6.64299 10.3802C6.64299 10.5988 6.46676 10.7761 6.24938 10.7761Z"
                  fill="#FAFAFA"
                ></path>
                <path
                  d="M8.61095 12.3591H3.10064C2.88326 12.3591 2.70703 12.1818 2.70703 11.9632C2.70703 11.7446 2.88326 11.5674 3.10064 11.5674H8.61095C8.82833 11.5674 9.00456 11.7446 9.00456 11.9632C9.00456 12.1818 8.82833 12.3591 8.61095 12.3591Z"
                  fill="#FAFAFA"
                ></path>
                <ellipse
                  cx="17.4341"
                  cy="5.43958"
                  rx="4.91164"
                  ry="4.93958"
                  fill="#929292"
                ></ellipse>
                <path d="M19.9171 7.48917..." fill="#FAFAFA"></path>
              </svg>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SavedCard;