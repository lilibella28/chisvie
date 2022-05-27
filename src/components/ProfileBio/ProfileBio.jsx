import React from "react";
import { Image, Grid, Segment } from "semantic-ui-react";

function ProfileBio({ user }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          
           <Segment textAlign="left">
           <Image
            src={`${
              user.photoUrl
                ? user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            } `}
            avatar
            size="small"
          />
          <h1>{user.username}</h1>
            <span> Bio: {user.bio}</span>
          </Segment>
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
         
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfileBio;
