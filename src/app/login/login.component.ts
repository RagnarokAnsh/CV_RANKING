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
    'United States', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua And Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia And Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Rep', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D`ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French S. Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts And Nevis', 'Saint Lucia', 'St Vincent/Grenadines', 'Samoa', 'San Marino', 'Sao Tome', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'St. Helena', 'St.Pierre', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad And Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City State', 'Venezuela', 'Viet Nam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'
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