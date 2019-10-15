import React from 'react';
import axios from 'axios';
import 'less/screens/auth';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Email, ToggleablePassword } from 'components/form-inputs';
import { showValidationErrors } from 'utils/form';

const FormItem = Form.Item;

class ResetPasswordScreen extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    let form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        values.token = this.props.token;
        values.password_confirmation = values.password;

        axios.post('/auth/reset-password', values)
          .then(response => {
            this.props.onSuccess(response.data.data);
            return response;
          })
          .catch(axiosError => {
            showValidationErrors(form, values, axiosError);
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='auth-screen'>
        <h1 className='header'>Reset Password</h1>

        <Form hideRequiredMark layout='vertical' onSubmit={this.handleSubmit}>

          <FormItem
            label="Email"
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Email placeholder="Email" />
            )}
          </FormItem>

          <FormItem
            label="New Password"
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password is required' }],
            })(
              <ToggleablePassword placeholder='Password' />
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className='float-right'>
              Submit
            </Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default Form.create()(ResetPasswordScreen);

