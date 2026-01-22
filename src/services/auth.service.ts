import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


interface User {
    id: number,
    email: string,
    password: string|number
}


export class AuthService {
    private readonly users: User[] = []
    private readonly jwtSecret
    


}

