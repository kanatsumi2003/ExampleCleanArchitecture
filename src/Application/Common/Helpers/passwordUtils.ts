const bcrypt = require('bcryptjs');


export async function comparePassword(password:string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export async function hashPassword(password: string): Promise<string>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}