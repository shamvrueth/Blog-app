CREATE table users(
    id serial primary key,
    email varchar(100) not null,
    password varchar(100)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title varchar(100),
	content TEXT NOT NULL,
	author TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts(title,content,author) values(
	'The Rise of Decentralized Finance',
	'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.',
	'Vedanth Prabhu'
);