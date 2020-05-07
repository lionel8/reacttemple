import React, {Component} from 'react'
import intl from 'react-intl-universal';
import axios from 'axios'
import { Button, Input } from 'antd';

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <div className="title">i18n Examples:</div>
        <div>{intl.get('message')}</div>
        <Input placeholder="Basic usage" />
        <Button type="primary">保存</Button>
      </div>
    )
  }
}

console.log(process.env.REACT_APP_DOMAIN)
// 开发
if(process.env.REACT_APP_ENV === 'development'){
  console.log('current env:=> development')
}
// sit
if(process.env.REACT_APP_ENV === 'sit'){
  console.log('current env:=> sit')
} 
// uat
if(process.env.REACT_APP_ENV === 'uat'){
  console.log('current env:=> uat')
} 
// 生产
if(process.env.REACT_APP_ENV === 'production'){
  console.log('current env:=> production')
} 
axios.get("/api/rest/aliyun-config.ace-services-module-list?timestamp="+new Date().getTime(),(response)=>{
  console.log(response)
})
export default HeaderComponent;