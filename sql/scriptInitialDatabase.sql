CREATE SEQUENCE UsuarioIdSequence START 1;
CREATE TABLE IF NOT EXISTS Usuarios (
    IdUsuario INT NOT NULL DEFAULT NEXTVAL('UsuarioIdSequence'),
    NombreUsuario VARCHAR(100) NOT NULL,
    Contraseña VARCHAR(100) NOT NULL,
    Pais VARCHAR(100) NOT NULL,
    PRIMARY KEY (IdUsuario, NombreUsuario)
);

CREATE SEQUENCE MonedasUsuariosSequence START 1;
CREATE TABLE IF NOT EXISTS MonedasUsuarios (
    IdMonedaUsuario INT NOT NULL DEFAULT NEXTVAL('MonedasUsuariosSequence'),
    Simbolo VARCHAR(20) NOT NULL,
    NombreMoneda VARCHAR(100) NOT NULL,
    TasaCambio FLOAT NOT NULL,
    Pais VARCHAR(100) NOT NULL,
    NombreUsuario_Monedas VARCHAR(100) NOT NULL,
    IdUsuario_Monedas INT NOT NULL,
    PRIMARY KEY (IdMonedaUsuario, Simbolo)
    -- CONSTRAINT fk_MonedasUsuarios
    --     FOREIGN KEY(NombreUsuario_Monedas, IdUsuario_Monedas)
    --     REFERENCES Usuarios(NombreUsuario, IdUsuario)
);

CREATE SEQUENCE MonedasSequence START 1;
CREATE TABLE IF NOT EXISTS Monedas (
    IdMoneda INT NOT NULL DEFAULT NEXTVAL('MonedasSequence'),
    Simbolo VARCHAR(20) NOT NULL,
    NombreMoneda VARCHAR(100) NOT NULL,
    TasaCambio FLOAT NOT NULL,
    Pais VARCHAR(100) NOT NULL,
    PRIMARY KEY (IdMoneda, Simbolo)
);

INSERT INTO Monedas (Simbolo, NombreMoneda, TasaCambio, Pais) VALUES ('BTC', 'Bitcoin', 61169.02, 'Colombia');
INSERT INTO Monedas (Simbolo, NombreMoneda, TasaCambio, Pais) VALUES ('ETH', 'Ethereum', 4485.19, 'Colombia');
INSERT INTO Monedas (Simbolo, NombreMoneda, TasaCambio, Pais) VALUES ('BNB', 'Binance coin', 601.76, 'Colombia');

CREATE EXTENSION pgcrypto;
INSERT INTO Usuarios (NombreUsuario, Contraseña, Pais) VALUES ('anonimus', crypt('anonimus123', gen_salt('bf', 10)), 'Colombia');
