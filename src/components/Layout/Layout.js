import  { Fragment } from 'react';

const Layout = props => (
    <Fragment>
      <header className="main-header">{props.header}</header>
      {props.mobileNav}
      <main className="content">{props.children}</main>
    </Fragment>
  );
  
  export default Layout;