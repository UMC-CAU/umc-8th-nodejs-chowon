import swaggerUIExpress from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 가져오기 (ESM에서는 __dirname이 기본적으로 제공되지 않음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger 설정 함수
export const setupSwagger = (app) => {
    // YAML 파일 로드
    const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

    // Swagger UI 설정
    app.use(
        "/docs",
        swaggerUIExpress.serve,
        swaggerUIExpress.setup(swaggerDocument)
    );
};