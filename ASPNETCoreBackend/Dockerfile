FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

WORKDIR /app

COPY ./bin/Release/net9.0/publish/ .

EXPOSE 8080

ENTRYPOINT ["dotnet", "ASPNETCoreBackend.dll"]
