import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class AlunoSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://localhost:8080")
    .acceptHeader("application/json")
    .basicAuth("admin", "admin123")

  val scn = scenario("Teste de Carga - Alunos")
    .exec(http("Listar Alunos")
      .get("/api/alunos")
      .check(status.is(200)))
    .pause(1)
    .exec(http("Buscar Aluno por ID")
      .get("/api/alunos/1")
      .check(status.in(200, 404)))
    .pause(1)
    .exec(http("Listar Cursos")
      .get("/api/cursos")
      .check(status.is(200)))

  setUp(
    scn.inject(
      atOnceUsers(10),
      rampUsers(50) during (30 seconds),
      constantUsersPerSec(20) during (60 seconds)
    )
  ).protocols(httpProtocol)
}
