FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["backend/PressStart2/PressStart2/PressStart2.csproj", "backend/PressStart2/PressStart2/"]
COPY ["backend/PressStart2/PressStart2.Domain/PressStart2.Domain.csproj", "backend/PressStart2/PressStart2.Domain/"]
COPY ["backend/PressStart2/PressStart2.Infra.CrossCutting/PressStart2.Infra.CrossCutting.csproj", "backend/PressStart2/PressStart2.Infra.CrossCutting/"]
COPY ["backend/PressStart2/PressStart2.Infra.Data/PressStart2.Infra.Data.csproj", "backend/PressStart2/PressStart2.Infra.Data/"]
RUN dotnet restore "backend/PressStart2/PressStart2/PressStart2.csproj"
COPY . .
RUN dotnet publish "backend/PressStart2/PressStart2/PressStart2.csproj" -c Release -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet", "PressStart2.dll" ]