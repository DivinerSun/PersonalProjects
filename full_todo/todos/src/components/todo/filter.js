import React, { useEffect } from "react";
import _ from "lodash";
import { Button, Form, Select, message } from "antd";
import { Axios } from "../../config";

import styles from "./style.module.css";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

export let list = [];

const TodoFilter = ({ handleSearch }) => {
    const onFinish = (values) => {
        Axios.get("/list", {
            params: {
                ...values,
            },
        })
            .then((res) => {
                if (
                    _.get(res, "status") === 200 &&
                    _.get(res, "data.code") === 20000
                ) {
                    handleSearch(_.get(res, "data.data.list", []));
                }
            })
            .catch((err) => {
                message.error(`服务器异常：${err.message}，请稍后重试……`);
            });
    };

    useEffect(() => {
        onFinish();
    }, []);

    return (
        <div className={styles.filters}>
            <Form layout={"inline"} onFinish={onFinish}>
                <Form.Item {...layout} name={"status"} label={"状态"}>
                    <Select
                        placeholder="请选择"
                        showSearch={true}
                        optionFilterProp={"children"}
                        allowClear={true}
                    >
                        <Select.Option value={1}>待完成</Select.Option>
                        <Select.Option value={2}>已完成</Select.Option>
                        <Select.Option value={3}>已删除</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 4 }}>
                    <Button type={"primary"} htmlType={"submit"}>
                        筛选
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TodoFilter;
