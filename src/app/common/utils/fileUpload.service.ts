import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { applicationUrls } from '../../shared/application-constants/application-urls.const';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private maxFileSize = 5 * 1024 * 1024; // 5 MB
  private uploadUrl = 'YOUR_UPLOAD_URL_HERE'; // Replace with your server URL

  constructor(private http: HttpClient) { }

  sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  }

  isFileSizeValid(fileSize: number): boolean {
    return fileSize <= this.maxFileSize;
  }

  // uploadFile(file: File): Observable<HttpEvent<any>> {
  //   if (!this.isFileSizeValid(file.size)) {
  //     return throwError(() => new Error('File size exceeds the allowed limit.'));
  //   }

  //   const sanitizedFileName = this.sanitizeFileName(file.name);
  //   const formData = new FormData();
  //   formData.append('file', file, sanitizedFileName);

  //   return this.http.post<HttpEvent<any>>(this.uploadUrl, formData, {reportProgress: true,observe: 'events'})
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    if (!this.isFileSizeValid(file.size)) {
      return throwError(() => new Error('File size exceeds the allowed limit.'));
    }

    const sanitizedFileName = this.sanitizeFileName(file.name);
    const formData = new FormData();
    formData.append('file', file, sanitizedFileName);

    return this.http.post<HttpEvent<any>>(
      `${applicationUrls.user.uploadUserProfileImage}`, formData, {reportProgress: true,observe: 'events'}
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message || 'An unknown error occurred.'));
  }


  uploadDocument(formData: FormData): Observable<any> {
    // Replace the below URL with your actual API endpoint
    return this.http.post<any>(`${applicationUrls.user.uploadUserProfileImage}`, formData);

    // Mock response if you are testing without a backend
    // return of({ url: 'https://example.com/uploads/document.pdf' });
  }
}
