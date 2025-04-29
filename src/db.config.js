import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// CA 파일 경로
const caFilePath = process.env.CA_FILE_PATH
    ? path.resolve(process.env.CA_FILE_PATH)
    : path.resolve("ca.pem");

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // mysql의 hostname
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test", // 데이터베이스 이름
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: fs.existsSync(caFilePath) ? {
        ca: fs.readFileSync(caFilePath),
    } : undefined,
});
