import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  currentMode: AuthMode = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+86', country: 'CN' },
    { code: '+81', country: 'JP' },
    { code: '+61', country: 'AU' },
    { code: '+55', country: 'BR' },
    { code: '+7', country: 'RU' }
  ];

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'India', 'China', 'Japan', 'Brazil', 'Russia', 'South Africa',
    'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark'
  ];

  nationalities = [
    'American', 'British', 'Canadian', 'Australian', 'German', 
    'French', 'Indian', 'Chinese', 'Japanese', 'Brazilian', 'Russian', 'South African',
    'Mexican', 'Italian', 'Spanish', 'Dutch', 'Swedish', 'Norwegian', 'Danish'
  ];

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      nationality: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password') || form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  switchMode(mode: AuthMode) {
    this.currentMode = mode;
    this.resetForms();
  }

  resetForms() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.forgotPasswordForm.reset();
    this.resetPasswordForm.reset();
    this.showPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
  }

  togglePasswordVisibility(field: 'password' | 'newPassword' | 'confirmPassword') {
    switch (field) {
      case 'password':
        this.showPassword = !this.showPassword;
        break;
      case 'newPassword':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Login:', this.loginForm.value);
        this.isLoading = false;
        // Handle successful login
      }, 2000);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Register:', this.registerForm.value);
        this.isLoading = false;
        // Handle successful registration
      }, 2000);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Forgot Password:', this.forgotPasswordForm.value);
        this.isLoading = false;
        // Handle successful password reset request
      }, 2000);
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Reset Password:', this.resetPasswordForm.value);
        this.isLoading = false;
        // Handle successful password reset
      }, 2000);
    } else {
      this.markFormGroupTouched(this.resetPasswordForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
      if (field.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      country: 'Country',
      nationality: 'Nationality',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password'
    };
    return displayNames[fieldName] || fieldName;
  }
}