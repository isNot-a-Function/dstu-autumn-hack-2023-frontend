import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { useNavigate } from "react-router-dom";

const Case = () => {
  const navigate = useNavigate();
  return (
    <div className="box-case" onClick={() => navigate("/trainee/1")}>
      <div className="header-box-case">
        <span>
          Убрать баг в форме с картой на реакте вызываемой web app телеграмм
          sfбрать баг в форме с картой на реакте вызываемой web app телеграмм
        </span>
      </div>
      <div className="body-box-case">
        <div className="box-list-tags" >
          <p className="box-tags">React</p>
        </div>
        <div className="box-btn-case">
          <button className="btn blackBtn">Посмотреть</button>
        </div>
      </div>
    </div>
  );
};

export default Case;
