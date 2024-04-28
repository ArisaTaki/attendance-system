import { useEffect, useState } from "react";
import { getMajors, MajorItemProps } from "../api/major";
import { ColleageItemProps, getColleages } from "../api/colleage";

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
