import React from 'react';
import axios from 'axios';
import 'less/screens/auth';
import { Form, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Email, ToggleablePassword } from 'components/form-inputs';
import { showValidationErrors } from 'utils/form';

const FormItem = Form.Item;

class ForgotPasswordScreen extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    let form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        axios.post('/auth/forgot-password', values)
          .then(response => {
            message.success('We have emailed your password reset link');
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
        <h1 className='header'>Forgot Password?</h1>

        <Form onSubmit={this.handleSubmit}>

          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Email placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className='float-right'>
              Submit
            </Button>
          </FormItem>

          <FormItem>
            <Link to='/login' className='login'>
              Login
            </Link>
            <Link to='/register' className='float-right'>
              Register
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ForgotPasswordScreen);

