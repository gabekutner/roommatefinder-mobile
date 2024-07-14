/**
 * data fetching, connection to global state
 * renders the .view component
 */
import React, {useState} from 'react';

import {SignIn, SignUp, Auth} from './auth.view';

import {useStore} from '../../zustand/store';


const state = props => {
  const login = useStore(state => state.login);
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
};

function AuthScreen({ route, navigation }) {
  /** initialParams : page : 'SignIn' | 'SignUp' */
  const {title} = route.params
  const login = useStore(state => state.login);
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  return (  
    <Auth title={title}>
      <SignIn form={form} setForm={setForm} />
    </Auth>
  );
};

export default AuthScreen;