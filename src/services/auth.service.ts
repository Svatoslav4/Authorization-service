import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


interface User {
    id: number,
    email: string,
    password: string|number
}


export class AuthService {
    private readonly users: User[] = []
    private readonly jwtSecret = "SECRET_KEY"
    
    async register(email: string, password:string){
        const exits = this.users.find(u => u.email === email)
        if(exits){
            throw new Error("User already exit")
        }
    }

    const hashedPassword = await bcrypt.hash(password,10)
    
    
}

