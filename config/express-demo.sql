use inventory;

CREATE TABLE shows (
    id int not null AUTO_INCREMENT,
    title varchar(255),
    service varchar(255),
    seasons int not null,
    rating int not null,
    PRIMARY KEY (id)
);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('Hawkeye', 'Disney+', 1, 7);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('The Mandalorian', 'Disney+', 2, 8);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('Loki', 'Disney+', 1, 7);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('The Expanse', 'Amazon Prime', 6, 9);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('Wheel of Time', 'Amazon Prime', 1, 6);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('Big Mouth', 'Netflix+', 5, 8);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('The Witcher', 'Netflix+', 2, 8);

INSERT INTO Loans (title, service, seasons, rating)
VALUES ('You', 'Netflix+', 3, 7);