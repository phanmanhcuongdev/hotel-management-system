# syntax=docker/dockerfile:1
FROM maven:3.9.12-eclipse-temurin-21-noble AS base
WORKDIR /backend
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q clean package -DskipTests

FROM eclipse-temurin:21-jre-noble AS runtime
WORKDIR /backend
COPY --from=base /backend/target/*.jar /tmp/
RUN mv "$(ls /tmp/*.jar | grep -v '^/tmp/original-' | head -n 1)" /backend/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
