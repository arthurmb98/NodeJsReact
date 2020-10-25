-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25-Out-2020 às 21:57
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `database`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `empresas`
--

INSERT INTO `empresas` (`id`, `uf`, `nome`, `cnpj`) VALUES
(6, 'MT', 'Teste front', '20723151000185'),
(13, 'PE', 'Teste', '50590604000103'),
(14, 'PR', 'Empresa PR', '07735255000141');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedores`
--

CREATE TABLE `fornecedores` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `documento` varchar(15) NOT NULL,
  `rg` varchar(15) DEFAULT NULL,
  `nascimento` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedores`
--

INSERT INTO `fornecedores` (`id`, `nome`, `email`, `documento`, `rg`, `nascimento`) VALUES
(2, 'Arthur Moura', 'arthur.mb98@hotmail.com', '63803197000117', NULL, NULL),
(4, 'Fornecedor bb', 'bb@gmail.com', '85361007021', '0507711620137', '2020-07-07 20:28:00'),
(6, 'Fornecedor Teste', 'zanaaka@gmail.com', '71244236000111', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vinculos`
--

CREATE TABLE `vinculos` (
  `id` int(11) NOT NULL,
  `fkIdEmpresas` int(11) NOT NULL,
  `fkIdFornecedores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vinculos`
--

INSERT INTO `vinculos` (`id`, `fkIdEmpresas`, `fkIdFornecedores`) VALUES
(2, 6, 2),
(17, 13, 4),
(7, 13, 6);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices para tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices para tabela `vinculos`
--
ALTER TABLE `vinculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fkIdFornecedores` (`fkIdFornecedores`),
  ADD UNIQUE KEY `fkIdEmpresas` (`fkIdEmpresas`,`fkIdFornecedores`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `vinculos`
--
ALTER TABLE `vinculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `vinculos`
--
ALTER TABLE `vinculos`
  ADD CONSTRAINT `vinculos_ibfk_2` FOREIGN KEY (`fkIdEmpresas`) REFERENCES `empresas` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `vinculos_ibfk_3` FOREIGN KEY (`fkIdFornecedores`) REFERENCES `fornecedores` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
