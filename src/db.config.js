import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// 환경 변수 먼저 로드
dotenv.config();

import { PrismaClient } from "./generated/prisma/index.js";
export const prisma = new PrismaClient();

// CA 파일 경로
const caFilePath = process.env.CA_FILE_PATH
    ? path.resolve(process.env.CA_FILE_PATH)
    : path.resolve("ca.pem");

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: fs.existsSync(caFilePath)
        ? {
              ca: fs.readFileSync(caFilePath),
          }
        : undefined,
});
