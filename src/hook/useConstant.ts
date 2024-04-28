import { useEffect, useState } from "react";
import { getMajors, MajorItemProps } from "../api/major";
import { ColleageItemProps, getColleages } from "../api/colleage";

/**
 * 自定义 Hook：用于获取学院专业和同事数据，暂时弃用
 *
 * @returns {Object} 包含学院专业和同事数据的对象
 * @property {Array<MajorItemProps>} major - 学院专业数据
 * @property {Array<ColleageItemProps>} colleague - 同事数据
 */
const useColleageMajor = () => {
  const [major, setMajor] = useState<MajorItemProps[]>([]);
  const [colleague, setColleague] = useState<ColleageItemProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const majorData = await getMajors();
        setMajor(majorData);

        const colleagueData = await getColleages();
        setColleague(colleagueData);

        localStorage.setItem("major", JSON.stringify(majorData));
        localStorage.setItem("colleague", JSON.stringify(colleagueData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (localStorage.getItem("major") && localStorage.getItem("colleague")) {
      setMajor(JSON.parse(localStorage.getItem("major") || ""));
      setColleague(JSON.parse(localStorage.getItem("colleague") || ""));
    } else {
      fetchData();
    }
  }, []);

  return { major, colleague };
};

export default useColleageMajor;
