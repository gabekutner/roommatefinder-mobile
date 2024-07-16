/**
 * data fetching, connection to global state
 * renders the .view component
 */
import React, {useState} from 'react';

import {SignIn, SignUp, Auth} from './auth.view';

import utils from '../../core/utils';
import useStore from '../../zustand/store';
import api from '../../core/api';


const login = useStore(state => state.login)

const signin = props => {
  /** props
   * form : object
   */
  if (!props.form.email || !props.form.password) {
    // setShowError({ ...showError, status:true, message:"Missing credentials."})
    return;
  };
  if (!utils.validEmail(props.form.email)) {
    // setShowError({ ...showError, status:true, message:"Invalid email address."})
    return;
  };
  api({
    method: 'post',
    url: '/api/v1/users/login/',
    data: {
      email: props.form.email,
      password: props.form.password,
    },
  }).then(response => {
    const credentials = {
      email: props.form.email,
      password: props.form.password,
    };
    login(
      credentials,
      response.data,
      {
        access: response.data.access, 
        refresh: response.data.refresh 
      }
    );
  }).catch(error => {
    // Handle error
  });
};

const signup = props => {
  /** props
   * form : object
   */
  if (!props.form.name || !props.form.email || !props.form.password || !props.form.rpassword) {
    // setShowError({ ...showError, status:true, message:"Missing credentials."})
    return;
  };
  if (!utils.validEmail(form.email)) {
    // setShowError({ ...showError, status:true, message:"Invalid email address."})
    return;
  };
  if (props.form.password !== props.form.rpassword) {
    // setShowError({ ...showError, status:true, message:"Your passwords don't match." })
    return;
  };

  api({
    method: 'post',
    url: '/api/v1/profiles/',
    data: {
      email: props.form.email,
      password: props.form.password, 
      repeated_password: props.form.rpassword,
      name: props.form.name,
    }
  }).then(response => {
    const credentials = {
      email: props.form.email,
      password: props.form.password,
    };
    login(
      credentials,
      response.data,
      { 
        'access': response.data.access, 
        'refresh': response.data.refresh 
      }
    );
  }).catch((error) => {
    // handle error
  });
};


function AuthScreen({ route, navigation }) {
  const {title, page} = route.params

  if (page === 'signin') {
    const [form, setForm] = useState({
      email: '',
      password: '',
    })
    return (  
      <Auth title={title}>
        <SignIn 
          navigation={navigation} 
          form={form} 
          setForm={setForm} 
        />
      </Auth>
    );
  };

  if (page === 'signup') {
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      rpassword: '',
    })
    return (  
      <Auth title={title}>
        <SignUp 
          navigation={navigation} 
          form={form} 
          setForm={setForm} 
        />
      </Auth>
    );
  };

};

export default AuthScreen;