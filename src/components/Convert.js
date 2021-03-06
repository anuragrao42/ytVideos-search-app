import React, { useEffect, useState } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    const translateTex = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslation(data.data.translations[0].translatedText);
    };

    const timeoutId = setTimeout(() => {
      if (text) {
        translateTex();
      }
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [language, text]);

  return (
    <div>
      <h2 className="ui header">{translation}</h2>
    </div>
  );
};
export default Convert;
