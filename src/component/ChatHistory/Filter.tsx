import { CalendarOutlined, RedoOutlined, FilterOutlined } from "@ant-design/icons";

import "./css/filter.css";
import { useRef, useState } from "react";
import { message } from "antd";

const Filter = ({ callback }: any) => {

    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    const filterObj: any = useRef({});

    const resetFilter = () => {

        if (!startDateTime && !endDateTime) {
            message.error("Please apply filters first to reset !");
            return;
        }

        setStartDateTime("");
        setEndDateTime("");

        message.success("Filters Resetted.");
    }

    const applyFilter = () => {

        const filterKeys = Object.keys(filterObj.current);

        if (filterKeys?.length === 0) {
            message.error("Please enter dates for filter !");
            return;
        }

        if (filterKeys.includes("startDateTime") && !filterKeys.includes("endDateTime")) {
            message.error("Please Enter End Date Time too !");
            return;
        }

        if (filterKeys.includes("endDateTime") && !filterKeys.includes("startDateTime")) {
            message.error("Please Enter Start Date Time too !");
            return;
        }

        callback(filterObj.current);

    }

    return (
        <>
            <p className="filter-icons"><CalendarOutlined /></p>

            <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e: any) => {
                    setStartDateTime(e.target.value);
                    filterObj.current.startDateTime = e.target.value;
                }}
            />

            <p className="filter-icons">~</p>

            <input type="datetime-local"
                value={endDateTime}
                onChange={(e: any) => {
                    setEndDateTime(e.target.value);
                    filterObj.current.endDateTime = e.target.value;
                }}
            />

            <button onClick={applyFilter} className="apply-filter-button">APPLY FILTERS</button>

            <p id="resetFilter" onClick={resetFilter} className="filter-icons"><RedoOutlined /></p>

            <p className="filter-icons"><FilterOutlined /></p>
        </>
    );
}

export default Filter;