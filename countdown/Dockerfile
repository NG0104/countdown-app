# ===== ビルド用 =====
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# ソースをコピー
COPY . .

# ★ mvnw に実行権限を付与（最重要）
RUN chmod +x mvnw

# Maven Wrapper でビルド
RUN ./mvnw clean package -DskipTests

# ===== 実行用 =====
FROM eclipse-temurin:17
WORKDIR /app

# ビルド済み jar をコピー
COPY --from=build /app/target/*.jar app.jar

# Spring Boot のポート
EXPOSE 8080

# 起動コマンド
ENTRYPOINT ["java", "-jar", "app.jar"]
