# Estágio de Build
# Usando uma tag mais genérica e estável para o Maven com Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio de Execução
# Usando uma tag mais genérica e estável para o JRE com Java 17
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
# O nome do JAR é sistema-academico-1.0.0.jar
COPY --from=build /app/target/sistema-academico-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
