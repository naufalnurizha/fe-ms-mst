import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { setCurrentKey } from 'store/modules/currentValue/action';

const { Header, Sider, Content, Footer } = Layout;

class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
    }

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleKeyClick = (link, key) => {
    this.props.setCurrentKey(key);
    window.location.assign(link);
  }

  componentDidMount() {
    this.props.setCurrentKey('1');
  }

  render() {
    return (
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggleCollapsed,
          })} */}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            alignSelf: 'center'
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    )
  }

}

const mapStateToProps = state => ({
  activeKey: state.current.activeKey
});

export default connect(mapStateToProps, { setCurrentKey })(Page);