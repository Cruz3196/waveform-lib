import React, { useEffect, useState } from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import "./ProfileInfoStyles";
import ProfileInfoStyles from './ProfileInfoStyles';
import { auth, db } from '../../../features/firebase.config';
import { getDoc,doc } from 'firebase/firestore';
import Loader from '../Loader/loader';

const ProfileInfo = () => {
    const [userDetails,setUserDetails] = useState(null);
    const fetchUserData = async() => {
        auth.onAuthStateChanged(async(user)=> {
            console.log(user);
            const docRef=doc(db, "Users", user.uid); 
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data()); 
            }else{
                console.log("User is not logged in"); 
            }
        });
    };
    useEffect(() => {
        fetchUserData()
    }, [])

    // async function handleLogout(){
    //   try {
    //     await auth.signOut(); 
    //     window.location.href = "/login";
    //     console.log("User Logged Out"); 
    //   } catch (error) {
    //     console.log("Error Logging Out:", error.message);
    //   }
    // }

    return (
      <Container style={ProfileInfoStyles.Container}>
        {userDetails ? (
          <div style={ProfileInfoStyles.FormWrapper}>
            <h2 style={ProfileInfoStyles.Title}>Profile</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  style={ProfileInfoStyles.Input}
                  type="text"
                  value={userDetails.name || ""}
                  readOnly
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Control
                  style={ProfileInfoStyles.Input}
                  type="text"
                  value={userDetails.username || ""}
                  readOnly
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Control
                  style={ProfileInfoStyles.Input}
                  type="email"
                  value={userDetails.email || ""}
                  readOnly
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Control
                  style={ProfileInfoStyles.Input}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
  
              <Button style={ProfileInfoStyles.Button} type="submit">
                Save
              </Button>
              {/* <Button style={ProfileInfoStyles.Button}
                onClick={handleLogout}
              >
                LogOut
              </Button> */}
            </Form>
          </div>
        ) : (
          <Loader/>
        )}
      </Container>
    );
}

export default ProfileInfo