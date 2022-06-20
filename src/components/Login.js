import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { client } from '../client';
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    console.log(doc);
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });

  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
      <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center     bg-blackOverlay">
        <div className="p-5">
            <img src="https://raw.githubusercontent.com/adrianhajdin/project_shareme_social_media/main/frontend_sanity/src/assets/logowhite.png" alt='' width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider 
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                >
             <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login