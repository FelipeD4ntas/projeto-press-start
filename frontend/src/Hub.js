import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default class Hub {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8080/grafico-vendas")
      .configureLogging(LogLevel.Information)
      .build();
  }
}