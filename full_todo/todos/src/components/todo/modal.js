import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import { Modal, Form, Input, DatePicker } from "antd";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16, offset: 2 },
};

const TodoModal = ({ visible, title, detail, onOk, onCancel }) => {
    const [form] = Form.useForm();

    const [inits, updateInits] = useState({ ...detail });

    const cancel = () => {
        onCancel();
        updateInits(null);
    };

    const commit = async () => {
        const res = await form.validateFields();
        const data = {
            id: _.get(detail, "id"),
            ...res,
            endDate: moment().format("YYYY/MM/DD HH:mm:ss"),
        };
        onOk(data);
    };

    return (
        <div>
            <Modal
                width={750}
                visible={visible}
                title={title}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
                okText={"确定"}
                cancelText={"取消"}
                onOk={commit}
                onCancel={cancel}
            >
                <Form
                    {...layout}
                    form={form}
                    name="todo"
                    initialValues={{ ...inits }}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "请输入待办项名称",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: "请输入待办项内容",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="截止时间"
                        name="endDate"
                        rules={[
                            {
                                required: true,
                                message: "请输入待办项内容",
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            style={{ width: "100%" }}
                            placeholder={"请选择到期时间"}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TodoModal;
