import React from "react";
import _ from "lodash";
import moment from "moment";
import { Tag, Button, Modal, message } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Axios } from "../../config";

import styles from "./style.module.css";

export const columns = ({
    handleCompleteOrCancel,
    handleDeleteOne,
    handleShow,
}) => {
    const handleDelete = (id) => {
        Modal.confirm({
            icon: <ExclamationCircleTwoTone style={{ color: "#fe0066" }} />,
            title: "是否确认删除",
            content: "删除后状态不可在改变，请慎重操作！",
            centered: true,
            cancelText: "取消",
            okText: "确定",
            onOk: () => handleDeleteOne(id),
        });
    };

    const handleShowUpdate = (id) => {
        Axios.get(`/detail/${id}`)
            .then((res) => {
                if (
                    _.get(res, "status") === 200 &&
                    _.get(res, "data.code") === 20000
                ) {
                    const data = _.get(res, "data.data.todo", {});
                    const detail = {
                        ...data,
                        endDate: _.get(data, "endDate")
                            ? moment(_.get(data, "endDate"))
                            : null,
                    };
                    handleShow("update", detail);
                }
            })
            .catch((err) => {
                message.error(`服务器异常：${err.message}，请稍后重试……`);
            });
    };

    return [
        {
            title: "编号",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "内容描述",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "到期时间",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "状态",
            key: "status",
            dataIndex: "status",
            render: (text) => {
                switch (text) {
                    case 1:
                        return <Tag color={"orange"}>待完成</Tag>;
                    case 2:
                        return <Tag color={"green"}>已完成</Tag>;
                    case 3:
                        return <Tag color={"red"}>已删除</Tag>;
                    default:
                        return "";
                }
            },
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
        },
        {
            title: "操作",
            key: "actions",
            width: 450,
            render: (text, record) => {
                const id = _.get(record, "id");
                const status = _.get(record, "status");
                return status && status === 3 ? null : (
                    <span className={styles.actions}>
                        {status === 2 ? null : (
                            <Button onClick={() => handleShowUpdate(id)}>
                                修改
                            </Button>
                        )}
                        <Button
                            onClick={() =>
                                handleCompleteOrCancel(id, status === 1 ? 2 : 1)
                            }
                        >
                            {status === 1 ? "完成" : "取消完成"}
                        </Button>
                        <Button
                            type={"danger"}
                            onClick={() => handleDelete(id)}
                        >
                            删除
                        </Button>
                    </span>
                );
            },
        },
    ];
};
