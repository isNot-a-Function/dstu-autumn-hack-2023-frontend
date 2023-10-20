import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/img/modal/CloseIcon.svg";
import { useBodyScrollModal } from "../../hooks/useBodyScrollModal";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isActive?: boolean;
  setIsActive: (param: boolean) => void;
  headerTitle: string;
  modalHeaderBottom?: number;
  className: string;
  children: string | JSX.Element;
  onLeadersPage?: boolean;
  isSelect?: boolean;
  isTopUp?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  setIsActive,
  className,
  headerTitle,
  modalHeaderBottom = 32,
  children,
  onLeadersPage = false,
  isSelect = false,
  isTopUp,
}) => {
  useBodyScrollModal();
  const dimensions = useWindowSize();
  const navigate = useNavigate();

  const onClickHandler = () => setIsActive(false);
  const leadersOnClickHandler = () => navigate(-1);

  return (
    <div
      className="modal modalActive"
      style={{ zIndex: onLeadersPage ? 190 : 100 }}
      onClick={onLeadersPage ? leadersOnClickHandler : onClickHandler}
    >
      <div
        className={`modalContent mountedStyle modalContentActive ${
          isTopUp && "topUpModal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalBackground" />
        <div className={`${className}`}>
          <div
            className={`${
              modalHeaderBottom === 32
                ? "modalHeader"
                : "modalHeaderSmallBottom"
            }`}
          >
            <h3 className="modalHeaderTitle">{headerTitle}</h3>
            {/* это надо будет {isSelect && dimensions.width > 708 && <>Тут селект с странами</>} */}
            <CloseIcon
              onClick={onLeadersPage ? leadersOnClickHandler : onClickHandler}
            />
          </div>
          {/* это надо будет {isSelect && dimensions.width <= 708 && <>Тут селект с странами</>} */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
