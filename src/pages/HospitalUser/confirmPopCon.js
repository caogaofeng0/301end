/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Modal } from 'antd';

export default function ConfirmPopCon(options, record, onHandCon) {
  Modal.confirm({
    title: options.title,
    cancelText: '取消',
    okText: options.okText,
    content: (
      <div>
        <p style={{color:'#f81d22'}}>{options.content}</p>
        <p>{options.askSure}</p>
      </div>
    ),
    onOk:() => onHandCon(record),
    onCancel() {},
  })
}