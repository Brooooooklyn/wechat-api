##微信企业号消息 Node SDK

### 项目启动
测试可能需要全局安装`mocha`
```
sudo npm install mocha -g
```
build可能需要全局安装`babel`

```
sudo npm install babel -g
```
###开发中可使用的命令：
```
npm run build
npm run test
npm run watch
```

##用法

在项目中引入：
```
npm i wechat-enterprise-sdk --save
npm i config --save
```
然后在项目目录下建立config 目录并且在里面加入default.json
在default.json中加入

```
{
  "ENTERPRISE_WECHAT": {
    "corpid": "your corp id",
    "secret": "your corp secret",
    "token": "your token"
  }
}

```
