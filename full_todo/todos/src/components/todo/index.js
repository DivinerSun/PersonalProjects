import React, { useState } from "react";
import TodoFilter from "./filter";
import TodoTable from "./table";

import styles from "./style.module.css";

const Todo = () => {
    const [list, updateList] = useState([]);

    const handleSearch = (newData) => {
        updateList(newData);
    };

    return (
        <div className={styles.todoBox}>
            <h3>个人待办项清单</h3>
            <TodoFilter handleSearch={handleSearch} />
            <TodoTable
                dataSource={list.map((item) => ({ ...item, key: item.id }))}
                handleSearch={handleSearch}
            />
        </div>
    );
};

export default Todo;
