import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      // تأكدي من مسار الـ API الخاص بكِ
      this.http.post<any>('http://localhost:3000/api/auth/login', loginData).subscribe({
        next: (res) => {
          console.log('Login Response:', res);
          
          if (res.token) {
  
            localStorage.setItem('token', res.token);
            
            try {
       
              const decoded: any = jwtDecode(res.token);
              console.log('Decoded Payload:', decoded);

 
              const userRole = decoded.role 
     console.log(userRole);
     
              
              if (userRole) {
                localStorage.setItem("role", userRole);

                if (userRole === 'admin') {
                  this.router.navigate(['/admin/products']);
                } else {
                  this.router.navigate(['/']);
                }
              } else {
                this.errorMessage = 'لم يتم العثور على صلاحيات لهذا المستخدم';
              }

            } catch (decodeError) {
              console.error('Error decoding token:', decodeError);
              this.errorMessage = 'حدث خطأ في قراءة بيانات الدخول';
            }
          }
        },
        error: (err) => {
          console.error('Login Error:', err);
          // تخصيص رسالة الخطأ بناءً على رد السيرفر
          this.errorMessage = err.error?.message || 'فشل تسجيل الدخول، تأكدي من البيانات أو اتصال السيرفر';
        }
      });
    } else {
      this.errorMessage = 'يرجى إدخال البيانات بشكل صحيح';
    }
  }
}