import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  addNewUser(newUser: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(this.url, newUser, { headers });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  deleteUser(id: Number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<User>(`${this.url}/${user.id}`, user, { headers });
  }

  findIfAlreadyExists(email: string): Observable<boolean> {
    var subject = new Subject<boolean>();
    const allUsers = this.getAllUsers().subscribe((users) => {
      if (users.find((user) => user.email === email)) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }
}
