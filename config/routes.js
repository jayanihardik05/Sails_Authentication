

module.exports.routes = {

  '/': 'RegistationController.logindata',
  '/login': 'RegistationController.logindata',
  '/forgetpassword': 'RegistationController.forgetpassword',
  '/signup': 'RegistationController.signup',
  '/forgetpassword/link/:id': 'ResetpasswordController.forgetpasswordlink',

  'GET /registation/listdata': 'RegistationController.listdata',
  'POST /registation/add': 'RegistationController.adddata',
  'POST /login/add': 'RegistationController.loginadd',
  'POST /signup/add': 'RegistationController.signupadd',
  'GET /registation/delete/:id': 'RegistationController.deletedata',
  'GET /registation/editdata/:id': 'RegistationController.editdata',
  'POST /registation/updatadata/:id': 'RegistationController.updatedata',
  'POST /forgetpassword/link/:getId': 'ResetpasswordController.updateForgetPassword',
  'POST /email': 'ResetpasswordController.emailSend',
};
