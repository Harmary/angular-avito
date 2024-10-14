export class DefaultValidationMessages {
  public required(): string {
    return 'Пожалуйста, заполните это поле.';
  }

  public pattern(): string {
    return 'Пожалуйста, проверьте это поле.';
  }

  public minlength(options: any = null): string {
    return `Пожалуйста, введите ${options.requiredLength} символов.`;
  }

  public maxlength(options: any): string {
    return `Пожалуйста, введите не больше чем ${options.requiredLength} символов.`;
  }

  public email(): string {
    return `Пожалуйста, введите корректный email.`;
  }

  public emailExists(): string {
    return `Этот email уже используется.`;
  }

  public mustMatch(): string {
    return `Пароли должны совпадать.`;
  }
}
