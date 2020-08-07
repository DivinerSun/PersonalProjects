import React, { useState } from "react";
import _ from "lodash";
import { Table, Button, message } from "antd";
import { columns } from "./config";
import { Axios } from "../../config";
import TodoModal from "./modal";

import styles from "./style.module.css";

const TodoTable = ({ dataSource = [], handleSearch }) => {
    const [visible, updateVisible] = useState(false);
    const [type, updateType] = useState("create");
    const [detail, updateDetail] = useState(null);

    const handleCompleteOrCancel = (id, status) => {
        Axios.patch(`/update/${id}`, {
            status,
        })
            .then((res) => {
                if (
                    _.get(res, "status") === 200 &&
                    _.get(res, "data.code") === 20000
                ) {
                    message.success(_.get(res, "data.msg"));
                    Axios.get("/list")
                        .then((res) => {
                            if (
                                _.get(res, "status") === 200 &&
                                _.get(res, "data.code") === 20000
                            ) {
                                handleSearch(_.get(res, "data.data.list", []));
                            }
                        })
                        .catch((err) => {
                            message.error(
                                `服务器异常：${err.message}，请稍后重试……`
                            );
                        });
                }
            })
            .catch((err) => {
                message.error(`服务器异常：${err.message}，请稍后重试……`);
            });
    };
    const handleDeleteOne = (id) => {
        Axios.delete(`/delete/${id}`)
            .then((res) => {
                if (
                    _.get(res, "status") === 200 &&
                    _.get(res, "data.code") === 20000
                ) {
                    message.success(_.get(res, "data.msg"));
                    Axios.get("/list")
                        .then((res) => {
                            if (
                                _.get(res, "status") === 200 &&
                                _.get(res, "data.code") === 20000
                            ) {
                                handleSearch(_.get(res, "data.data.list", []));
                            }
                        })
                        .catch((err) => {
                            message.error(
                                `服务器异常：${err.message}，请稍后重试……`
                            );
                        });
                }
            })
            .catch((err) => {
                message.error(`服务器异常：${err.message}，请稍后重试……`);
            });
    };

    const handleShow = (type, detail = null) => {
        updateDetail(detail);
        updateType(type);
        updateVisible(true);
    };

    const handleHide = () => {
        updateDetail(null);
        updateVisible(false);
    };

    const handleSubmit = (data) => {
        const method = data.id ? "patch" : "post";
        const url = data.id ? `/update/${data.id}` : `/create`;
        Axios[method](url, { ...data })
            .then((res) => {
                if (
                    _.get(res, "status") === 200 &&
                    _.get(res, "data.code") === 20000
                ) {
                    message.success(_.get(res, "data.msg"));
                    handleHide();
                    Axios.get("/list")
                        .then((res) => {
                            if (
                                _.get(res, "status") === 200 &&
                                _.get(res, "data.code") === 20000
                            ) {
                                handleSearch(_.get(res, "data.data.list", []));
                            }
                        })
                        .catch((err) => {
                            message.error(
                                `服务器异常：${err.message}，请稍后重试……`
                            );
                        });
                }
            })
            .catch((err) => {
                message.error(`服务器异常：${err.message}，请稍后重试……`);
            });
    };

    return (
        <div className={styles.tableBox}>
            <Button type={"primary"} onClick={() => handleShow("create", null)}>
                新增
            </Button>
            <Table
                columns={columns({
                    handleCompleteOrCancel,
                    handleDeleteOne,
                    handleShow,
                    updateDetail,
                })}
                dataSource={dataSource}
            />

            <TodoModal
                visible={visible}
                title={type === "create" ? "新建待办项" : "修改待办项"}
                onOk={handleSubmit}
                onCancel={handleHide}
                detail={detail}
            />
        </div>
    );
};

export default TodoTable;
