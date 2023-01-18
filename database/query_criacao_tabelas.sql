CREATE TABLE [clientes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Nome] VARCHAR(80) NOT NULL,
	[Email] VARCHAR(80) NOT NULL,
	[Telefone] VARCHAR(20) NOT NULL,
	[CPF] CHAR(14) NOT NULL,
	[Inativo] BIT NOT NULL
); 

CREATE TABLE [vendas]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[IdCliente] INT NOT NULL,
	[DataVenda] DATE NOT NULL DEFAULT(GETDATE()),
	[DataFaturamento] DATE NOT NULL,
	[QuantidadeItens] INT NOT NULL,
	[ValorTotal] DECIMAL(18, 2) NOT NULL

    CONSTRAINT [FK_IdCliente] FOREIGN KEY([IdCliente])
    REFERENCES [clientes] ([Id])
);

CREATE TABLE [itensVenda]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[IdVenda] INT NOT NULL,
	[DescricaoItem] VARCHAR(150) NOT NULL,
	[Quantidade] INT NOT NULL,
	[PrecoUnitario] DECIMAL(18, 2) NOT NULL,
	[ValorTotal] DECIMAL(18, 2) NOT NULL

    CONSTRAINT [FK_IdVenda] FOREIGN KEY([IdVenda])
    REFERENCES [vendas] ([Id])
);
