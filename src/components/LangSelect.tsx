import { useState, useEffect, useRef } from 'react';
import CustomSelect from './UI/CustomSelect';
import { select_language } from '../consts/footer';
const LangSelect = () => {
  const firstRender = useRef(true);
  const lang = localStorage.getItem('lang') === null ? 'en' : localStorage.getItem('lang');
  const min_lang = lang != null ? lang.toLowerCase() : null;
  const [selectLang, setSelectLang] = useState<any>(select_language.filter(item => item.value === min_lang)[0]);

  useEffect(() => {
    localStorage.setItem('lang', selectLang.value);
    if (!firstRender.current) {
      location.reload();
    }
    firstRender.current = false;
  }, [selectLang]);

  return (
    <CustomSelect
      value={selectLang}
      options={select_language}
      onChange={setSelectLang}
      isHaveIcon={true}
      width={71}
      paddingIndicator={0}
      paddingContainer={0}
      backgroundColor={'#171226'}
      menuPlacement={'top'}
    />
  );
};
export default LangSelect;
