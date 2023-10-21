import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Trash } from "../../assets/img/trash.svg";
import { flightApi } from "../../store";
import { useEffect, useState } from "react";

interface MenuProps {
  activeSection: string[];
  setActiveSection: (value: string[]) => void;
  openSection: number | null;
  setOpenSection: (value: number | null) => void;
}
const Menu = ({
  activeSection,
  setActiveSection,
  openSection,
  setOpenSection,
}: MenuProps) => {
  const { data: specializations } = flightApi.useGetSpecializationsQuery();
  const [sectionList, setSectionList] = useState([]);

  const handlerClickSection = (title: string) => {
    setActiveSection(
      activeSection.includes(title)
        ? activeSection.filter((item) => item !== title)
        : [...activeSection, title]
    );
  };

  const checkArray = (arr1: any, arr2: any) => {
    const res1 = arr1.filter((el: any) => arr2.includes(el));
    const res2 = arr1.filter((el: any) => !arr2.includes(el));

    if (res1.length === 0) {
      return 0; //нет вхождений вообще
    } else if (res1.length > 0 && res2.length != 0) {
      return 1; //что-то входит, но не всё
    } else if (res1.length > 0 && res2.length == 0) {
      return 2; ///входит всё
    }
  };

  const handlerAddSubSections = (el: any) => {
    const titleSubSections = el.subsections.map((e: any) => e.title);
    if (
      checkArray(
        el.subsections.map((e: any) => e.title),
        activeSection
      ) === 2
    ) {
      setActiveSection(
        activeSection.filter((item) => !titleSubSections.includes(item))
      );
    } else if (
      checkArray(
        el.subsections.map((e: any) => e.title),
        activeSection
      ) === 1
    ) {
      const arr = activeSection.filter(
        (item) => !titleSubSections.includes(item)
      );
      setActiveSection([...arr, ...titleSubSections]);
    } else {
      setActiveSection([...activeSection, ...titleSubSections]);
    }
  };

  const handlerOpenSubSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  useEffect(() => {
    if (specializations != undefined) {
      let sections: any = [];
      specializations.specializations.map((it, index) => {
        if (!sections.includes(it.topLevelTitle)) {
          sections = [...sections, it.topLevelTitle];
        }
      });
      const arr = sections.map((item: any, index: any) => {
        return {
          label: item,
          subsections: specializations.specializations.filter((it, index) => {
            if (it.topLevelTitle === item) {
              return it;
            }
          }),
        };
      });
      setSectionList(arr);
    }
  }, [specializations]);

  return (
    <div className="list-filter">
      <div className="header-box-filter">
        <h1>CПЕЦИЛИЗАЦИИ</h1>
        {activeSection.length !== 0 && (
          <p
            onClick={() => {
              setActiveSection([]);
            }}
          >
            <Trash />
          </p>
        )}
      </div>

      {sectionList?.map((section: any, index: number) => {
        return (
          <div key={index}>
            <p
              key={index}
              className={`${
                checkArray(
                  section.subsections.map((e: any) => e.title),
                  activeSection
                ) === 2
                  ? "active-section-list-filter"
                  : "section-list-filter"
              }`}
            >
              <div
                onClick={() => handlerAddSubSections(section)}
                className={`${
                  checkArray(
                    section.subsections.map((e: any) => e.title),
                    activeSection
                  ) === 2
                    ? "active-flag-section"
                    : ""
                } flag-section`}
              >
                {checkArray(
                  section.subsections.map((e: any) => e.title),
                  activeSection
                ) === 1 && <div className="active-flag-center"></div>}
              </div>
              <div onClick={() => handlerOpenSubSection(section.label)}>
                {section?.label}
              </div>
            </p>
            <div className="list-subsection">
              {openSection === section.label &&
                section?.subsections?.map((it: any) => (
                  <p
                    onClick={() => handlerClickSection(it.title)}
                    key={index}
                    className={`${
                      activeSection.includes(it.title)
                        ? "active-section-list-filter"
                        : "section-list-filter"
                    }`}
                  >
                    <div
                      className={`${
                        activeSection.includes(it.title)
                          ? "active-flag-section"
                          : ""
                      } flag-section`}
                    ></div>
                    <div>{it?.title}</div>
                  </p>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
