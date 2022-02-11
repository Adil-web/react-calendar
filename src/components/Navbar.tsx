import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useTypedSelector(state => state.auth)
  const { logout } = useActions()

  return (
    <>
      <Layout>
        {isAuth ?
          <Header>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item key={0}>{user.username}</Menu.Item>
              <Menu.Item key={1} onClick={logout}>Выйти</Menu.Item>
            </Menu>
          </Header>
          :
          <Header>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item key={1} onClick={() => navigate(RouteNames.LOGIN)}>Логин</Menu.Item>
            </Menu>
          </Header>
        }
      </Layout>
    </>
  )
};

export default Navbar;
