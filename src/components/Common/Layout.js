import React from 'react';
import {Breadcrumb, Layout, Menu, theme} from 'antd';

const {Header, Content, Footer} = Layout;
// const menuHeader = [{name: 'Home', path: '/'}, {name: 'GameXO', path: '/gameXO'}].map((item) => ({
//     key: item.name, label: `${item.name}`, href: `${item.path}`
// }));

// const menuHeader = [{name: 'Home', path: '/'}, {name: 'GameXO', path: '/gameXO'}].map((item) => {
//     return (
//         <a href={item.path}>{item.name}</a>
//     )
// });

const menuHeader = [{name: 'Home', path: '/'}, {name: 'GameXO', path: '/gamexo'}].map((item) => ({
    key: item.path, label: <a href={item.path}>{item.name}</a>
}));

const App = (prods) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (<Layout>
        <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[prods.path]} items={menuHeader}/>
        </Header>
        <Content
            style={{
                padding: '0 50px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
                style={{
                    padding: '24px 0', background: colorBgContainer,
                }}
            >
                <Content
                    style={{
                        padding: '0 24px', minHeight: 280,
                    }}
                >
                    {prods.component}
                </Content>
            </Layout>
        </Content>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>);
};
export default App;