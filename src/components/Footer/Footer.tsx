import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScaleOnline from "./ScaleOnline";
import { ReactComponent as OnlineIcon } from "../../assets/img/footer/onlineIcon.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";

import Loader from "../Loader";
import LangSelect from "../LangSelect";

import { notificationModalOpenServers } from "../../consts/modal";

const Footer = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const dimensions = useWindowSize();
  return (
    <>
      {/* {info && modalShow && (
        <MonitoringModal
          isActive={modalShow}
          setIsActive={setModalShow}
          data={info?.result}
        />
      )} */}
      <div className="container containerFooter">
        {/* <div className={`${dimensions.width < 700 ? 'boxStaticticMobile' : ''}`}>
          <div>
            <div className="headerFooter">
              <OnlineIcon />
              <p className="titleFooter">Online</p>
            </div>
            <p className="labelCountFooter">{String(info?.sumPlayers) + ' / ' + String(info?.maxServerOnline)}</p>
          </div>

          {dimensions.width < 700 && (
            <button className="btn blackBtn exitBtn" onClick={() => setModalShow(true)}>
              <span>{useLang(notificationModalOpenServers)}</span>
            </button>
          )}

          {dimensions.width >= 700 && (
            <div className="footerBox">
              {info?.result.map((server, id) => (
                <ScaleOnline
                  key={id}
                  name={server.name}
                  maxPlayers={server.maxPlayers}
                  currentOnline={server.currentOnline}
                  IP={server.IP}
                  port={server.port}
                />
              ))}
            </div>
          )}
        </div> */}

        <div className="bottomFooter">
          <div>{/* <p>{useLang(footerInformafionPosted)}</p> */}</div>

          <div className="infoRightBootomFooter">
            <LangSelect />

            <div className="contactsFooter">
              {/* {data.panelURLs.footer.contacts.map((it) => (
                <a href={it.url} target="_blank" key={it.id} rel="noreferrer">
                  <img src={it.icon} className="iconContactFooter" />
                </a>
              ))} */}
            </div>
          </div>
        </div>
        <div className="bottomFooter bottomDopInfo">
          <div>
            <p>
              INTERNATIONAL BUSINESS SYSTEMS S.R.L.
              <br />
              Reg. number:
              <br />
              3-102-693823
              <br />
              Beneficiary's address:
              <br />
              SAN JOSE-SANTA ANA,THREE HUNDRED AND FIFTY METERS OF THE
              RESTAURANT CEVICHE DEL REY,
              <br />
              COSTA-RICA
            </p>
          </div>

          <div className="listBottom">
            {/* <Link to={data.panelURLs.footer.privacyPolicy}>
              <p className="conditionalsLabel">
                {useLang(footerPrivacyPolicy)}
              </p>
            </Link>
            <Link to={data.panelURLs.footer.termOfUse}>
              <p className="conditionalsLabel">{useLang(footerTermsOfUse)}</p>
            </Link>
            <Link to={data.panelURLs.footer.conditionsOfUse}>
              <p className="conditionalsLabel">
                {useLang(footerConditionsOfUse)}
              </p>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
