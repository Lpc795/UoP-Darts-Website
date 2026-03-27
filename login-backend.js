import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

const db = new Database('darts.db');

function register(username, password) {
    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)');
    stmt.run(username, hash);
}

function login(username, password) {
    const stmt = db.prepare('SELECT * FROM admins WHERE username = ?');
    const user = stmt.get(username);

    if (!user) return false;
    return bcrypt.compareSync(password, user.password_hash);
}


export { register, login };





