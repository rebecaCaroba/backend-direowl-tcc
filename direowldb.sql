-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 18-Nov-2024 às 14:47
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `direowldb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `catalog_id` int DEFAULT NULL,
  `idResBook` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `publication_date` varchar(20) DEFAULT NULL,
  `pages` int NOT NULL,
  `description` text,
  `imageLinks` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_catalog_id` (`catalog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `books`
--

INSERT INTO `books` (`id`, `catalog_id`, `idResBook`, `title`, `author`, `isbn`, `publisher`, `publication_date`, `pages`, `description`, `imageLinks`) VALUES
(116, 38, 'saiWDwAAQBAJ', 'As aventuras de Sherlock Holmes', 'Arthur Conan Doyle', '9788595085350, 8595085358', 'HarperCollins Brasil', '2019-06-10', 290, 'As aventuras de Sherlock Holmes é uma coletânea de doze contos escritos por Sir Arthur Conan Doyle sobre seu famoso detetive. Foi publicado pela primeira vez pela Strand Magazine em 1891, em formato seriado. As histórias contam com o famoso detetive da Baker Street e seu fiel escudeiro, dr. Watson. Entre os contos, estão algumas das histórias mais clássicas de Holmes, como \"Um caso de identidade\", \"Os cinco caroços de laranja\" e \"Escândalo na Boêmia\", que introduz a personagem de Irene Adler, interesse romântico do detetive.', 'http://books.google.com/books/content?id=saiWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(118, 38, 'o7k0EAAAQBAJ', 'O corvo', 'edgar allan poe', '9786586655940, 6586655943', 'Editora Itapuca', '2021-06-24', 20, 'No poema O corvo, de Edgar Allan Poe, um jovem atormentado pela perda de sua amada Lenora faz perguntas a um corvo que pousa em sua janela. Usando rimas e métricas – Poe classificou a exatidão métrica dos 108 versos como um \"problema matemático\" –, o autor constrói um clima macabro no qual o jovem anseia por esperanças proféticas da ave misteriosa. Tradução original de Machado de Assis.', 'http://books.google.com/books/content?id=o7k0EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(119, 38, 'vC84EAAAQBAJ', 'Os dois morrem no final', 'Adam Silvera', '9786555603033, 6555603038', 'Editora Intrinseca', '2021-10-04', 334, 'Emocionante e inesquecível, aguardado livro de Adam Silvera chega ao Brasil em outubro No dia 5 de setembro, pouco depois da meia-noite, Mateo Torrez e Rufus Emeterio recebem uma ligação da Central da Morte. A notícia é devastadora: eles vão morrer naquele mesmo dia. Os dois não se conhecem, mas, por motivos diferentes, estão à procura de um amigo com quem compartilhar os últimos momentos, uma conexão verdadeira que ajude a diminuir um pouco a angústia e a solidão que sentem. Por sorte, existe um aplicativo para isso, e é graças a ele que Rufus e Mateo vão se encontrar para uma última grande aventura: viver uma vida inteira em um único dia. Uma história sensível e emocionante, Os dois morrem no final nos lembra o que significa estar vivo. Com seu olhar único, Adam Silvera mostra que cada segundo importa, e mesmo que não haja vida sem morte, nem amor sem perda, tudo pode mudar em 24 horas.', 'http://books.google.com/books/content?id=vC84EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(120, 38, 'zPo0EAAAQBAJ', 'A Vida Invisível de Addie LaRue', 'V. E. Schwab', '9789899027510, 9899027510', 'Leya', '2021-06-01', 664, 'França, 1714: num momento de desespero, uma jovem faz um trato para viver para sempre que implica a maldição de ser esquecida por todos que encontra. Assim começa a vida extraordinária de Addie LaRue, uma aventura deslumbrante que se desenrola através de séculos e continentes, através da história e da arte, enquanto uma jovem aprende até onde irá para deixar sua marca no mundo. Mas tudo muda quando, após quase 300 anos, Addie se depara com um jovem, numa livraria escondida, que se lembra do nome dela.', 'http://books.google.com/books/content?id=zPo0EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(121, 39, 'H7z3rbtM6P0C', 'Stand-Out Shorts', 'Russell Evans', '9781135053932, 1135053936', 'Taylor & Francis', '2012-12-11', 314, 'Making movies is no different than any other creative work - don\'t wait to be told you\'re good enough, just pick up a camera and start! Use this book to find out the essentials that work for most people, then go ahead and add your own ideas. Stand-Out Shorts is a distillation of the basics you need to know, packed into a small space. Road-tested by emerging filmmakers like you, this book offers real experience, real interviews and tried and tested ideas and techniques to offer the simplest, most direct way to get started making movies. Loaded with check lists, tools, handy reference charts, this book covers just what you need to know to start: nothing more, nothing less.', 'http://books.google.com/books/content?id=H7z3rbtM6P0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');

-- --------------------------------------------------------

--
-- Estrutura da tabela `catalogs`
--

DROP TABLE IF EXISTS `catalogs`;
CREATE TABLE IF NOT EXISTS `catalogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_catalogs` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `catalogs`
--

INSERT INTO `catalogs` (`id`, `user_id`, `name`) VALUES
(38, 13, 'Suspense'),
(39, 13, 'Comédia');

-- --------------------------------------------------------

--
-- Estrutura da tabela `dayread`
--

DROP TABLE IF EXISTS `dayread`;
CREATE TABLE IF NOT EXISTS `dayread` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seconds` int NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `day` int NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_id` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_book_id` (`book_id`),
  KEY `fk_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_days` int NOT NULL,
  `minutes_per_day` int NOT NULL,
  `total_pages` int NOT NULL,
  `total_minutes` int NOT NULL,
  `complete` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(13, 'Rebeca', 'rebeca@gmail.com', 'Berecadas@1212');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `catalogs` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `catalogs`
--
ALTER TABLE `catalogs`
  ADD CONSTRAINT `fk_user_id_catalogs` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `dayread`
--
ALTER TABLE `dayread`
  ADD CONSTRAINT `dayread_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
