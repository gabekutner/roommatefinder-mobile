import React from "react";
import {LogoutButton} from "./logout.view";

export default {
  title: "Logout",
  component: LogoutButton,
  /** for function events ... */
  argTypes: {onClick: {action: "afadsf"}},
};

const Template = (args) => <LogoutButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  loading: false,
};
