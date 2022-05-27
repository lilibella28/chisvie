import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
export default function PageHeader({ user, handleLogout }) {
   
  return (
    <Segment clearing>

      <Header as="h3" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
      
      <Header as="h2" floated="left">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://i.imgur.com/yPoEdxZ.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
      <Header as="h1" textAlign='justified'>
      I am so tired but close
      </Header>
    </Segment>
  );
}