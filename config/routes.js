

module.exports.routes = {

  '/': 'RegistationController.logindata',
  '/login': 'RegistationController.logindata',
  '/forgetpassword': 'RegistationController.forgetpassword',
  '/signup': 'RegistationController.signup',
  
  'GET /registation/listdata': 'RegistationController.listdata',
  'POST /registation/add': 'RegistationController.adddata',
  'GET /registation/delete/:id': 'RegistationController.deletedata',
  'GET /registation/editdata/:id': 'RegistationController.editdata',
  'POST /registation/updatadata/:id': 'RegistationController.updatedata',
  'POST /email': 'ResetpasswordController.emailSend',
};
