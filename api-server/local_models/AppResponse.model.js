class AppResponse {
  success;
  message;
  data;

  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

module.exports = AppResponse;
