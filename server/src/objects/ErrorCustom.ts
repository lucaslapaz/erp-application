export default class ErrorCustom extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorCustom";
  }
}
